const Branch = require('../models/Branch')
const ErrorResponse = require('../utils/errorresponse')
const asyncHandler = require('../middelware/async');
const { json } = require('body-parser');
const User = require('../models/User');
const admin = require('../firebase/index')



//Create New Branch
//Post/api/v1/branches/owner
//owners
exports.createBranch =asyncHandler( async (req, res,next) => {
 
   // IF YOU HAVE ALREADY APPLIED authCheck() MIDDLEWARE IN YOUR ROUTE, YOU WILL GET req.user
   console.log('req.user from firebase authCheck ', req.user)
   //get email from req.user
   const { email } = req.user;
   console.log(email);
   
   // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email }).exec();
  
   // now you have user... it should have all props like name, email, role etc
   console.log('userFromDb ', userFromDb)
  
   if (userFromDb.role === 'owner') {
      req.body.owner = userFromDb
     // const {name,slug,description,email,phone,addressLine,district,country,province,location,images,present,documents,trAvailable}=req.body
      const branch = await Branch.create(req.body)
      console.log(branch);
     res.status(200).json({
      sucess: true,
      msg: 'new branch created',
      branch
      })
    
 }
});
 
//get my branches
//get/api/v1/branches/owner
//owners
exports.getMyBranches =asyncHandler( async (req, res,next) => {
 
   // IF YOU HAVE ALREADY APPLIED authCheck() MIDDLEWARE IN YOUR ROUTE, YOU WILL GET req.user
   console.log('req.user from firebase authCheck ', req.user)
   //get email from req.user
   const { email } = req.user;
   console.log(email);
   
   // // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email }).exec();
  
   // // // now you have user... it should have all props like name, email, role etc
   // // console.log('userFromDb ', userFromDb)
  
  
     
   const branches = await Branch.find({ owner: userFromDb }).populate('owner', ['name', 'picture', 'email']).populate("mangers",['name', 'picture', 'email'])
   
   if (!branches) {
         return res.status(400).json({msg:'there is no branches for you '})
      }
     res.status(200).json({
      sucess: true,
      msg: 'my branches are ',
      number:branches.length,
      branches
      })
    

});
 //Create New Branch
//Post/api/v1/branches/admin
//admin
exports.AdminCreateBranch = asyncHandler(async (req, res, next) => {
 
   // IF YOU HAVE ALREADY APPLIED authCheck() MIDDLEWARE IN YOUR ROUTE, YOU WILL GET req.user
   console.log('req.user from firebase authCheck ', req.user);
   //get email from req.user
   const { email } = req.user;
   console.log(email);
   
   // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email }).exec();
  
   // now you have user... it should have all props like name, email, role etc
   console.log('userFromDb ', userFromDb);
  
   if (userFromDb.role === 'admin') {


      const { name, email, role = 'owner' } = req.body.owner
      


    let owner  =await User.findOne({email})
      console.log(owner);
      if (owner) {
         //create new branch
         const {name,slug,description,email,phone,addressLine,district,country,province,location,images,present,documents,trAvailable}=req.body
         let branch = await Branch.create({owner,name,slug,description,email,phone,addressLine,district,country,province,location,images,present,documents,trAvailable});
         // console.log(branch);
         res.status(200).json({
                  sucess: true,
                  msg: 'new branch created by admin',
                  branch
               });
       } 
      else {
         //there is no owner 
         //create new owner 
           const { name, email, role = 'owner' } = req.body.owner
          let newOwner  = await new User({
             name,
             email,
             role
             
          }).save()
          console.log('new user created in db',newOwner);

          //create the same user in firebase
          newOwner= await admin.auth().createUser({
            email,           
            name,
            role,
            disabled: false
          })
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully created new user: in firebase', userRecord);
            })
            .catch(function(error) {
              console.log('Error creating new user:', error);
            });
         
            //const {name,slug,description,email,phone,addressLine,district,country,province,location,images,present,documents,trAvailable}=req.body
            let branch = await Branch.create({owner:newOwner,name,slug,description,email,phone,addressLine,district,country,province,location,images,present,documents,trAvailable});
            // console.log(branch);
         res.status(200).json({
               
                     sucess: true,
                     msg: 'new branch created by admin',
                     branch
                  });
         
      }
 
    }
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


//update branch
//put/api/v1/branches/owner/:id
//private owner
exports.updateBranch =asyncHandler( async (req, res,next) => {

   
   let branch = await Branch.findOne({ slug: req.params.slug })
   
   if (!branch) {
   return next(new ErrorResponse(`branch ${req.params.slug} not found  `))
   }
  
  console.log(branch);
   //make sure updated user is branch owner 
   const { email } = req.user;
   console.log(email);
   
   // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email }).exec();

  

   if (branch.owner.toString() !== userFromDb._id.toString() && userFromDb.role!=='admin') {
      console.log('request user object = ' ,userFromDb.role);


      console.log('branch owner object ',branch.owner);
    return next(new ErrorResponse(`user with email ${userFromDb.email} is not authorize to update this branch  `))

   }
   branch = await Branch.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators:true
})

   res.status(200).json({
      sucess: true,
      msg: `Branch With name ${req.params.slug} is updated`,
      branch
   })
  
});

//delete branch
//delete/api/v1/branches/owner/:id
//private
exports.deleteBranch =asyncHandler( async (req, res) => {

   
   const branch=await Branch.findOneAndDelete({
		slug: req.params.slug,
   })
   console.log(branch);
  //make sure deleted branch  is branch owner 
  const { email } = req.user;
  console.log(email);
  
  // FIND USER FROM OUR DATABASE BY EMAIL
  const userFromDb = await User.findOne({ email }).exec();


  if (branch.owner.toString() !== userFromDb._id.toString() && userFromDb.role!=='admin') {
     console.log('request user object = ' ,userFromDb.role);


     console.log('branch owner object ',branch.owner);
   return next(new ErrorResponse(`user with email ${userFromDb.email} is not authorize to update this branch  `))

  }
   res.status(200).json({
      sucess: true,
      msg: `Branch With name ${req.params.slug } is deleted`,
      branch:{}
   })

    
  
});
//Accept  branch
//delete/api/v1/branches/admin/:id
//private admin
exports.ActiveBranch =asyncHandler( async (req, res,next) => {

   
   let branch = await Branch.findOne({ slug: req.params.slug })
   
   if (!branch) {
   return next(new ErrorResponse(`branch ${req.params.slug} not found  `))
   }
  
  console.log(branch);
   //make sure updated user is branch owner 
   const { email } = req.user;
   console.log(email);
   
   // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email }).exec();

  

   if (userFromDb.role!=='admin') {
      console.log('request user object = ' ,userFromDb.role);


      console.log('branch owner object ',branch.owner);
    return next(new ErrorResponse(`user with email ${userFromDb.email} is not authorize to accept  this branch  `))

   }

   branch = await Branch.findOneAndUpdate({ slug: req.params.slug }, {
      $set: {
         adminAccept
      }
    }, {
      new: true,
      runValidators:true
})

   res.status(200).json({
      sucess: true,
      msg: `Branch With name ${req.params.slug} is activate now `,
      branch
   })
  
});

//add manger to my branch  
//put/api/v1/branches/owner/:slug/manger
//private owner
exports.addManger =asyncHandler( async (req, res,next) => {

 
   const branch = await Branch.findOne({ slug: req.params.slug }).populate("mangers",['name', 'picture', 'email'])

console.log(branch);
   if (!branch) {
      return next(new ErrorResponse(`branch with  ${req.params.slug} is not found  `))
    }
   
  
   // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email:req.user.email }).exec();
 

  //check this branch is my branch or not
 
   if (branch.owner.email === userFromDb.email||userFromDb.role==='admin') {
      const { name, email, picture } = req.body
      let newManger = await new User({
         name,
         email,
         role:'manger',
         picture
      }).save()
    
   const newMangerinFirebase=await admin.auth().createUser({
      email,           
      name,
      
     
      picture: String,
      disabled: false
    })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user: in firebase', userRecord);
      })
      .catch(function(error) {
        console.log('Error creating new user:', error);
      });
    
      branch.mangers=branch.mangers||[]
      branch.mangers.push(newManger)
      
         
        
      await branch.save()

   res.status(200).json({
      sucess: true,
      msg: `Branch With name ${req.params.slug} is add new manger`,
      branch
   })
   
   }

});

//delete manger from my branch  
//delete/api/v1/branches/owner/:slug/manger/:id
//private owner
exports.deleteManger =asyncHandler( async (req, res,next) => {

//    const { name, email, role = 'manger', picture } = req.body
//    let newManger = await new User({
//       name,
//       email,
//       role,
//       picture
//    }).save()
 
// const newMangerinFirebase=await admin.auth().createUser({
//    email,           
//    name,
  
//    picture: String,
//    disabled: false
//  })
//    .then(function(userRecord) {
//      // See the UserRecord reference doc for the contents of userRecord.
//      console.log('Successfully created new user: in firebase', userRecord);
//    })
//    .catch(function(error) {
//      console.log('Error creating new user:', error);
//    });
   const branch = await Branch.findOne({ slug: req.params.slug })


   if (!branch) {
       next(new ErrorResponse(`branch with  ${req.params.slug} is not found  `))
    }
   
  
   // FIND USER FROM OUR DATABASE BY EMAIL
   const userFromDb = await User.findOne({ email:req.user.email }).exec();
 

  //check this branch is my branch or not
 
   if (branch.owner.email === userFromDb.email||userFromDb.role==='admin') {

    

      
      const removedIndex = branch.mangers.map(manger => manger.email).indexOf(req.params.email),
         allmangers = branch.mangers.splice(removedIndex, 1)  
      if (allmangers.length === 0) {
            
             return next(new ErrorResponse(`user with mail ${req.params.email} is not found  `))
          }
      await User.findOneAndDelete(req.params.email)
    
         // const removedEmail = branch.mangers.map(manger => manger.email===req.params.email).indexOf(req.params.email)
      
         //  allmangers = branch.mangers.splice(removedEmail, 1)  
      
      
      
         console.log('removed email',removedIndex);
      console.log('all amngers', allmangers);
     
       await branch.save()

  return res.status(200).json({
      sucess: true,
      msg: `manger with email ${req.params.id} is deleted from branch ${req.params.slug}`,
      branch
   })
   
   }

});
