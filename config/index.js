const ENVIRONMENT = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');

if (ENVIRONMENT !== 'production') dotenv.config();

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
 */
const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] === undefined) {
        target[key] = source[key];
      } else assignObject(target[key], source[key]);
    });
  }
  return target;
};

const config = {
  common: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET
    },
    braveNewCoinApi: {
      braveUri: process.env.BRAVENEWCOIN_URI,
      braveApiHost: process.env.BREAVE_API_HOST,
      braveApiKey: process.env.BREAVE_API_KEY
    },
    jwt: {
      secret_key: process.env.SECRET_KEY,
      expiresInMinutes: process.env.EXPIRE_JWT
    },
    encryption: {
      salt_sync: process.env.BCRYPT_SALT
    },
    headers: {
      apiDate: process.env.API_DATE || 'X-API-Date',
      packageVersion: process.env.PACKAGE_VERSION || 'X-Package-Version',
      nodeVersion: process.env.NODE_VERSION || 'X-Node-Version'
    }
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
