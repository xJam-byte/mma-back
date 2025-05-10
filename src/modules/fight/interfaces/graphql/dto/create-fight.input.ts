import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsInt } from "class-validator";

@InputType()
export class CreateFightInput {
  @Field(() => Int)
  @IsInt()
  event_id: number;

  @Field(() => Int)
  @IsInt()
  fighter_a_id: number;

  @Field(() => Int)
  @IsInt()
  fighter_b_id: number;

  @Field(() => Int)
  @IsInt()
  weight_class_id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  fight_order?: number;
}
