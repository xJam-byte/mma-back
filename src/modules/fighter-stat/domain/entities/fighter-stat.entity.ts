export class FighterStatEntity {
  constructor(
    public readonly fighter_stat_id: number,
    public readonly fighter_id: number,
    public wins: number,
    public losses: number,
    public draws: number,
    public no_contests: number,
    public ko_wins: number,
    public submission_wins: number,
    public decision_wins: number,
    public ko_losses: number,
    public submission_losses: number,
    public decision_losses: number
  ) {}
}
