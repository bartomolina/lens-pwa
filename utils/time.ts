const units: { unit: Intl.RelativeTimeFormatUnit; secondsInUnit: number }[] = [
  { unit: "year", secondsInUnit: 31_536_000_000 },
  { unit: "month", secondsInUnit: 2_628_000_000 },
  { unit: "day", secondsInUnit: 86_400_000 },
  { unit: "hour", secondsInUnit: 3_600_000 },
  { unit: "minute", secondsInUnit: 60_000 },
  { unit: "second", secondsInUnit: 1000 },
];

export const getTimeAgo = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat();

  const secondsElapsed = Date.now() - timestamp;

  for (const { unit, secondsInUnit } of units) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      return rtf.format(Math.floor(secondsElapsed / secondsInUnit) * -1, unit);
    }
  }

  return "";
};
