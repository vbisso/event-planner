// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";

export const validate = (rules: Validator.Rules, customMessages = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, rules, customMessages);

    if (validation.fails()) {
      return res.status(422).json({
        message: "Validation failed",
        errors: validation.errors.all(),
      });
    }

    next();
  };
};
