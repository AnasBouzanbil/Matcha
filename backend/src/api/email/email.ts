

import { Router, Response, Request } from "express";
import router from "../user/user";
import { Handle_confirm_email_routes } from "./email.services";



router.post('/confirmemail', Handle_confirm_email_routes);