import express from 'express';
import Joi from 'joi';
import {listContacts, getContactById, addContact, removeContact, updateContactInfo} from '../services/contactsServices.js';

import HttpError from '../helpers/HttpError.js';
import validateBody from '../helpers/validateBody.js';



const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).min(1);

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
      } catch (error) {
        next(HttpError(500, 'Error fetching contacts'));
      }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
        if (contact) {
          res.status(200).json(contact);
        } else {
          res.status(404).json({ message: 'Not found' });
        }
      } catch (error) {
        next(HttpError(500, 'Error fetching contact'));
      }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const removedContact = await removeContact(id);
        if (removedContact) {
          res.status(200).json(removedContact);
        } else {
          res.status(404).json({ message: 'Not found' });
        }
      } catch (error) {
        next(HttpError(500, 'Error deleting contact'));
      }
};

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        if (!name, !email, !phone) {
          throw HttpError(400, 'All fields are required');
        }
    
        const newContact = await addContact(name, email, phone);
        res.status(201).json(newContact);
      } catch (error) {
        next(error);
      }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'Body must have at least one field' });
    }

    const updatedContact = await updateContactInfo(id, updatedData);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(HttpError(500, 'Error updating contact'));
  }
};

export const updateFavoriteStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    contact.favorite = favorite;
    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    next(new HttpError(500, 'Error updating favorite status'));
  }
};