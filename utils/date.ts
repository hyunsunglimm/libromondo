export const convertToKST = (utcString: string): string => {
  const date = new Date(utcString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  };

  const formatter = new Intl.DateTimeFormat("ko-KR", options);

  const formattedDate = formatter.format(date);

  const array = formattedDate.split(" ");

  const [year, month, day, time] = [array[0], array[1], array[2], array[3]];

  return `${year}${month}${day} ${time}`;
};
