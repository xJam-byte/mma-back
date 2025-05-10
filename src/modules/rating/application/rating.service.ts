import { Injectable } from "@nestjs/common";
import { EloRatingStrategy } from "../strategies/elo-rating.strategy";
import { FightRepository } from "src/modules/fight/infrastructure/typeorm/fight.repository";
import { RankingRepository } from "src/modules/ranking/infrastructure/typeorm/ranking.repository";
import { FighterStatService } from "src/modules/fighter-stat/application/fighter-stat.service";

@Injectable()
export class RatingService {
  constructor(
    private readonly fightRepo: FightRepository,
    private readonly rankingRepo: RankingRepository,
    private readonly fighterStatService: FighterStatService,
    private readonly elo: EloRatingStrategy
  ) {}

  async recalculate(fightId: number): Promise<void> {
    const fight = await this.fightRepo.findById(fightId);
    if (!fight || !fight.is_finished || !fight.winner_id) {
      throw new Error("Invalid fight data");
    }

    const { fighter_a_id, fighter_b_id, winner_id, weight_class_id, method } =
      fight;

    const rankingA = await this.rankingRepo.findByFighterAndWeight(
      fighter_a_id,
      weight_class_id
    );
    const rankingB = await this.rankingRepo.findByFighterAndWeight(
      fighter_b_id,
      weight_class_id
    );

    if (!rankingA || !rankingB) {
      throw new Error("Missing rankings for fighters");
    }

    const winnerRanking = winner_id === fighter_a_id ? rankingA : rankingB;
    const loserRanking = winner_id === fighter_a_id ? rankingB : rankingA;

    const { newWinnerRating, newLoserRating } = this.elo.calculate(
      winnerRanking.points,
      loserRanking.points
    );

    const now = new Date();

    winnerRanking.points = newWinnerRating;
    loserRanking.points = newLoserRating;
    winnerRanking.last_fight_date = now.toISOString();
    loserRanking.last_fight_date = now.toISOString();
    winnerRanking.updated_at = now;
    loserRanking.updated_at = now;

    await this.rankingRepo.save(winnerRanking);
    await this.rankingRepo.save(loserRanking);

    const allowedMethods = [
      "KO",
      "TKO",
      "SUBMISSION",
      "DECISION",
      "DQ",
    ] as const;
    type Method = (typeof allowedMethods)[number];

    const validatedMethod: Method | undefined = allowedMethods.includes(
      method as Method
    )
      ? (method as Method)
      : undefined;

    await this.fighterStatService.updateStatsAfterFight(
      fighter_a_id,
      fighter_b_id,
      winner_id,
      validatedMethod
    );
  }
}
