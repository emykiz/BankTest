import * as express from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    public router = express.Router();
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router.post('/', this.createUser);
        this.router.get('/:id', this.getUser);
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
    }

    private createUser = async (req: express.Request, res: express.Response) => {
        const user: User = req.body;
        try {
            const newUser = await this.userService.createUser(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    private getUser = async (req: express.Request, res: express.Response) => {
        const userId = req.params.id;
        try {
            const user = await this.userService.getUser(userId);
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    private updateUser = async (req: express.Request, res: express.Response) => {
        const userId = req.params.id;
        const updates = req.body;
        try {
            const updatedUser = await this.userService.updateUser(userId, updates);
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    private deleteUser = async (req: express.Request, res: express.Response) => {
        const userId = req.params.id;
        try {
            await this.userService.deleteUser(userId);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
