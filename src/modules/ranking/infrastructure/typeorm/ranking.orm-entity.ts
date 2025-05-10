import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("rankings")
export class RankingOrmEntity {
  @PrimaryGeneratedColumn()
  ranking_id: number;

  @Column()
  fighter_id: number;

  @Column()
  weight_class_id: number;

  @Column({ type: "int", default: 1000 })
  points: number;

  @Column({ type: "float", nullable: true })
  win_percentage?: number;

  @Column({ type: "date", nullable: true })
  last_fight_date?: string;

  @Column({ type: "int", nullable: true })
  rank?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
