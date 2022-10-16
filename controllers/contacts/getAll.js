
const{Contact} = require('../../models/contacts');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  // console.log(page);
  // console.log(limit);
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit })
    .populate("owner", "name email");
  res.json(result);
};

module.exports = getAll;