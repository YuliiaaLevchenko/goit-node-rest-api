import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../schemas/user.js";

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  console.log({ authorizationHeader });

  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2);

  console.log({ bearer, token });

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    try {
      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).send({ message: "Invalid token" });
      }

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token" });
      }

      console.log({ decode });

      req.user = {
        id: user._id,
        name: user.name,
      };

      next();
    } catch (error) {
      next(error);
    }
  });
}
export const validateUser = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
  };
  export const validateContact = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean()
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
  };  

export default auth;