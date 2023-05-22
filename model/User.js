const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlenght: [3, "Name is too short"],
		maxlength: [30, "Name is too long"],
		required: true
	},
	email: {
		type: String, 
		required: true,
		minlength: 7,
		validate: {
			validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
			message: (prop) => `${prop.value} is not a valid email`
		}
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: [String],
		required: true,
		default: ["Contributor"]
	},
	accountStatus: {
		type: String,
		enum: ["PENDING", "ACTIVE", "REJECTED"],
		required: true,
		default: "PENDING"
	}
});

module.exports = mongoose.model("Users", userSchema);