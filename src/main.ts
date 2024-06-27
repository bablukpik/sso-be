import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

// A root route
// app.get("/", (_, res) => {
//   return API_RESPONSES.errors.forbidden(res);
// });

// The '/api' prefix for all other routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
