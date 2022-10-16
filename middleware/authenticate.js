// дістає заголовок authorization із заголовків req.headers
// розділяємо заголовок на 2 слова:
// якщо 1 слово !== "Bearer" - поимлка 401
// перевірити чи валідний токен, якщо ні - помилка 401
// якщо токен валідний, то беремо із нього іd та шукаємо користувача з таким id, якщо немає - помилка 401.

const jwt = require('jsonwebtoken');
const {RequestError} = require("../helpers")
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
      throw RequestError(401);
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
        throw Error("Unauthorized")
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
