const Branch=require('../models/Branch')
const asyncHandler = require('../middelware/async')
//Create New Branch
//Post/api/v1/branches/owner
//owners,mangers
exports.createBranch =asyncHandler( async (req, res) => {

   
      const branch= await Branch.create(req.body)
      res.status(200).json({
      
      sucess: true,
      msg: 'new branch created',
      branch
      
      })
  
  	
});

//get all Branches
//get/api/v1/branches
//public
exports.getBranches =asyncHandler( async (req, res) => {

   
   const branches= await Branch.find()
   res.status(200).json({
   number:branches.length,
   sucess: true,
   msg: 'get All Branches',
   branches
   
   })

  
});

//get single branch
//get/api/v1/branches/:id
//public
exports.getBranche =asyncHandler( async (req, res) => {

   
   const branche= await Branch.findById(req.params.id)
   res.status(200).json({
   sucess: true,
   msg: `get single Branch With id ${req.params.id}`,
   branche
   
   })

  
});


