const Place = require("../models/Place.models");
const apiPlaces = {};
const utility = require("../helpers/utility.helpers");

apiPlaces.listAll = async (req, res) => {
  try {
    const places = await Place.find();
    return utility.resMessage(res, 200, true, places);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiPlaces.listOne = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById({ _id: id });
    if (!place) {
      return utility.resMessage(res, 404, false, "The place does not exist");
    }
    return utility.resMessage(res, 200, true, place);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiPlaces.add = async (req, res) => {
  try {
    const placeExist = await Place.findOne({ place: req.body.place });
    if (placeExist) {
      return utility.resMessage(res, 404, false, "The place already exist");
    }
    const place = new Place({
      place: req.body.place,
    });
    const savedPlace = await place.save();
    return utility.resMessage(res, 200, true, savedPlace);
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiPlaces.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById({ _id: id });
    if (!place) {
      return utility.resMessage(res, 404, false, "The place does not exist");
    }
    await place.deleteOne();
    return utility.resMessage(res, 200, true, "the place was deleted");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

apiPlaces.update = async (req, res) => {
  try {
    const { id } = req.params;
    const oldPlace = await Place.findById({ _id: id });
    if (!oldPlace) {
      return utility.resMessage(res, 404, false, "The place does not exist");
    }
    const place = {
      place: req.body.place,
    };
    await oldPlace.updateOne(place);
    return utility.resMessage(res, 200, true, "the place was updated");
  } catch (error) {
    return utility.resMessage(res, 500, false, error.message);
  }
};

module.exports = apiPlaces;
