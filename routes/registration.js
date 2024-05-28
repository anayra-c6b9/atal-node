import { Router } from "express";
import {
  getEventById,
  getEvents,
  postForm,
} from "../controller/registration.js";

const registrationRouter = Router();

registrationRouter.post("/registration/post-form", postForm);
registrationRouter.post("/registration/event-data-by-id", getEventById);
registrationRouter.get("/registration/events", getEvents);

export { registrationRouter };
