const bcrypt = require('bcryptjs');
const config = require('../config/index');
const { MAP_ORDER } = require('./constants');

const { salt_sync } = config.common.encryption;

const salt = bcrypt.genSaltSync(parseInt(salt_sync));

exports.encryptPassword = password => bcrypt.hashSync(password, salt);

exports.checkPassword = (password, hashed) => bcrypt.compareSync(password, hashed);

exports.order = (data, sortKey, sortOrder) => {
  const ordering = MAP_ORDER[sortOrder];
  const sorting = (x, y) => (x >= y ? 1 : -1) * ordering;
  return data.sort((x, y) => sorting(x[sortKey], y[sortKey]));
};
