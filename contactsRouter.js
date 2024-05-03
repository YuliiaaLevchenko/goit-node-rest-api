import express from "express";
import {
  getAllContact,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "./contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContact);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;