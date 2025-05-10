import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity("events")
@ObjectType()
export class EventOrmEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  event_id: number;

  @Column()
  @Field()
  event_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  event_location?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  organization?: string;

  @Column({ type: "date" })
  @Field()
  date: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
