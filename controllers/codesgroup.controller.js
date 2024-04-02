const CodesGroup = require("../models/Codesgroup.models");
const apiCodesGroup = {};
const utility = require("../helpers/utility.helpers");
const SecondaryCode = require("../models/SecondaryCode.models");

apiCodesGroup.listAll = async (req, res) => {
  try {
    const codesGroups = await CodesGroup.find().populate("secondaryCodes");
    return utility.resMessage(res, 200, true, codesGroups);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodesGroup.listOne = async (req, res) => {
  try {
    const { id } = req.params;
    const codesGroup = await CodesGroup.findById({ _id: id }).populate(
      "secondaryCodes"
    );
    if (!codesGroup) {
      return utility.resMessage(
        res,
        404,
        false,
        "the codes group does not exist"
      );
    }
    return utility.resMessage(res, 200, true, codesGroup);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodesGroup.add = async (req, res) => {
  try {
    let { code, description, secondaryCodes, jsonVar } = req.body;
    const newCodesGroup = new CodesGroup({
      code,
      description,
      jsonVar,
    });
    for (const code of secondaryCodes) {
      const secondaryCode = await SecondaryCode.findById({
        _id: code.code,
      });
      if (!secondaryCode) {
        return utility.resMessage(
          res,
          404,
          false,
          "The codes group not Exists"
        );
      }
      newCodesGroup.secondaryCodes.push(secondaryCode);
    }
    const savedCodesGroup = await newCodesGroup.save();
    return utility.resMessage(res, 200, true, savedCodesGroup);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodesGroup.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const CodesGroup = await CodesGroup.findById({ _id: id });
    if (!CodesGroup) {
      return utility.resMessage(
        res,
        404,
        false,
        "the codes group does not exist"
      );
    }
    await CodesGroup.deleteOne();
    return utility.resMessage(res, 200, true, "the codes group was deleted");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodesGroup.update = async (req, res) => {
  try {
    const { id } = req.params;
    const oldCodesGroup = await CodesGroup.findById({ _id: id });
    if (!oldCodesGroup) {
      return utility.resMessage(
        res,
        404,
        false,
        "The codes group does not exist"
      );
    }
    let { code, description, secondaryCodes, jsonVar } = req.body;
    oldCodesGroup.code = code;
    oldCodesGroup.description = description;
    oldCodesGroup.jsonVar = jsonVar;
    oldCodesGroup.secondaryCodes = [];
    for (const code of secondaryCodes) {
      const secondaryCode = await SecondaryCode.findById({
        _id: code.code,
      });
      if (!secondaryCode) {
        return utility.resMessage(
          res,
          404,
          false,
          "The secondary code not Exists"
        );
      }
      oldCodesGroup.secondaryCodes.push(secondaryCode);
    }
    await oldCodesGroup.save();
    return utility.resMessage(res, 200, true, "the codes group was updated");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

module.exports = apiCodesGroup;
