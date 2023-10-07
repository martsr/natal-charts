import express from "express"

const PORT=45000
const app=express()

app.use('/api', (req, res) => {
	res.status(200).json({
		name: 'RESTful API for natal charts search and create',
		version: '1.0.0',
		running: true,
		paths: ['/api/users','/api/charts', '/api/users/login'],
	});
});

app.listen(PORT,()=>{
    console.log("SERVER LISTENING ON PORT: ",PORT)
})