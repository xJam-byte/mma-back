import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RankingOrmEntity } from "./ranking.orm-entity";

@Injectable()
export class RankingRepository {
  constructor(
    @InjectRepository(RankingOrmEntity)
    private readonly repo: Repository<RankingOrmEntity>
  ) {}

  async findByFighterAndWeight(
    fighterId: number,
    weightClassId: number
  ): Promise<RankingOrmEntity | null> {
    return this.repo.findOne({
      where: {
        fighter_id: fighterId,
        weight_class_id: weightClassId,
      },
    });
  }

  async findAllByWeightClass(
    weightClassId: number
  ): Promise<RankingOrmEntity[]> {
    return this.repo.find({
      where: { weight_class_id: weightClassId },
      order: { points: "DESC" },
    });
  }

  async save(entity: RankingOrmEntity): Promise<RankingOrmEntity> {
    return this.repo.save(entity);
  }
}
