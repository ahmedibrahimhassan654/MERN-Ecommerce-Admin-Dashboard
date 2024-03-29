const User = require('../models/User');
//@desc     get all users
//@route   GET/api/v1/users
//@access  private

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json({
      success: true,
      numberofusers: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({


      success: false,
    });
  }
};

//@desc     create new user
//@route    Post/api/v1/users
//@access   puplic
exports.createUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'user created' });
};


//@desc     get user 
//@route    get/api/v1/users/:id
//@access   puplic 


exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id })

    .exec()
  res.json(user)
}

exports.updateUser = (req, res, next) => {

  res.status(200).json({ success: true, msg: 'user updates' });
}

exports.deleteUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'user deleted ' });
}


