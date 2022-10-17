const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
  const { name, email, password } = req.body;

    // перевірка чи є вже такий юзер в базі
  const user = await User.findOne({ email });
  // якщо є, то викидається помилка 409(конфлікт)
  if (user) {
    throw RequestError(409, "Email in use");
  }
  // реєстрація нового юзера та хешування паролю
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({name, email, password: hashPassword});
  res.status(201).json({
    name: result.name,
    email: result.email,
  })
  
}

module.exports = register;