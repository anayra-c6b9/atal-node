import { Router } from "express";
import {
  getAdminLogout,
  postAdminLogin,
  postCreateAdmin,
} from "../controller/auth.js";

const authRouter = Router();

authRouter.post("/admin/login", postAdminLogin);
// authRouter.post("/admin/create", postCreateAdmin);
authRouter.get("/admin/logout", getAdminLogout);

export { authRouter };
