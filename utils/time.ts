const units: { unit: Intl.RelativeTimeFormatUnit; secondsInUnit: number }[] = [
  { unit: "year", secondsInUnit: 31536000000 },
  { unit: "month", secondsInUnit: 2628000000 },
  { unit: "day", secondsInUnit: 86400000 },
  { unit: "hour", secondsInUnit: 3600000 },
  { unit: "minute", secondsInUnit: 60000 },
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
