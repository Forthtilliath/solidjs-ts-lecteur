import { REPEAT } from "@utils/constants";

declare global {
  type RepeatRange = typeof REPEAT[keyof typeof REPEAT];
}

export {};
