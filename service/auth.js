const {saveUser, findUserByProperty} = require("./user");
const error = require("../utils/error");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const registerService = async (name, email, password, getUser) => {
	
	//check if the email exist in User Collection
	const user = await findUserByProperty("email", email);
	if(user){
		console.log(user);
		throw error("Email already exists", 400);
	}
	
	saveUser({name, email, password}, (user) => {
		getUser(user);
	});	
}

const loginService = async(email, password, getToken) => {
	const user = await findUserByProperty("email", email);
	if(!user){
		throw error("Invalid credentials", 401);
	}
	
	const isValid = await bcrypt.compare(password, user.password);
	if(!isValid){
		throw error("Invalid credentials", 401);
	}
	
	const payload = {
		_id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		accountStatus: user.accountStatus
	}; 
			
	jwt.sign(payload, "secret-key", { algorithm: 'HS256' }, function(err, token) {
	  if(err){
		  throw error("Something Went Wrong", 500);
	  }
	  getToken(token);
	});
}

module.exports = {registerService, loginService}