const Observation = require("../models/Observation.models");
const apiObservation = {};
const utility = require("../helpers/utility.helpers");

apiObservation.listAll = async (req, res) => {
  try {
    const observations = await Observation.find();
    return utility.resMessage(res, 200, true, observations);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiObservation.listOne = async (req, res) => {
  try {
    const { id } = req.params;
    const observation = await Observation.findById({ _id: id });
    if (!observation) {
      return utility.resMessage(
        res,
        404,
        false,
        "the observation does not exist"
      );
    }
    return utility.resMessage(res, 200, true, observation);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiObservation.add = async (req, res) => {
  try {
    let { observation, places } = req.body;
    places = places === "true";
    const newObservation = new Observation({
      observation,
      places,
    });
    const savedObservation = await newObservation.save();
    return utility.resMessage(res, 200, true, savedObservation);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiObservation.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const observation = await Observation.findById({ _id: id });
    if (!observation) {
      return utility.resMessage(
        res,
        404,
        false,
        "the observation does not exist"
      );
    }
    await observation.deleteOne();
    return utility.resMessage(res, 200, true, "the observation was deleted");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiObservation.update = async (req, res) => {
  try {
    const { id } = req.params;
    const oldObservation = await Observation.findById({ _id: id });
    if (!oldObservation) {
      return utility.resMessage(
        res,
        404,
        false,
        "The observation does not exist"
      );
    }
    let { observation, places } = req.body;
    places = places === "true";
    const newObservation = {
      observation,
      places,
    };
    await oldObservation.updateOne(newObservation);
    return utility.resMessage(res, 200, true, "the observation was updated");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

module.exports = apiObservation;
