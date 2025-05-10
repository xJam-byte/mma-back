import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EventRepository } from "../../infrastructure/typeorm/event.repository";
import { EventModel } from "./dto/event.model";
import { CreateEventInput } from "./dto/create-event.input";
import { UpdateEventInput } from "./dto/update-event.input";

@Resolver(() => EventModel)
export class EventResolver {
  constructor(private readonly repo: EventRepository) {}

  @Query(() => [EventModel], { name: "events" })
  async getAllEvents() {
    return this.repo.findAll();
  }

  @Query(() => EventModel, { name: "event", nullable: true })
  async getEventById(@Args("id", { type: () => Int }) id: number) {
    return this.repo.findById(id);
  }

  @Mutation(() => EventModel, { name: "create_event" })
  async createEvent(@Args("input") input: CreateEventInput) {
    return this.repo.create(input);
  }

  @Mutation(() => EventModel, { name: "update_event", nullable: true })
  async updateEvent(@Args("input") input: UpdateEventInput) {
    const existing = await this.repo.findById(input.event_id);
    if (!existing) return null;
    return this.repo.create({ ...existing, ...input });
  }

  @Mutation(() => Boolean, { name: "delete_event" })
  async deleteEvent(
    @Args("id", { type: () => Int }) id: number
  ): Promise<boolean> {
    const existing = await this.repo.findById(id);
    if (!existing) return false;
    await this.repo.delete(id);
    return true;
  }
}
