import { Router } from "express";
import {
    postForm,
    getForm,
    getFormById,
    updateForm,
} from "../controller/forms.js";

const formsRouter = Router();

formsRouter.post("/forms/post-form", postForm);
formsRouter.post("/forms/update-form", updateForm);
formsRouter.get("/forms/get-forms", getForm);
formsRouter.post("/forms/get-form-by-id", getFormById);

export { formsRouter };