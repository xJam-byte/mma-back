import { Resolver, Mutation, Query, Args, Int } from "@nestjs/graphql";
import { FightRepository } from "../../infrastructure/typeorm/fight.repository";
import { FightModel } from "./dto/fight.model";
import { CreateFightInput } from "./dto/create-fight.input";
import { UpdateFightInput } from "./dto/update-fight.input";
import { ResolveField, Parent } from "@nestjs/graphql";
import { FighterRepository } from "src/modules/fighter/infrastructure/typeorm/fighter.repository";
import { EventRepository } from "src/modules/event/infrastructure/typeorm/event.repository";
import { FighterModel } from "src/modules/fighter/interfaces/graphql/dto/fighter.model";
import { EventModel } from "src/modules/event/interfaces/graphql/dto/event.model";
import { InjectQueue } from "@nestjs/bull";
import { RATING_QUEUE, RatingQueueJob } from "src/modules/rating/rating.queue";
import { Queue } from "bull";

@Resolver(() => FightModel)
export class FightResolver {
  constructor(
    @InjectQueue(RATING_QUEUE)
    private readonly ratingQueue: Queue,
    private readonly repo: FightRepository,
    private readonly fighterRepo: FighterRepository,
    private readonly eventRepo: EventRepository
  ) {}

  @Query(() => [FightModel], { name: "get_all_fights" })
  async fights() {
    return this.repo.findAll();
  }
  @ResolveField(() => FighterModel, { name: "fighter_a" })
  async getFighterA(@Parent() fight: FightModel) {
    return this.fighterRepo.findById(fight.fighter_a_id);
  }

  @ResolveField(() => FighterModel, { name: "fighter_b" })
  async getFighterB(@Parent() fight: FightModel) {
    return this.fighterRepo.findById(fight.fighter_b_id);
  }

  @ResolveField(() => EventModel, { name: "event" })
  async getEvent(@Parent() fight: FightModel) {
    return this.eventRepo.findById(fight.event_id);
  }
  @Query(() => FightModel, { name: "get_fight_by_id", nullable: true })
  async fight(@Args("id", { type: () => Int }) id: number) {
    return this.repo.findById(id);
  }

  @Mutation(() => FightModel, { name: "create_fight" })
  async createFight(@Args("input") input: CreateFightInput) {
    return this.repo.create({ ...input, is_finished: false });
  }

  @Mutation(() => FightModel, { name: "update_fight" })
  async updateFight(
    @Args("input") input: UpdateFightInput
  ): Promise<FightModel> {
    const existing = await this.repo.findById(input.fight_id);
    if (!existing) throw new Error("Fight not found");

    const updated = await this.repo.create({
      ...existing,
      ...input,
      updated_at: new Date(),
    });

    if (updated.is_finished && updated.winner_id) {
      await this.ratingQueue.add(RatingQueueJob.FIGHT_RESULT, {
        fightId: updated.fight_id,
      });
    }

    return updated;
  }

  @Mutation(() => Boolean, { name: "delete_fight" })
  async deleteFight(@Args("id", { type: () => Int }) id: number) {
    await this.repo.delete(id);
    return true;
  }
}
