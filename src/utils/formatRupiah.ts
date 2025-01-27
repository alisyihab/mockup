const formatRupiah = (value: number) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace("IDR", "Rp")
    .trim();
};

export default formatRupiah;
