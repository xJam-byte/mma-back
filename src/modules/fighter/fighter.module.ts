import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FighterOrmEntity } from "./infrastructure/typeorm/fighter.orm-entity";
import { FighterRepository } from "./infrastructure/typeorm/fighter.repository";
import { FighterResolver } from "./interfaces/graphql/fighter.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([FighterOrmEntity])],
  providers: [FighterRepository, FighterResolver],
  exports: [FighterRepository],
})
export class FighterModule {}
