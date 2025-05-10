import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class FightModel {
  @Field(() => Int)
  fight_id: number;

  @Field(() => Int)
  event_id: number;

  @Field(() => Int)
  fighter_a_id: number;

  @Field(() => Int)
  fighter_b_id: number;

  @Field(() => Int, { nullable: true })
  winner_id?: number;

  @Field({ nullable: true })
  method?: string;

  @Field({ nullable: true })
  rounds?: number;

  @Field({ nullable: true })
  time?: string;

  @Field()
  is_finished: boolean;

  @Field(() => Int)
  weight_class_id: number;

  @Field(() => Int, { nullable: true })
  fight_order?: number;
  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
