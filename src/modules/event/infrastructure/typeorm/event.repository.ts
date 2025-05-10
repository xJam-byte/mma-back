import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventOrmEntity } from "./event.orm-entity";
import { IEventRepository } from "../../domain/repositories/event.repository";
import { Event } from "../../domain/entities/event.entity";

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventOrmEntity)
    private readonly repo: Repository<EventOrmEntity>
  ) {}

  async create(event: Partial<Event>): Promise<Event> {
    const saved = await this.repo.save(event);
    return saved;
  }

  async findAll(): Promise<Event[]> {
    return this.repo.find();
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<Event | null> {
    return this.repo.findOneBy({ event_id: id });
  }
}
