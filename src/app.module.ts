import { TypeOrmModule } from "@nestjs/typeorm";
import { FighterModule } from "./modules/fighter/fighter.module";
import { FighterOrmEntity } from "./modules/fighter/infrastructure/typeorm/fighter.orm-entity";
import { Module } from "@nestjs/common";
import { EventOrmEntity } from "./modules/event/infrastructure/typeorm/event.orm-entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { EventModule } from "./modules/event/event.module";
import { FightModule } from "./modules/fight/fight.module";
import { FightOrmEntity } from "./modules/fight/infrastructure/typeorm/fight.orm-entity";
import { BullModule } from "@nestjs/bull";
import { RatingModule } from "./modules/rating/rating.module";
import { RankingModule } from "./modules/ranking/ranking.module";
import { RankingOrmEntity } from "./modules/ranking/infrastructure/typeorm/ranking.orm-entity";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_NAME || "mma_db",
      entities: [
        FighterOrmEntity,
        EventOrmEntity,
        FightOrmEntity,
        RankingOrmEntity,
      ],
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
    FighterModule,
    EventModule,
    RatingModule,
    FightModule,
    RankingModule,
  ],
})
export class AppModule {}
