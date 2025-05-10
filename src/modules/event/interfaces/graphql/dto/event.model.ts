import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class EventModel {
  @Field(() => Int)
  event_id: number;

  @Field()
  event_name: string;

  @Field({ nullable: true })
  event_location?: string;

  @Field({ nullable: true })
  organization?: string;

  @Field()
  date: string;
}
