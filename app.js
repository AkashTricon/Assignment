var  express= require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())

dbURI = 'mongodb://akash:test1234@ds131954.mlab.com:31954/assignment'

var dbHandler = require('./dbHandler')
app.use('/v1',require('./router'))

dbHandler.connect(dbURI, (err) => {
    if (err) {
      process.exit(1);
    }
    else {
        console.log('Connected to the Database...');
        app.listen(8080,()=>{
            console.log("Contact book app is running on port 8080")
        })
    }
});
module.exports=app
