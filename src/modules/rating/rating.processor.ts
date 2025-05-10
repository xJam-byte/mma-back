import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { RATING_QUEUE, RatingQueueJob } from "./rating.queue";
import { RatingService } from "./application/rating.service";

@Processor(RATING_QUEUE)
export class RatingProcessor {
  constructor(private readonly ratingService: RatingService) {}

  @Process(RatingQueueJob.FIGHT_RESULT)
  async handleFightResult(job: Job<{ fightId: number }>) {
    const { fightId } = job.data;
    console.log(`[RATING] Recalculating ratings for fight ${fightId}`);
    await this.ratingService.recalculate(fightId);
    console.log(`[RATING] Done fight ${fightId}`);
  }
}
