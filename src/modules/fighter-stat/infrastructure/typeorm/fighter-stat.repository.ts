import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FighterStatOrmEntity } from "./fighter-stat.orm-entity";

@Injectable()
export class FighterStatRepository {
  constructor(
    @InjectRepository(FighterStatOrmEntity)
    private readonly repo: Repository<FighterStatOrmEntity>
  ) {}

  async findByFighterId(
    fighterId: number
  ): Promise<FighterStatOrmEntity | null> {
    return this.repo.findOne({ where: { fighter_id: fighterId } });
  }

  async save(entity: FighterStatOrmEntity): Promise<FighterStatOrmEntity> {
    return this.repo.save(entity);
  }
}
