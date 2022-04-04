const express = require('express')
const router = express.Router();

const {
    getAllProjects,
    createProject,
    getSingleProject
} = require('../controllers/projectController');

router.route('/projects').get(getAllProjects);
router.route('/project').post(createProject);
router.route('/project/:id').get(getSingleProject);

module.exports = router;