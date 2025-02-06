export const formatDate = (timestamp: string) => {
  const utcDate = new Date(timestamp);
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString().split("T")[0];
};
