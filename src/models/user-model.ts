import users from '../database/user.json'
import{writeFile} from "jsonfile"
import crypto from "node:crypto"
abstract class UserModel{
    
	private static async writeDB(){
		return writeFile('./src/database/user.json',users)
	}
	private static async findUser(username:string){
		return users.find(user=>user.username.toLowerCase()==username.toLowerCase())
	}

	static async checkToken(token:string){
		return users.find((user)=>user.token===token)
	}
	
	static async getAll() {
		return users;
	}

	static async register(user:any){
		const {username,email,password}=user
		const userExists = await this.findUser(username)
		if(userExists) return 404
		user.password=crypto.createHash('SHA512').update(password).digest('hex')
		const newUser={username,email,password,token:''}
		users.push(newUser)
		await this.writeDB()
		return {username,email}

	}

	static async login(user:any){
		const {username,password}=user
		const passEncrypted=crypto.createHash('SHA512').update(password).digest('hex')
		const userFound= await this.findUser(username)
		if(!userFound)return 404
		if(userFound.password !==password) return 400
		const token=passEncrypted
		userFound.token=token
		this.writeDB()
		return token
	}

	static async update (user:any){
		const {username, email,password}=user
		const userFound=await this.findUser(username)
		if(!userFound) return 404
		if(username) userFound.username = username
		if(email) userFound.email=email
		if(password)userFound.password=password

		await this.writeDB()
		return userFound
	}

	static async delete(username:string){
		const userFoundIndex = users.findIndex(
			(user)=>user.username.toLowerCase() ===username.toLowerCase()
		)
		if(userFoundIndex===-1) return 404
		const userDeleted=users[userFoundIndex]
		users.splice(userFoundIndex,1)
		await this.writeDB()
		return userDeleted
	}

	static async logout(data:any){
		const{username}=data
		const user = await this.findUser(username)
		if(!user)
		return 400
		user.token=""
		await this.writeDB()
		return username
	}
}


export default UserModel