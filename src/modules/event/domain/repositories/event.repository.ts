import { Event } from "../entities/event.entity";

export interface IEventRepository {
  create(event: Partial<Event>): Promise<Event>;
  findAll(): Promise<Event[]>;
  findById(id: number): Promise<Event | null>;
}
