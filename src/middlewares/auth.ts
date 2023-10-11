import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user-model';

async function isAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.get('Authorization') as string;

	const isAuthenticated = await UserModel.checkToken(token);

	if (!isAuthenticated)
		return res.status(401).json({ message: 'Nothing to do over here...' });
    next();
}

export default isAuth;