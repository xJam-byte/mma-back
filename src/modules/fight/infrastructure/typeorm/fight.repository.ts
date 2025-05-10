import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FightOrmEntity } from "./fight.orm-entity";
import { Repository } from "typeorm";
import { IFightRepository } from "../../domain/repositories/fight.repository";

Injectable();
export class FightRepository implements IFightRepository {
  constructor(
    @InjectRepository(FightOrmEntity)
    private readonly repo: Repository<FightOrmEntity>
  ) {}
  async create(data: Partial<FightOrmEntity>): Promise<FightOrmEntity> {
    return this.repo.save(data);
  }

  async findAll(): Promise<FightOrmEntity[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<FightOrmEntity | null> {
    return this.repo.findOneBy({ fight_id: id });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
