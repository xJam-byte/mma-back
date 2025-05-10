import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
@ObjectType()
export class FighterModel {
  @Field(() => Int)
  fighter_id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  birthdate?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Int)
  weight_class_id: number;

  @Field(() => Int, { nullable: true })
  height_cm?: number;

  @Field(() => Float, { nullable: true })
  weight_kg?: number;

  @Field(() => Float, { nullable: true })
  reach_cm?: number;

  @Field({ nullable: true })
  stance?: string;

  @Field(() => Int, { nullable: true })
  gym_id?: number;
}
