import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  event_name: string;

  @Field()
  @IsNotEmpty()
  date: string;

  @Field({ nullable: true })
  @IsOptional()
  event_location?: string;

  @Field({ nullable: true })
  @IsOptional()
  organization?: string;
}
