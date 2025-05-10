import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingService } from "./application/rating.service";
import { EloRatingStrategy } from "./strategies/elo-rating.strategy";
import { FightOrmEntity } from "../fight/infrastructure/typeorm/fight.orm-entity";
import { RankingOrmEntity } from "../ranking/infrastructure/typeorm/ranking.orm-entity";
import { FighterStatOrmEntity } from "../fighter-stat/infrastructure/typeorm/fighter-stat.orm-entity";
import { RATING_QUEUE } from "./rating.queue";
import { RatingProcessor } from "./rating.processor";
import { FightRepository } from "../fight/infrastructure/typeorm/fight.repository";
import { RankingRepository } from "../ranking/infrastructure/typeorm/ranking.repository";
import { FighterStatRepository } from "../fighter-stat/infrastructure/typeorm/fighter-stat.repository";
import { FighterStatService } from "../fighter-stat/application/fighter-stat.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FightOrmEntity,
      RankingOrmEntity,
      FighterStatOrmEntity,
    ]),
    BullModule.registerQueue({ name: RATING_QUEUE }),
  ],
  providers: [
    RatingProcessor,
    RatingService,
    EloRatingStrategy,
    FightRepository,
    RankingRepository,
    FighterStatRepository,
    FighterStatService,
  ],
})
export class RatingModule {}
