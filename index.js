const https = require("https");
var fs = require('fs');
//load express module
const express = require('express');
var cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const path = require('path'); 

const app = express();
app.use(express.static('public'));

// Add middleware for http proxying 
// const apiProxy = createProxyMiddleware('/api/maps', { target: ' https://roweit.maps.arcgis.com/sharing/proxy?https://localhost:3000/api/maps?SERVICE=WMS&REQUEST=GetCapabilities' });
// app.use('/api', apiProxy);

//creating our app object calling the express function


//allow out app to parse JSON, express.json() returns some middle where and we want the app to use it
app.use(express.json());

app.use(cors({allowedHeaders: "*"}));

//the app object has method that corrospond with HTTP methods
//First arg is the path/ url , the secound arg is a callback function (called when we have a http get request to the enpoint)
app.get('/', (req,res) => {
    //Here we are sending a simple response back
    res.send('Hello World');
});


//defining another route
//with express we don't need if block we can just call app.get(), we could even mother them to a secperate file
app.get('/api/maps',(req,res) => {
    res.sendFile(path.join(__dirname,'public/response.png'));
});

/* ############################
Routes for image server
################################ */
app.get('/api/maps/keyProperties',(req,res) => {
  //in a real world we would make a call to a DB
  res.sendFile("C:/Users/AlexStacey/Documents/Innovation Team/Mock WMS Service/keyProperties.json");
  console.log(req.query)
});

app.get('/api/maps/multidimensionalInfo',(req,res) => {
  //in a real world we would make a call to a DB
  res.sendFile("C:/Users/AlexStacey/Documents/Innovation Team/Mock WMS Service/multidimensionalInfo.json");
  console.log(req.query)
});

app.get('/api/maps/rasterFunctionInfos',(req,res) => {
  //in a real world we would make a call to a DB
  res.sendFile("C:/Users/AlexStacey/Documents/Innovation Team/Mock WMS Service/rasterFunctionInfos.json");
  console.log(req.query)
});

app.get('/api/maps/exportImage',(req,res) => {
  const queryData = req.query;
  //token require for argis rest call
  //const token = "3vxKB5qWOc-xTbPVlWKYIP3fDZxXaXUdxwNrDOOg2Kx7eg3tB2xBihDQDHT7mLnfcIsLP7xdimAwpte0zAYbYVnp3NxdSqvR3ge5cTShV2DFKyWCShO0WjNikBoCp0D26u8T-_gOfXZRJuca95bFUpzweTBvIphYVEVWsPJiVSzjpPgseOODYFk6EIu2gbaL0rzFRXi_JRxugcF_-szXbkEuMoIcMTO3ycjhdEFnczfWSFWrpV0M6h9D0tKhghiKFUsctl6ZDr_AkHT2Mu5Zidnf0sYmd19-PfaL_V9wVeU."
  let data = "";
  //get response form argis image server providing info from the request from our local host
  //axios.get(`https://earthobs3.arcgis.com/arcgis/rest/services/Chlorophyll/ImageServer/exportImage?f=${queryData.f}&renderingRule=${queryData.renderingRule.rasterFunction}&time=${queryData.time}&bbox=-${queryData.bbox}&imageSR=${queryData.imageSR}&bboxSR=${queryData.bboxSR}&size=${queryData.size}&token=${token}`)
  // Show response data 
  // .then(res => {
  //   console.log(res.config.url);
  //   data = res.data;
  // }) 
  // .catch(err => console.log(err))

 
  //res.send(data);
  res.sendFile("C:/Users/AlexStacey/Documents/Innovation Team/Mock WMS Service/response.png");
});

//POST request to create a new course
app.post('/api/maps/exportImage',(req,res) => {
  if(error) {
      //res.status(400).send(result.error);
      //Above is sending back the "compex" error object, belwo we are seeding the spefici error msg
      return res.status(400).send(error.details[0].message);
  }
  res.send("Posted");
});


// app.use(
//   '/api/maps',
//   createProxyMiddleware({
//     target: ' https://roweit.maps.arcgis.com/sharing/proxy?https://localhost:3000/api/maps?SERVICE=WMS&REQUEST=GetCapabilities',
//     changeOrigin: true,
//   })
// );

// const privateKey = fs.readFileSync( 'key.pem', 'utf8');
// const certificate = fs.readFileSync( 'cert.pem', 'utf8');

// const credentials = {key: privateKey, cert: certificate};

//defining a env variable for the port
//an env variable is one in the environment in which the process runs
//it's value is set outside the app
//you cna set this ins the terminal by running set PORT=<value>
const port = process.env.PORT || 3000;

// // CORS middleware
// app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   next();
// });

//Uncomment for HTTP

//we can optional pass a callback function here
app.listen(port,() => { console.log(`Listening On Port ${port}`)});

//Uncomment for HTTPS

// https.createServer(credentials,app)
//   .listen(port, ()=>{
//     console.log(`server is runing at port ${port}`)
//   });




