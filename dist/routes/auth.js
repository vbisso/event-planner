"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authRouter = express_1.default.Router();
authRouter.get("/", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/");
});
authRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        res.redirect("/");
    });
});
// authRouter.get("/profile", (req: Request, res: Response) => {
//   if (!req.user) {
//     return res.redirect("/");
//   }
//   const user = req.user as { displayName: string; email?: string };
//   res.render("profile", { user });
// });
module.exports = authRouter;
