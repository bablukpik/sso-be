// Configuration file for authentication strategies
import passport from "passport";
import {
  // SamlConfig,
  Strategy as SamlStrategy,
  VerifiedCallback,
} from "@node-saml/passport-saml";

import { Strategy as OAuth2Strategy, VerifyCallback } from "passport-oauth2";
import { findByEmail, findByNameID } from "../models/userModel";
import { User as CustomUser } from "../types/User";

// Define the SAML strategy configuration
const samlConfig: any = {
  path: "/login/callback",
  entryPoint: "https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php",
  issuer: "passport-saml",
  cert: "fake cert", // cert must be provided
};

// Define the OAuth2 strategy configuration
const oAuth2Config = {
  authorizationURL: "https://provider.example.com/oauth2/authorize",
  tokenURL: "https://provider.example.com/oauth2/token",
  clientID: "client-id",
  clientSecret: "client-secret",
  callbackURL: "/auth/oauth2/callback",
};

// SAML strategy configuration
passport.use(
  new SamlStrategy(
    samlConfig,
    async (profile: any, done: VerifiedCallback) => {
      try {
        // For signon
        const user = await findByEmail(profile.email);
        return done(null, user);
      } catch (err: any) {
        return done(err.toString());
      }
    },
    async (profile: any, done: VerifiedCallback) => {
      // For logout verify function
      try {
        const user = await findByNameID(profile.nameID);
        return done(null, user);
      } catch (err: any) {
        return done(err.toString());
      }
    }
  )
);

// OAuth2 strategy configuration
passport.use(
  new OAuth2Strategy(
    oAuth2Config,
    (
      accessToken: string,
      refreshToken: string,
      params: any,
      profile: any,
      done: VerifyCallback
    ) => {
      // Extract relevant user information from profile and params
      const user: CustomUser = {
        id: profile.id,
        email: profile.email,
        username: profile.username,
        role: "user", // Set a default role
      };
      return done(null, user);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
  done(null, obj);
});
