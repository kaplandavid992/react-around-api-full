// export default function validate(values) {
//     let errors = {};
//     if (!values.cardName) {
//       errors.cardName = 'cardName address is required';
//     } else if (!/\S+@\S+\.\S+/.test(values.cardName)) {
//       errors.cardName = 'cardName address is invalid';
//     } 
//     if (!values.imgUrl) {
//       errors.imgUrl = 'imgUrl is required';
//     } else if (values.imgUrl.length < 8) {
//       errors.imgUrl = 'imgUrl must be 8 or more characters';
//     }
//     return errors;
//   };