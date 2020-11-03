const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// //@desc    createOrUpdateUser 
// //@route   Post/api/v1/create-or-update-user
// //@access  puplic
exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user
	const { role } = req.body
	const user = await User.findOneAndUpdate(
		{ email },
		{ name, picture },
		{ new: true },
	)

	if (user) {
		console.log('user updated', user)
		res.json(user)
	} else {
		const newUser = await new User({
			email,
			name: email.split('@')[0],
			picture,
			role,
		}).save()

		console.log('user created', newUser)
		res.json(newUser)
	}
	
}
// //@desc    current user 
// //@route   Post/api/v1/curent-user
// //@access  puplic
exports.curentUser = async (req, res) => {
	await User.findOne({email:req.user.email}).exec((err,user)=>{
		if(err)throw new Error(err)
		res.json(user)
	})
	
}




// //@desc    register user
// //@route   Post/api/v1/auth/register
// //@access  puplic

// exports.registerUser = async (req, res, next) => {
//   const { name, email, password, role } = req.body;
//   try {
//     //see if user existe
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ errors: [{ msg: 'user already existe' }] });
//     }
//     const avatar = gravatar.url(email, {
//       s: '200',
//       r: 'pg',
//       d: 'mm',
//     });
//     user = new User({
//       name,
//       email,
//       avatar,
//       password,
//       role,
//     });
//     const salt = await bcrypt.genSalt(10);
//     //hash password
//     user.password = await bcrypt.hash(password, salt);

//     //create user
//     await user.save();

//     //create token
//     sendTokenResponse(user, 200, res);
//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('server error');
//   }
// };

// //@desc    login user
// //@route   Post/api/v1/auth/login
// //@access  puplic

// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ errors: [{ msg: 'please provide an email & password' }] });
//   }

//   //check for user
//   const user = await User.findOne({ email }).select('+password');
//   if (!user) {
//     return res.status(401).json({ errors: [{ msg: 'invalid credintial' }] });
//   }

//   //check if password matches
//   const isMatch = await user.matchPassword(password);

//   if (!isMatch) {
//     return res.status(401).json({ errors: [{ msg: 'invalid credintial' }] });
//   }
//   sendTokenResponse(user, 200, res);
// };

// //get token from model , create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//   const token = user.getSignedJwtToken();

//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   res.status(statusCode).cookie('token', token, options).json({
//     success: true,
//     token,
//   });
// };

// //@desc    get login user
// //@route   Post/api/v1/auth/me
// //@access  private

// exports.getMe = async (req, res, next) => {
//  const user=await User.findById(req.user.id)
//   res.status(200).json({
//     success: true,
//     user,
//   });
// };
