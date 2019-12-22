const yup = require('yup');
const { alphaNumRegex, enumCoinRegex } = require('../constants');

exports.signUpSchema = yup.object().shape({
  name: yup.string().required('The name field is required.'),
  lastName: yup.string().required('The lastName field is required.'),
  userName: yup.string().required('The userName field is required.'),
  password: yup
    .string()
    .required('The password field is required.')
    .min(8, 'The password must be at least 8')
    .matches(alphaNumRegex, 'The password may only contain letters and numbers.'),
  preferredCoin: yup
    .string()
    .required('The preferredCoin field is required.')
    .matches(enumCoinRegex, 'The preferredCoin format is invalid.')
});
