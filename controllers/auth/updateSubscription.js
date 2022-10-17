const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true })
  res.json(result);
}

module.exports = updateSubscription;