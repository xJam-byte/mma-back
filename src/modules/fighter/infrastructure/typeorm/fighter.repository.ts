import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FighterOrmEntity } from "./fighter.orm-entity";
import { Fighter } from "../../domain/entities/fighter.entity";
import { IFighterRepository } from "../../domain/repositories/fighter.repository";

@Injectable()
export class FighterRepository implements IFighterRepository {
  constructor(
    @InjectRepository(FighterOrmEntity)
    private readonly repo: Repository<FighterOrmEntity>
  ) {}

  async create(fighter: Partial<Fighter>): Promise<Fighter> {
    const saved = await this.repo.save(fighter);
    return saved;
  }

  async findAll(): Promise<Fighter[]> {
    return this.repo.find();
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<Fighter | null> {
    return this.repo.findOneBy({ fighter_id: id });
  }
}
