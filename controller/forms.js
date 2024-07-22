import { Event } from "../models/events.js";
import { ObjectId } from "mongodb";
import { Form } from "../models/forms.js";

const postForm = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const isActive = req.body.isActive || false;
  const outdoorActivity = req.body.outdoorActivity || false;
  const crowdSize = req.body.crowdSize || null;

  // console.log(req.query);
  if (!title || !description || !location) {
    return res.status(400).json({
      status: 400,
      message: "Missing field variables, Please fill the form again",
      success: false,
    });
  }

  const formData = new Form({
    title: title,
    description: description,
    location: location,
    isActive: isActive,
    outdoorActivity: outdoorActivity,
    crowdSize: crowdSize ? null : crowdSize,
  });

  return formData
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
        message: "Form Submitted",
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

const getForm = (req, res, next) => {
  // console.log("executing events")

  Form.find()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "No form found!",
          success: false,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Found form",
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

const getFormById = (req, res, next) => {
  const formId = req.body._id;

  if (!formId) {
    return res.status(400).json({
      status: 400,
      message: "Missing field variables",
      success: false,
    });
  }

  Form.findById(formId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Form not found",
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

const updateForm = (req, res, next) => {
  const id = req.body._id;
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const isActive = req.body.isActive || false;
  const outdoorActivity = req.body.outdoorActivity || false;
  const crowdSize = req.body.crowdSize || null;

  // console.log(req.query);
  if (!title || !description || !location || !id) {
    return res.status(400).json({
      status: 400,
      message: "Missing field variables, Please fill the form again",
      success: false,
    });
  }

  Form.findByIdAndUpdate(id, {
    title: title,
    description: description,
    location: location,
    isActive: isActive,
    outdoorActivity: outdoorActivity,
    crowdSize: crowdSize,
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Form not found",
          success: false,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Form updated",
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

const deleteFormById = (req, res, next) => {
  const formId = req.body._id;

  if (!formId) {
    return res.status(400).json({
      status: 400,
      message: "Missing field variables",
      success: false,
    });
  }

  Form.findByIdAndDelete(formId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Form not found",
          success: false,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Form Deleted",
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

export { postForm, getForm, getFormById, updateForm, deleteFormById };
