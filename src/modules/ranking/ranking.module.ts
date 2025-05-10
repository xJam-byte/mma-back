import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankingOrmEntity } from "./infrastructure/typeorm/ranking.orm-entity";
import { RankingRepository } from "./infrastructure/typeorm/ranking.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RankingOrmEntity])],
  providers: [RankingRepository],
  exports: [RankingRepository],
})
export class RankingModule {}
