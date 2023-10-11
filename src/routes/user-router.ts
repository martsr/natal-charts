import {Router} from 'express'
import UserController from '../controllers/user-controller'
import authMiddleware from '../middlewares/auth'
export const userRouter=Router()

userRouter.get('/',UserController.getAll)
userRouter.post('/',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.post('/logout',authMiddleware,UserController.logout)
userRouter.patch(':/username',authMiddleware,UserController.update)
userRouter.delete('/:username',authMiddleware,UserController.delete)