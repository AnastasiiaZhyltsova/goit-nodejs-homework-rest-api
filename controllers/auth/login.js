const { User } = require('../../models/user');
const bcrypt = require("bcrypt");
const { RequestError } = require('../../helpers');
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  // потрбно додати в login перевірку на верифікації
  if (!user.verify) {
    throw RequestError(401, "Email not verify");
  }
     // метод який перевіряє чи є строка result захешованною версією password (повертає true(захешоване) або false);
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
   await User.findByIdAndUpdate(user._id, {token})
  res.json({
    token,
  })
}

module.exports = login;