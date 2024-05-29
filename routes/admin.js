import { Router } from "express";
import {
  checkToken,
  deleteParticipantById,
  getEventParticipants,
  getParticipantById,
} from "../controller/admin.js";

const adminRouter = Router();

adminRouter.post("/admin/participant-by-event", getEventParticipants);
adminRouter.post("/admin/participant-by-id", getParticipantById);
adminRouter.get("/admin/verify", checkToken)
adminRouter.post("/admin/delete-participant-by-id", deleteParticipantById)
export { adminRouter };
