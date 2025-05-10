import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsInt } from "class-validator";

@InputType()
export class CreateFighterInput {
  @Field()
  @IsNotEmpty()
  first_name: string;

  @Field()
  @IsNotEmpty()
  last_name: string;

  @Field(() => Int)
  @IsInt()
  weight_class_id: number;

  @Field({ nullable: true })
  @IsOptional()
  nickname?: string;

  @Field({ nullable: true })
  @IsOptional()
  birthdate?: string;

  @Field({ nullable: true })
  @IsOptional()
  country?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  height_cm?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  weight_kg?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  reach_cm?: number;

  @Field({ nullable: true })
  @IsOptional()
  stance?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  gym_id?: number;
}
