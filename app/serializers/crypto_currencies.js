exports.userCryptocurrencies = cryptocurrencies =>
  cryptocurrencies.map(({ last_price, coin_name, source }) => ({
    price: last_price,
    name: coin_name,
    source
  }));
