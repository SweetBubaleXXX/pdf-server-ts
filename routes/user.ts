import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User, UserCreationAttributes, UserUpdateAttributes } from "../models/user.model";

interface UserParams { id: number };

export const router = Router();

router.post('/', async (req: Request<{}, {}, UserCreationAttributes>, res: Response) => {
    const user = await User.create(req.body);
    res.send(user);
})

router.route('/:id')
    .get(async (req: Request<UserParams>, res: Response) => {
        const user = await User.findByPk(req.params.id);
        if (user)
            res.json(user);
        else
            res.sendStatus(StatusCodes.NOT_FOUND);
    })
    .patch(async (req: Request<UserParams, {}, UserUpdateAttributes>, res: Response) => {
        await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.sendStatus(StatusCodes.OK);
    })
    .delete(async (req: Request<UserParams>, res: Response) => {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.sendStatus(StatusCodes.OK);
    });

router.post('/pdf');
