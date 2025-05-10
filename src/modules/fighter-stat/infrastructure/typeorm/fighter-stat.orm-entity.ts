// src/modules/fighter-stat/infrastructure/typeorm/fighter-stat.orm-entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity("fighter_stats")
@ObjectType()
export class FighterStatOrmEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  fighter_stat_id: number;

  @Column()
  @Field(() => Int)
  fighter_id: number;

  @Column({ default: 0 })
  @Field(() => Int)
  wins: number;

  @Column({ default: 0 })
  @Field(() => Int)
  losses: number;

  @Column({ default: 0 })
  @Field(() => Int)
  draws: number;

  @Column({ default: 0 })
  @Field(() => Int)
  no_contests: number;

  @Column({ default: 0 })
  @Field(() => Int)
  ko_wins: number;

  @Column({ default: 0 })
  @Field(() => Int)
  submission_wins: number;

  @Column({ default: 0 })
  @Field(() => Int)
  decision_wins: number;

  @Column({ default: 0 })
  @Field(() => Int)
  ko_losses: number;

  @Column({ default: 0 })
  @Field(() => Int)
  submission_losses: number;

  @Column({ default: 0 })
  @Field(() => Int)
  decision_losses: number;
}
