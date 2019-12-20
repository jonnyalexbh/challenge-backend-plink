const yup = require('yup');

exports.currencyAddSchema = yup.object().shape({
  currency: yup.string().required('The currency field is required.')
});
