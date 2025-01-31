export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();

  // 날짜가 오늘이면 "HH:mm" 형식
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 날짜가 다르면 "YYYY-MM-DD" 형식
  return date.toISOString().split("T")[0];
};
