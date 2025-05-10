import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { FighterRepository } from "../../infrastructure/typeorm/fighter.repository";
import { FighterModel } from "./dto/fighter.model";
import { CreateFighterInput } from "./dto/create-fighter.input";
import { UpdateFighterInput } from "./dto/update-fighter.input";

@Resolver(() => FighterModel)
export class FighterResolver {
  constructor(private readonly fighterRepo: FighterRepository) {}

  @Query(() => [FighterModel], { name: "fighters" })
  async fighters() {
    return this.fighterRepo.findAll();
  }

  @Query(() => FighterModel, { name: "fighter", nullable: true })
  async fighter(@Args("id", { type: () => Int }) id: number) {
    return this.fighterRepo.findById(id);
  }

  @Mutation(() => FighterModel, { name: "create_fighter" })
  async createFighter(@Args("input") input: CreateFighterInput) {
    return this.fighterRepo.create(input);
  }

  @Mutation(() => FighterModel, { name: "update_fighter", nullable: true })
  async updateFighter(@Args("input") input: UpdateFighterInput) {
    const existing = await this.fighterRepo.findById(input.fighter_id);
    if (!existing) return null;
    return this.fighterRepo.create({ ...existing, ...input });
  }

  @Mutation(() => Boolean, { name: "delete_fighter" })
  async deleteFighter(
    @Args("id", { type: () => Int }) id: number
  ): Promise<boolean> {
    const fighter = await this.fighterRepo.findById(id);
    if (!fighter) return false;
    await this.fighterRepo.delete(id);
    return true;
  }
}
