import { registerEnumType } from "@nestjs/graphql";

export enum MethodOfVictory {
  KO = "KO",
  TKO = "TKO",
  SUBMISSION = "SUBMISSION",
  DECISION = "DECISION",
  DRAW = "DRAW",
  DQ = "DQ",
}

registerEnumType(MethodOfVictory, {
  name: "MethodOfVictory",
});
