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
// app.use(cors("http://localhost:3001"));
app.use(cors("https://registerUserServer.netlify.app"));




const superAdminRoutes = require('../Routes/superADminRoutes')
const RolesRoutes = require('../Routes/rolesRoutes')
const userRoutes = require('../Routes/userRoutes')
const featureRoutes = require('../Routes/featureRoutes');

app.use(superAdminRoutes)
app.use(RolesRoutes)
app.use(userRoutes)
app.use(featureRoutes)




 
// app.listen(3000, async (err) => {
//   console.log('listning on port 3000', 3000);
// })

module.exports.handler = serverless(app);
