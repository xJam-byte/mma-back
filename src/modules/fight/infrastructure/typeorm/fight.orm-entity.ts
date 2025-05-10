import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity("fights")
@ObjectType()
export class FightOrmEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  fight_id: number;

  @Column()
  @Field(() => Int)
  event_id: number;

  @Column()
  @Field(() => Int)
  fighter_a_id: number;

  @Column()
  @Field(() => Int)
  fighter_b_id: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  winner_id?: number;

  @Column({ type: "varchar", nullable: true })
  @Field({ nullable: true })
  method?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  rounds?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  time?: string;

  @Column({ default: false })
  @Field()
  is_finished: boolean;

  @Column()
  @Field(() => Int)
  weight_class_id: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  fight_order?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
