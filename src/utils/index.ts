export const formatCurrency = new Intl.NumberFormat("en-US", {
  // style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export const formatDate = (date: string): string => {
  const time = new Date(date);
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return `${year}/${month}/${day}`;
};
