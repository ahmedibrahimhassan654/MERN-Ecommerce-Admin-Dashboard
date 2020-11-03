
var admin = require('firebase-admin')

var serviceAccount = require('../config/fbServiceAccountKey.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://carcare-123b3.firebaseio.com',
})




module.exports = admin
