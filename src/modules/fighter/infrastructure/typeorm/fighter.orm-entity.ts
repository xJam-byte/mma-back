import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity("fighters")
@ObjectType()
export class FighterOrmEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  fighter_id: number;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  nickname?: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  birthdate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ type: "int", nullable: true })
  @Field({ nullable: true })
  height_cm?: number;

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  @Field({ nullable: true })
  weight_kg?: number;

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  @Field({ nullable: true })
  reach_cm?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  stance?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  gym_id?: number;

  @Column()
  @Field(() => Int)
  weight_class_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
