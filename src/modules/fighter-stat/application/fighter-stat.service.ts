import { Injectable } from "@nestjs/common";
import { FighterStatRepository } from "../infrastructure/typeorm/fighter-stat.repository";

@Injectable()
export class FighterStatService {
  constructor(private readonly repo: FighterStatRepository) {}

  async updateStatsAfterFight(
    fighterAId: number,
    fighterBId: number,
    winnerId: number,
    method: "KO" | "TKO" | "SUBMISSION" | "DECISION" | "DQ" | null
  ): Promise<void> {
    const statA = await this.repo.findByFighterId(fighterAId);
    const statB = await this.repo.findByFighterId(fighterBId);
    if (!statA || !statB) throw new Error("Fighter stats not found");

    const winner = winnerId === fighterAId ? statA : statB;
    const loser = winnerId === fighterAId ? statB : statA;

    winner.wins += 1;
    loser.losses += 1;

    if (method === "KO" || method === "TKO") {
      winner.ko_wins += 1;
      loser.ko_losses += 1;
    } else if (method === "SUBMISSION") {
      winner.submission_wins += 1;
      loser.submission_losses += 1;
    } else if (method === "DECISION") {
      winner.decision_wins += 1;
      loser.decision_losses += 1;
    }

    await this.repo.save(winner);
    await this.repo.save(loser);
  }
}
