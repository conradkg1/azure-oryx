const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriendToUser,
    removeFriendFromUser,
} = require('../../controllers/userController');
router.route('/')
    .get(getUsers)
    .post(createUser);
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:userId/friends/:friendId')
    .post(addFriendToUser)
    .delete(removeFriendFromUser);


module.exports = router;