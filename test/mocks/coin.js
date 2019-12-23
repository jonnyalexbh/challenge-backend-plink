exports.newCoin = { coin: 'btc', userId: 1 };

exports.listCoinsByUser = [
  {
    price: '7407.62539063',
    name: 'Bitcoin',
    source: 'BraveNewCoin'
  }
];

exports.checkCoinError = {
  success: false,
  error: 'The coin specified is not available'
};

exports.checkCoinOk = {
  success: true,
  source: 'BraveNewCoin',
  time_stamp: '1577131561',
  utc_date: '2019-12-23 20:06:01',
  coin_id: 'BTC',
  coin_name: 'Bitcoin',
  last_price: '7407.62539063',
  price_24hr_pcnt: '0.06',
  volume_24hr: '6315138630',
  vol_24hr_pcnt: '51.61',
  currency: 'USD',
  currency_name: 'United States Dollar'
};
