import UserModel from "../models/user-model";
import { Request, Response } from 'express';
import { validatePartialUser, validateUser } from "../schemas/user-schema";

abstract class UserController{

    static async getAll(req: Request, res: Response) {
		const users = await UserModel.getAll();
		res.json(users)
	}

	static async register(req:Request, res:Response){
		const validatedUser = validateUser(req.body)
		if (!validatedUser.success)
			return res
				.status(400)
				.json({ error: JSON.parse(validatedUser.error.message) });

		const newUser= await UserModel.register(req.body)
		if(newUser===404) return res.status(404).json({message:"User already in db",user:req.body})
		return res.status(200).json({message:"User created successfully",user:newUser})
	}

	static async login (req:Request, res:Response){
		const validadedData = validatePartialUser(req.body)
		if (!validadedData.success) return res.status(400).json({error:JSON.parse(validadedData.error.message)})

		const userLogged= await UserModel.login(req.body)
		if (userLogged === 404)
			return res.status(404).json({ message: 'Username does not exists...' });
		if (userLogged === 400)
			return res.status(400).json({ message: 'Wrong password' });
		res
			.status(201)
			.json({ message: 'User logged successully', token: userLogged });
	}

	static async update (req:Request, res:Response){
		const {username}=req.params
		const {email,password}=req.body
		const validatedData=validatePartialUser({username,email,password})
		if(!validatedData.success) return res.status(400).json({error:JSON.parse(validatedData.error.message)})

		const userUpdated = await UserModel.update({username,email,password})

		if(userUpdated===404)  return res.status(404).json({message: "Wrong username, user does not exists"})

		res.status(200).json({message:'User updated successfully',userUpdated})
	}
	static async delete(req:Request,res:Response){
		const {username}=req.params
		const userDeleted=await UserModel.delete(username)
	}
	
	static async logout(req:Request,res:Response){
		const validadedData=validatePartialUser(req.body)
		if(!validadedData.success)
		return res.status(400).json({error:JSON.parse(validadedData.error.message)})
		const userLoggedOut=await UserModel.logout(req.body)
		if(userLoggedOut==400)
		res.status(400).json({message:"User not found"})
	res.status(201).json({message:"User logged out successfully",userLoggedOut})
	}
}

export default UserController