import { Participant } from "../models/participants.js";
import { Event } from "../models/events.js";
import { ObjectId } from "mongodb";

const postForm = (req, res, next) => {


  const prefix = req.body.prefix;
  const name = req.body.name;
  const institution = req.body.institution;
  const department = req.body.department;
  const contact = req.body.contact;
  const email = req.body.email;
  const eventId = req.body.eventId;

  // console.log(req.query);
  if (
    !prefix ||
    !name ||
    !institution ||
    !department ||
    !contact ||
    !email ||
    !eventId
  ) {
    return res.status(400).json({
      status: 400,
      message: "Missing field variables, Please fill the form again",
      success: false,
    });
  }

  const participant = new Participant({
    prefix: prefix,
    name: name,
    institute: institution,
    department: department,
    contact: contact,
    email: email,
    event_id: new ObjectId(eventId),
  });

  return participant
    .save()
    .then((response) => {
      if (!response) {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      }

      return res.status(201).json({
        status: 201,
        message: "User created",
        success: true,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        sucess: false,
      });
    });
};

const getEvents = (req, res, next) => {
  // console.log("executing events")
  Event.find()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "No events found!",
          success: false,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Found events",
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        success: false,
      });
    });
};

const getEventById = (req, res, next) => {
  const eventId = req.body.eventId;

  if (!eventId) {
    return res.status(400).json({
      status: 400,
      message: "Missing field variables",
      success: false,
    });
  }

  Event.findById(eventId)
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Event found",
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        sucess: false,
      });
    });
};

export { postForm, getEvents, getEventById };
