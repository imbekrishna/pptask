import { DateTime } from "luxon";
import { zones } from "tzdata";

export const luxonValidTimezones = [
  ...new Set(
    Object.keys(zones)
      .filter((tz) => DateTime.local().setZone(tz).isValid)
      .map((tz) => `${tz} (${DateTime.local().setZone(tz).toFormat("ZZZZ")})`)
  ),
].sort((a, b) => (a < b ? -1 : 1));