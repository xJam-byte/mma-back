export class Fight {
  constructor(
    public readonly fight_id: number,
    public event_id: number,
    public fighter_a_id: number,
    public fighter_b_id: number,
    public weight_class_id: number,
    public is_finished: boolean,
    public winner_id?: number,
    public method?: string,
    public rounds?: number,
    public time?: string,
    public fight_order?: number,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
