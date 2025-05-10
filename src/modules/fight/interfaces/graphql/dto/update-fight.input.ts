import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateFightInput } from "./create-fight.input";
import { MethodOfVictory } from "src/modules/fight/enums/method.enum";
import { IsEnum, IsOptional } from "class-validator";

@InputType()
export class UpdateFightInput extends PartialType(CreateFightInput) {
  @Field(() => Int)
  fight_id: number;

  @Field(() => Int, { nullable: true })
  winner_id?: number;

  @Field(() => MethodOfVictory, { nullable: true })
  @IsOptional()
  @IsEnum(MethodOfVictory)
  method?: MethodOfVictory;

  @Field({ nullable: true })
  rounds?: number;

  @Field({ nullable: true })
  time?: string;

  @Field({ nullable: true })
  is_finished?: boolean;
}
