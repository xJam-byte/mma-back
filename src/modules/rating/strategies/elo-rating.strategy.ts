import { Injectable } from "@nestjs/common";

@Injectable()
export class EloRatingStrategy {
  private readonly K = 32;

  calculate(
    winnerPoints: number,
    loserPoints: number
  ): {
    newWinnerRating: number;
    newLoserRating: number;
  } {
    const expectedWinner = 1 / (1 + 10 ** ((loserPoints - winnerPoints) / 400));
    const expectedLoser = 1 - expectedWinner;

    const newWinnerRating = Math.round(
      winnerPoints + this.K * (1 - expectedWinner)
    );
    const newLoserRating = Math.round(
      loserPoints + this.K * (0 - expectedLoser)
    );

    return { newWinnerRating, newLoserRating };
  }
}
