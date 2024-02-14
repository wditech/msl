const User = require("../models/User.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const utility = require("../helpers/utility.helpers");

const authCtrl = {};

authCtrl.register = async (req, res) => {
  // validate user
  const { error } = utility.schemaRegister.validate(req.body);

  if (error) {
    return utility.resMessage(res, 400, false, error.details[0].message);
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return utility.resMessage(res, 400, false, "Email ya registrado");
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  try {
    const savedUser = await user.save();
    utility.resMessage(res, 200, true, savedUser);
  } catch (error) {
    utility.resMessage(res, 400, false, error);
  }
};

authCtrl.login = async (req, res) => {
  // validaciones
  const { error } = utility.schemaLogin.validate(req.body);
  if (error)
    return utility.resMessage(res, 400, false, error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return utility.resMessage(res, 400, false, "Usuario no encontrado");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return utility.resMessage(res, 400, false, "contraseña no válida");

  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1m", // expires in 1 hour
    }
  );

  const data = { token };
  utility.resMessage(res, 200, true, data);
};

module.exports = authCtrl;
