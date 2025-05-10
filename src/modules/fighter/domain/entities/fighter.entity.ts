export class Fighter {
  constructor(
    public readonly fighter_id: number,
    public first_name: string,
    public last_name: string,
    public weight_class_id: number,
    public nickname?: string,
    public birthdate?: string,
    public country?: string,
    public height_cm?: number,
    public weight_kg?: number,
    public reach_cm?: number,
    public stance?: string,
    public gym_id?: number,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
