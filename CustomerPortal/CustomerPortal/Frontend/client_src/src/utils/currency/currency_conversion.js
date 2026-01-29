export const currency_conversion = {
  convertToCents: (amount) => amount * 100,
  convertFromCents: (amount) => amount / 100,
  currencyFormat: (num, digits = 2, isAccounting = false) => {
    let showLess = false;
    if (isAccounting) {
      showLess = String(num)[0] === "-";
    }

    let result =
      "$" + Number(num).toFixed(digits).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    if (showLess) {
      result = result.replace("-", "");
      result = `(${result})`;
    }

    return result;
  },
};
