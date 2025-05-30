"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const validate = (rules, customMessages = {}) => {
    return (req, res, next) => {
        const validation = new validatorjs_1.default(req.body, rules, customMessages);
        if (validation.fails()) {
            return res.status(422).json({
                message: "Validation failed",
                errors: validation.errors.all(),
            });
        }
        next();
    };
};
exports.validate = validate;
