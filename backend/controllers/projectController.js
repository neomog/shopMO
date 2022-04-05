const Project = require('../models/cosmotech');
const sendEmail = require('../utils/sendEmail');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new project => /api/cosmotech/project
exports.createProject = catchAsyncErrors(async (req, res, next) => {
   
    const project = await Project.create(req.body);

    try {
        await sendEmail({
            email: 'hello@cosmotech.agency',
            subject: 'New Project Requested',
            message: `A new project has been created by
             ${req.body.name} \n
             we can reach them at ${req.body.email} 
             they need ${req.body.description} \n ====================\n they got our services from ${req.body.info}`
        });
        console.log('Email sent')
    } catch (err) {
        console.log(err);
    
     }


    res.status(200).json({
        status: 'success',
        project
    });
});

//get all projects => /api/cosmotech/projects
exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
       
    const projects = await Project.find();

    if (!projects) {
        return next(new ErrorHandler('No projects found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: projects
    });
});

//get single project => /api/cosmotech/project/:id
exports.getSingleProject = catchAsyncErrors(async (req, res, next) => {
       
    const project = await Project.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler('No project found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: project
    });
});


