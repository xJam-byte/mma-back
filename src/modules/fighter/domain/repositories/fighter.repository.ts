import { Fighter } from "../entities/fighter.entity";

export interface IFighterRepository {
  create(fighter: Partial<Fighter>): Promise<Fighter>;
  findAll(): Promise<Fighter[]>;
  findById(id: number): Promise<Fighter | null>;
}
