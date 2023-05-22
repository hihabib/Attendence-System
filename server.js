const express = require("express");
const connectDB = require("./db.js");
const router = require("./routes");

const app = express();
app.use(express.json());
app.use(router);


// Global Error Handler
app.use((error, req, res, next) => {
	console.log(error);
	const {status, message} = error;
	return res.status(status ? status : 500).json({message});
});


init();
async function init(){
	
	await connectDB();
	console.log("Database Connected");
	
	app.listen(8080, () => {
		console.log("App is listening to 8080 port");
	});
}



