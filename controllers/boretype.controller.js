const BoreType = require("../models/boreType.models");
const apiBoreType = {};
const utility = require("../helpers/utility.helpers");

apiBoreType.listAll = async (req, res) => {
  try {
    const boreType = await BoreType.find();
    return utility.resMessage(res, 200, true, boreType);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiBoreType.listOne = async (req, res) => {
  try {
    const { id } = req.params;
    const boreType = await BoreType.findById({ _id: id });
    if (!boreType) {
      return utility.resMessage(
        res,
        404,
        false,
        "The Bore Type does not exist"
      );
    }
    return utility.resMessage(res, 200, true, boreType);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiBoreType.add = async (req, res) => {
  try {
    const boreTypeExist = await BoreType.findOne({
      description: req.body.description,
    });
    if (boreTypeExist) {
      return utility.resMessage(res, 404, false, "The Bore Type already exist");
    }
    const boreType = new BoreType({
      description: req.body.description,
    });
    const savedBoreType = await boreType.save();
    return utility.resMessage(res, 200, true, savedBoreType);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiBoreType.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const boreType = await BoreType.findById({ _id: id });
    if (!boreType) {
      return utility.resMessage(
        res,
        404,
        false,
        "The Bore Type does not exist"
      );
    }
    await boreType.deleteOne();
    return utility.resMessage(res, 200, true, "the Bore Type was deleted");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiBoreType.update = async (req, res) => {
  try {
    const { id } = req.params;
    const oldBoreType = await BoreType.findById({ _id: id });
    if (!oldBoreType) {
      return utility.resMessage(
        res,
        404,
        false,
        "The Bore Type does not exist"
      );
    }
    const boreType = {
      description: req.body.description,
    };
    await oldBoreType.updateOne(boreType);
    return utility.resMessage(res, 200, true, "the Bore ype was updated");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

module.exports = apiBoreType;
