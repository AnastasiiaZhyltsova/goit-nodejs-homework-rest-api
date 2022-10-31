const { User } = require('../../models/user');
const { RequestError } = require("../../helpers");

//Беремо токен шукаємо користувача с таким токем,
// якщо немає - помилка, якщо є - птшемо, що він підтверджений(verify: true,) та відправляємо
// потрбно додати в login перевірку на верифікацію

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  // перевіряємо чи і в базі користувач с таким токеном 
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  res.json({
    message: 'Verification successful'
  })
}

module.exports = verify;