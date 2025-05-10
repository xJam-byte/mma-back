import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FightOrmEntity } from "./infrastructure/typeorm/fight.orm-entity";
import { FightResolver } from "./interfaces/graphql/fight.resolver";
import { FightRepository } from "./infrastructure/typeorm/fight.repository";
import { FighterModule } from "../fighter/fighter.module";
import { EventModule } from "../event/event.module";
import { BullModule } from "@nestjs/bull";

@Module({
  imports: [
    TypeOrmModule.forFeature([FightOrmEntity]),
    FighterModule,
    EventModule,
    BullModule.registerQueue({
      name: "rating",
    }),
  ],
  providers: [FightRepository, FightResolver],
  exports: [FightRepository],
})
export class FightModule {}
