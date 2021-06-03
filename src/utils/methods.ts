export const transformDate = (date: string) =>
  `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
