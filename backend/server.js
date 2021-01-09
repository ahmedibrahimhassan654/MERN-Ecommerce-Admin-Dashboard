const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const { readdirSync } = require("fs");
require('dotenv').config();



const fileUploade = require('express-fileupload');
const path = require('path');

const colors = require('colors');

const cookieParser = require('cookie-parser');

const errorHandler = require('./middelware/error');

// //route files
// const users = require('./routes/users');
// const auth = require('./routes/auth');
// const branches = require('./routes/branches');
// const products = require('./routes/products');




const app = express();

//connect DataBase
mongoose.connect(process.env.DATABase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false,
      
        
})
  .then(
    ()=>console.log('MongoDB connected ...'.cyan.underline.bold)
  )
  .catch((err)=>console.log('data base connected error',err));

//Dev logging middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//init Middilware body parser
//app.use(express.json());
//add body barser
app.use(bodyParser.json({limit:'20mb'}))

app.use(cors())


//Add cookie parser
app.use(cookieParser());


//set static folder





//instead of importing every route we will use this idea
readdirSync("./routes").map((r) =>
app.use('/api/v1',require('./routes/'+r))
)





//custome error handler middelware must be after initiate route
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `server running on  ${process.env.NODE_ENV} environment on port ${process.env.PORT}`
      .yellow.bold
  )
);

//handle unhandled promise rejections
process.on('unhandledRejection', (err, Promise) => {
   console.log(`Error:${err.message}`.red);
   

  server.close(() => process.exit(1));
});
