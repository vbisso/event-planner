import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// authRouter.get(
//   "/",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req: Request, res: Response) => {
//     res.redirect("/");
//   }
// );

authRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
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
