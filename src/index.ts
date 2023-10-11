import express, {json} from "express"
import { userRouter } from "./routes/user-router";
import { chartRouter } from "./routes/chart-router";
const PORT=45000
const app=express()

app.use(json())

app.use('/api/users',userRouter)
app.use('/api/charts',chartRouter)

app.use('/api', (req, res) => {
	res.status(200).json({
		name: 'RESTful API for natal charts search and create',
		version: '1.0.0',
		running: true,
		paths: ['/api/users','/api/charts', '/api/users/login','api/users/register'],
	});
});

app.listen(PORT,()=>{
    console.log("SERVER LISTENING ON PORT: ",PORT)
})