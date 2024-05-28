const jwt = require("jsonwebtoken");

const signToken = (user) => {
  const token = jwt.sign({ id: user._id, role: user.roles }, "secret", {
    expiresIn: 60 * 60 * 24,
  });
  return token;
};
const signTokenEstablecimiento = (role) => {
  const token = jwt.sign({ role: role }, "secret", {
    expiresIn: 60 * 60 * 24,
  });
  return token;
};
module.exports.signTokenEstablecimiento = signTokenEstablecimiento;
exports.signToken = signToken;
