import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventOrmEntity } from "./infrastructure/typeorm/event.orm-entity";
import { EventRepository } from "./infrastructure/typeorm/event.repository";
import { EventResolver } from "./interfaces/graphql/event.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([EventOrmEntity])],
  providers: [EventRepository, EventResolver],
  exports: [EventRepository],
})
export class EventModule {}
