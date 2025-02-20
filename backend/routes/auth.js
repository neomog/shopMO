const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    logout,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    registerSeller,
    getAllSellers,
    deleteSeller

} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/sellers').get(isAuthenticatedUser, getAllSellers)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

router.route('/admin/seller/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), registerSeller)

router.route('/admin/seller/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSeller)

module.exports = router;