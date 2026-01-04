export const analysis = (logs) => {
  const highMood = [];
  const lowMood = [];

  logs.forEach(l => {
    if (l.mood >= 4) highMood.push(l.completionRate);
    if (l.mood <= 2) lowMood.push(l.completionRate);
  });

  const avg = arr =>
    arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

  return {
    highMoodAvg: avg(highMood),
    lowMoodAvg: avg(lowMood),
    difference: avg(highMood) - avg(lowMood),
  };
};
