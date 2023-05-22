const router = require('express').Router();
const {getUserController, getUserByIdController, patchUserByIdController, createUserController, deleteUserByIdController} = require('../controller/user');



/**
 * Delete user by Id
 * 
 */
router.delete('/:userid', deleteUserByIdController);

/**
 * All user by id
*/
router.get("/:userid", getUserByIdController);

/**
 * Patch user by id
*/
router.patch("/:userid", patchUserByIdController);


/**
 * Get All user
*/
router.get("/", getUserController);

/**
 * Create User
 */
router.post("/", createUserController);

module.exports = router;