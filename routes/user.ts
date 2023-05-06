import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User, UserCreationAttributes, UserUpdateAttributes } from "../models/user.model";

interface UserParams { id: number };

const router = Router();

router.route('/:id')
    .get(async (req: Request<UserParams, {}, string>, res: Response) => {
        const user = await User.findByPk(req.params.id);
        if (user)
            res.json(user);
        else
            res.sendStatus(StatusCodes.NOT_FOUND);
    })
    .post(async (req: Request<UserParams, {}, UserCreationAttributes>, res: Response) => {
        const user = await User.create(req.body);
        res.send(user);
    })
    .patch(async (req: Request<UserParams, {}, UserUpdateAttributes>, res: Response) => {
        await User.update(req.body, {
            where: {
                email: req.body.id,
            },
        });
    })
    .delete(async (req: Request, res: Response) => {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
    });

router.post('/pdf');
