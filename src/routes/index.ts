import { Router } from "express";
import authApi from "../services/auth-api";

const routes = Router();

routes.use('/auth', authApi);

export default routes;
