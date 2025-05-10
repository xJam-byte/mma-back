import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FighterStatOrmEntity } from "./infrastructure/typeorm/fighter-stat.orm-entity";
import { FighterStatRepository } from "./infrastructure/typeorm/fighter-stat.repository";
import { FighterStatService } from "./application/fighter-stat.service";

@Module({
  imports: [TypeOrmModule.forFeature([FighterStatOrmEntity])],
  providers: [FighterStatRepository, FighterStatService],
  exports: [FighterStatService],
})
export class FighterStatModule {}
