// export default function validate(values) {
//     let errors = {};
//     if (!values.name) {
//       errors.name = 'name address is required';
//     } else if (!/a-zA-Z/.test(values.name)) {
//       errors.name = 'name address is invalid';
//     } 
//     if (!values.about) {
//       errors.about = 'about is required';
//     } else if (values.about.length < 8) {
//       errors.about = 'about must be 8 or more characters';
//     }
//     return errors;
//   };