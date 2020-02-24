import { Router } from 'express';
import user from "./routes/user";
import auth from "./routes/auth";
import group from "./routes/group";

export default () => {
    const app = Router();

    auth(app);
    group(app);
    user(app);

    return app
}
