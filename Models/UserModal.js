const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const Db_key =
  "mongodb+srv://admin:admin@cluster0.gr03l53.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(Db_key)
  .then((res) => {
    console.log("Mongo Db connected");
  })
  .catch((err) => {
    console.log("err - ", err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  passward: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmpassward: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.passward === this.confirmpassward;
    },
  },
});

// Mongoose Hooks
userSchema.pre("save", function () {
  console.log("Before save into DB");
  this.confirmpassward = undefined;
});
// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.passward, salt);
//   console.log(hashedString);
//   this.passward = hashedString;
// });
userSchema.post("save", (doc) => {
  console.log("After save into DB");
});

const userModal = mongoose.model("userModal", userSchema);
async function createUser() {
  const user = {
    name: "Rajiv Gupta",
    email: "Rajivgupta.knp2019@gamil.com",
    passward: "12345678",
    confirmpassward: "12345678",
  };
  let res = await userModal.create(user);
  console.log("res", res);
}

module.exports = userModal;
