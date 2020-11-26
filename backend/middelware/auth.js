const admin = require('../firebase')
const ErrorResponse = require('../utils/errorresponse')
const User = require('../models/User')


exports.authCheck = async (req, res, next) => {
	console.log(req.headers) //token
	try {
      const firbaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
      // .then((decodedToken) => {
      //    decodedToken.uid;
       
      //  })
		//console.log('firebase user is',firbaseUser);
		req.user = firbaseUser
		next()
	} catch (err) {
		console.log(err)
		res.status(401).json({
			err: 'invalid or expired token',
		})
	}
	
}
// //grant access to specific roles
// exports.roleCheck = (...roles) => {
// 	return (req, res, next) => {
// 		if (!roles.includes(req.user.role)) {
// 			return next(new ErrorResponse(`user role ${req.user.role} is not authorized to access this route`,403))
// 		}
// 		next()
// 	}
// } 

//admin check middelware
exports.adminCheck=async(req,res,next)=>{
	 const {email}=req.user
	 const adminUser=await User.findOne({email}).exec()
	if(adminUser.role!=='admin'){
		res.status(403).json({
			err:'admin resource,Access denied'
		})
	}else{
		next()
	}

	}

	//owner check middelware
exports.ownerCheck=async(req,res,next)=>{
	const {email}=req.user
	const ownerUser=await User.findOne({email}).exec()
   if(ownerUser.role!=='owner'){
	   res.status(403).json({
		   err:'owner resource,Access denied'
	   })
   }else{
	   next()
   }

   }
   
   exports.mangerCheck = async (req, res, next) => {
			const { email } = req.user
			const mangerUser = await User.findOne({ email }).exec()
			if (mangerUser.role !== 'manger') {
				res.status(403).json({
					err: 'manger resource,Access denied',
				})
			} else {
				next()
			}
		}

		exports.employeeCheck = async (req, res, next) => {
			const { email } = req.user
			const employeeUser = await User.findOne({ email }).exec()
			if (employeeUser.role !== 'employee') {
				res.status(403).json({
					err: 'employee resource,Access denied',
				})
			} else {
				next()
			}
		}