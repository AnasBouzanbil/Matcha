

import { Router, Response, Request } from "express";
import router from "../user/user";
import { Handle_confirm_email_routes } from "./email.services";
import { authorizeToken } from "../..";



router.post('/confirmemail',authorizeToken , Handle_confirm_email_routes);