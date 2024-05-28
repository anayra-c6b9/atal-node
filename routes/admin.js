import { Router } from "express";
import {
  getEventParticipants,
  getParticipantById,
} from "../controller/admin.js";

const adminRouter = Router();

adminRouter.post("/admin/participant-by-event", getEventParticipants);
adminRouter.post("/admin/participant-by-id", getParticipantById);
export { adminRouter };
