import { InputType, Field, PartialType, Int } from "@nestjs/graphql";
import { CreateEventInput } from "./create-event.input";

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => Int)
  event_id: number;
}
