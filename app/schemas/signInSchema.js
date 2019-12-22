const yup = require('yup');

exports.signInSchema = yup.object().shape({
  userName: yup.string().required('The userName field is required.'),
  password: yup.string().required('The password field is required.')
});

exports.tokenSchema = yup.object().shape({
  Authorization: yup.string().required('The authorization is required.')
});
