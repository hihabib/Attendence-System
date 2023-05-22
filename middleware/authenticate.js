const jwt = require("jsonwebtoken");
const error = require("../utils/error");

const authenticate = (req, res, next) => {
	let {authorization: token} = req.headers;
	token = token?.split(" ")[1];
	jwt.verify(token, 'secret-key', function(err, user) {
		if(err){
			throw error("Invalid Token", 401);
		}
		req.user = user;
		next();
	});
}

module.exports = authenticate;