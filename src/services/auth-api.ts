import { Router } from "express";
import passport from "passport";

const authApi = Router();

authApi.get("/users", function (req, res) {
  res.json({
    username: "Bablu",
  });
});

authApi.get("/saml", passport.authenticate("saml"));

authApi.post(
  "/saml/callback",
  passport.authenticate("saml", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

authApi.get("/oauth2", passport.authenticate("oauth2"));

authApi.get(
  "/oauth2/callback",
  passport.authenticate("oauth2", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

export default authApi;
