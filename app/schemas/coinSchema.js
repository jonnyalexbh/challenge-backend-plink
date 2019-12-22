const yup = require('yup');

exports.coinCreateSchema = yup.object().shape({
  coin: yup.string().required('The coin field is required.')
});
