export class Event {
  constructor(
    public readonly event_id: number,
    public event_name: string,
    public date: string,
    public event_location?: string,
    public organization?: string,
    public created_at?: Date
  ) {}
}
