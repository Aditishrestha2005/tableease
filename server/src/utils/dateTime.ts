
export const combineDateAndTime = (
  date: Date,
  time: string
): Date => {
  const [hours, minutes] = time.split(":").map(Number);

  const combinedDate = new Date(date);

  combinedDate.setHours(hours, minutes, 0, 0);

  return combinedDate;
};

export const calculateEndTime = (
  startTime: Date,
  duration: number
): Date => {
  const endTime = new Date(startTime);

  endTime.setHours(endTime.getHours() + duration);

  return endTime;
};


export const hasTimeConflict = (
  existingStart: Date,
  existingEnd: Date,
  newStart: Date,
  newEnd: Date
): boolean => {
  return (
    newStart < existingEnd &&
    newEnd > existingStart
  );
};