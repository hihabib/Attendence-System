const User = require("../model/User");
const bcrypt = require('bcrypt');
const error = require("../utils/error");


const saveUser = ({name, email, password, role, accountStatus}, getUser) => {
	try {
		const user = new User({
			name, email, password, role, accountStatus
		});
		
		
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, async function(err, hash) {
				// Store hash in your password DB.
				user.password = hash;
				await user.save();
				getUser(user);
			});
		});
	} catch(error){
		throw error("Invalid User Data");
	}
}

const findUserByProperty = (property, value) => {
	if(property === "_id"){
		return User.findById(value).exec();
	}
	return User.findOne({[property]: value}).exec();
}


const deleteUserById = async (id) => {
	try {
		const user = await findUserByProperty("_id", id);
		return await User.deleteOne({"_id": user?._id});
	} catch (err) {
		throw error("User not found", 400);
	}
}
const findAllUsers = () => {
	return User.find();
}

module.exports = {saveUser, findUserByProperty, findAllUsers, deleteUserById}
