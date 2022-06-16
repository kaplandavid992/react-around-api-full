const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Wrong email format",
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    default: "Jack Cousteau",
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    default: "Explorer",
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    type: String,
    validate: {
      validator(v) {
        const re =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return re.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
});

userSchema.statics.findUserByCredentials = (email, password) => {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect password or email'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
