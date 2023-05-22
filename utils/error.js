const error = (message = "Something went wrong", status) => {
	const newError = new Error(message);
	newError["status"] = status;
	return newError;
}

module.exports = error;