import { Fight } from "../entities/fight.entity";

export interface IFightRepository {
  create(fight: Partial<Fight>): Promise<Fight>;
  findAll(): Promise<Fight[]>;
  findById(id: number): Promise<Fight | null>;
  delete(id: number): Promise<void>;
}
