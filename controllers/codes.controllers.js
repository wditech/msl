const PrincipalCode = require("../models/PrincipalCode.models");
const SecondaryCode = require("../models/SecondaryCode.models");
const CodesGroup = require("../models/Codesgroup.models");
const apiCodes = {};
const utility = require("../helpers/utility.helpers");

apiCodes.listAll = async (req, res) => {
  try {
    if (req.body.type !== "") {
      const modelCode = selectModelCode(req.body.type);
      const code =
        req.body.type === "1"
          ? await modelCode.find().populate({
              path: "codesGroups",
              populate: { path: "secondaryCodes" },
            })
          : await modelCode.find();
      if (!code) {
        return utility.resMessage(res, 404, false, "error with codes type");
      }
      return utility.resMessage(res, 200, true, code);
    }
    return utility.resMessage(res, 404, false, "error with codes type");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodes.listOne = async (req, res) => {
  try {
    if (req.body.type !== "") {
      const { id } = req.params;
      const modelCode = selectModelCode(req.body.type);
      const code =
        req.body.type === "1"
          ? await modelCode
              .findById({
                _id: id,
              })
              .populate({
                path: "codesGroups",
                populate: { path: "secondaryCodes" },
              })
          : await modelCode.findById({
              _id: id,
            });
      if (!code) {
        return utility.resMessage(res, 404, false, "Code Not Exists");
      }
      return utility.resMessage(res, 200, true, code);
    }
    return utility.resMessage(res, 404, false, "error with codes type");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodes.add = async (req, res) => {
  try {
    if (req.body.type !== "") {
      const modelCode = selectModelCode(req.body.type);
      const codeExist = await modelCode.findOne({ place: req.body.code });
      if (codeExist) {
        return utility.resMessage(res, 404, false, "The code already exist");
      }
      const newCode = new modelCode({
        code: req.body.code,
        description: req.body.description,
        price: req.body.price,
      });
      if (req.body.type === "1") {
        const codesGroups = req.body.codesGroups;
        for (const code of codesGroups) {
          const codesGroup = await CodesGroup.findById({
            _id: code.code,
          });
          if (!codesGroup) {
            return utility.resMessage(
              res,
              404,
              false,
              "The codes group not Exists"
            );
          }
          newCode.codesGroups.push(codesGroup);
        }
      } else {
        newCode.jsonBetween = req.body.jsonBetween;
      }
      const savedCode = await newCode.save();
      return utility.resMessage(res, 200, true, savedCode);
    }
    return utility.resMessage(res, 404, false, "error with codes type");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiCodes.delete = async (req, res) => {
  try {
    if (req.body.type !== "") {
      const { id } = req.params;
      const code = await selectModelCode(req.body.type).findById({
        _id: id,
      });
      if (!code) {
        return utility.resMessage(res, 404, false, "Code Not Exists");
      }
      await code.deleteOne();
      return utility.resMessage(res, 200, true, "the code was deleted");
    }
    return utility.resMessage(res, 404, false, "error with codes type");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

function selectModelCode(type) {
  if (type === "1") {
    return PrincipalCode;
  } else if (type === "2") {
    return SecondaryCode;
  }
}

apiCodes.update = async (req, res) => {
  try {
    if (req.body.type !== "") {
      const modelCode = selectModelCode(req.body.type);
      const codeExist = await modelCode.findOne({ place: req.body.code });
      if (!codeExist) {
        return utility.resMessage(res, 404, false, "The code does not exist");
      }
      codeExist.code = req.body.code;
      codeExist.description = req.body.description;
      codeExist.price = req.body.price;
      if (req.body.type === "1") {
        codeExist.CodesGroup = [];
        const codesGroups = req.body.codesGroups;
        for (const code of codesGroups) {
          const codesGroup = await CodesGroup.findById({
            _id: code.code,
          });
          if (!codesGroup) {
            return utility.resMessage(
              res,
              404,
              false,
              "The codes group not Exists"
            );
          }
          codeExist.codesGroups.push(codesGroup);
        }
      } else {
        codeExist.jsonBetween = req.body.jsonBetween;
      }
      await codeExist.save();
      return utility.resMessage(res, 200, true, "the code was updated");
    }
    return utility.resMessage(res, 404, false, "error with codes type");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

module.exports = apiCodes;
