export class RankingEntity {
  constructor(
    public readonly ranking_id: number,
    public fighter_id: number,
    public weight_class_id: number,
    public points: number,
    public win_percentage?: number,
    public last_fight_date?: Date,
    public rank?: number,
    public updated_at?: Date
  ) {}
}
