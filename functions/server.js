let cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
let jwt = require('jsonwebtoken');
require('dotenv').config()
let bodyParser = require('body-parser');
const serverless = require('serverless-http');
require('../_seeder');


app.use(bodyParser.json())
<<<<<<< HEAD
app.use(cors("http://localhost:3001"));
// app.use(cors("https://userroles.netlify.app/"));
=======
// app.use(cors("http://localhost:3001"));
app.use(cors("https://userroles.netlify.app"));
>>>>>>> 049b59af67c42342a975308188c85eb04baae824




const superAdminRoutes = require('../Routes/superADminRoutes')
const RolesRoutes = require('../Routes/rolesRoutes')
const userRoutes = require('../Routes/userRoutes')
const featureRoutes = require('../Routes/featureRoutes');

app.use(superAdminRoutes)
app.use(RolesRoutes)
app.use(userRoutes)
app.use(featureRoutes)




 
app.listen(3000, async (err) => {
  console.log('listning on port 3000', 3000);
})

// module.exports.handler = serverless(app);
