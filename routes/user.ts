import { Router, Request, Response, NextFunction, json } from "express";
import { StatusCodes } from "http-status-codes";
import { User, UserCreationAttributes, UserUpdateAttributes } from "../models/user.model";
import dbValidationHandler from "../middlewares/db.validation";

interface UserParams { user: User };

export const router = Router();

router.use(json());

router.post('/', async (req: Request<{}, {}, UserCreationAttributes>, res: Response, next: NextFunction) => {
    try {
        const user = await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.param('id', async (req: Request<{ user?: User }>, res: Response, next: NextFunction, id: number) => {
    const user = await User.findByPk(id);
    if (!user)
        return res.sendStatus(StatusCodes.NOT_FOUND);
    req.params.user = user;
    next();
});

router.route('/:id')
    .get(async (req: Request<UserParams>, res: Response) => {
        res.json(req.params.user);
    })
    .patch(async (req: Request<UserParams, {}, UserUpdateAttributes>, res: Response, next: NextFunction) => {
        try {
            const user = req.params.user;
            await user.update({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            res.json(user);
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req: Request<UserParams>, res: Response) => {
        await req.params.user.destroy();
        res.sendStatus(StatusCodes.NO_CONTENT);
    });

router.post('/pdf');

router.use(dbValidationHandler);
