const apiCtrl = {};
const utility = require("../helpers/utility.helpers");

apiCtrl.listAll = async (req, res) => {
  const data = {
    title: "mi ruta protegida",
    user: req.user,
  };
  utility.resMessage(res, 200, true, data);
};

module.exports = apiCtrl;
