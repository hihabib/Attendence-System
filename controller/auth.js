const {registerService, loginService} = require("../service/auth");

const registerController = async (req, res, next) => {
	try {
		const {name, email, password} = req.body;
		
		await registerService(name, email, password, (user) => {
			const payload = {
				_id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				accountStatus: user.accountStatus
			}; 
			
			res.status(201).json(payload);
		});
	} catch(error){
		next(error);
	}
}
const loginController = async (req, res, next) => {
	try{
		const {email, password} = req.body;
		await loginService(email, password, token => {
			res.status(200).json({token});
		});
	}catch(error){
		next(error);
	}
}

module.exports = {registerController, loginController}