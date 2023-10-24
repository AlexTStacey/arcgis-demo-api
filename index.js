const express = require('express');
var cors = require('cors');
const path = require('path'); 

const app = express();
app.use(express.static('public'));

//allow out app to parse JSON, express.json() returns some middle where and we want the app to use it
app.use(express.json());

//Set up CORS
app.use(cors({allowedHeaders: "*"}));

//Simple get to test api is working
app.get('/', (req,res) => {
    //Here we are sending a simple response back
    res.send('Hello World');
});


//Maps route to provide resposne data for a map layers
app.get('/api/maps',(req,res) => {
    res.sendFile(path.join(__dirname,'public/states.json'));
});

/* ############################

    Routes for feature server

    Based on testing these routes are required to serve an image layert for arcGIS maps

################################ */

// app.get('/api/maps/0',(req,res) => {
//   //in a real world we would make a call to a DB
//   res.sendFile(path.join(__dirname,'public/states.json'));
//   //console.log(req.query)
// });

app.get('/api/maps/0',(req,res) => {
  //in a real world we would make a call to a DB
  res.sendFile(path.join(__dirname,'public/states.json'));
  //console.log(req.query)
});

app.get('/api/maps/0/query',(req,res) => {
  //in a real world we would make a call to a DB
  res.sendFile(path.join(__dirname,'public/state_query.json'));
  //console.log(req.query)
});

// app.get('/api/maps/1',(req,res) => {
//   //in a real world we would make a call to a DB
//   res.sendFile(path.join(__dirname,'public/tasmania_cities.json'));
//   //console.log(req.query)
// });

// app.get('/api/maps/2',(req,res) => {
//   //in a real world we would make a call to a DB
//   res.sendFile(path.join(__dirname,'public/tasmania_roads.json'));
//   //console.log(req.query)
// });

// app.get('/api/maps/3',(req,res) => {
//   //in a real world we would make a call to a DB
//   res.sendFile(path.join(__dirname,'public/tasmania_state_boundaries.json'));
//   //console.log(req.query)
// });

// app.get('/api/maps/4',(req,res) => {
//   //in a real world we would make a call to a DB
//   res.sendFile(path.join(__dirname,'public/tasmania_water_bodies.json'));
//   //console.log(req.query)
// });

// app.post('/api/maps/exportImage',(req,res) => {
//   if(error) {
//       //res.status(400).send(result.error);
//       //Above is sending back the "compex" error object, belwo we are seeding the spefici error msg
//       return res.status(400).send(error.details[0].message);
//   }
//   res.send("Posted");
// });


/*##########################################################################*/

app.get('/api/maps/exportImage',(req,res) => {

  //Commented out code related to an attempt to use the arcGIS image server to serve png files used by the image layer.

  //const queryData = req.query;
  //token require for argis rest call
  //const token = "3vxKB5qWOc-xTbPVlWKYIP3fDZxXaXUdxwNrDOOg2Kx7eg3tB2xBihDQDHT7mLnfcIsLP7xdimAwpte0zAYbYVnp3NxdSqvR3ge5cTShV2DFKyWCShO0WjNikBoCp0D26u8T-_gOfXZRJuca95bFUpzweTBvIphYVEVWsPJiVSzjpPgseOODYFk6EIu2gbaL0rzFRXi_JRxugcF_-szXbkEuMoIcMTO3ycjhdEFnczfWSFWrpV0M6h9D0tKhghiKFUsctl6ZDr_AkHT2Mu5Zidnf0sYmd19-PfaL_V9wVeU."
  //let data = "";
  //get response form argis image server providing info from the request from our local host
  //axios.get(`https://earthobs3.arcgis.com/arcgis/rest/services/Chlorophyll/ImageServer/exportImage?f=${queryData.f}&renderingRule=${queryData.renderingRule.rasterFunction}&time=${queryData.time}&bbox=-${queryData.bbox}&imageSR=${queryData.imageSR}&bboxSR=${queryData.bboxSR}&size=${queryData.size}&token=${token}`)
  // Show response data 
  // .then(res => {
  //   console.log(res.config.url);
  //   data = res.data;
  // }) 
  // .catch(err => console.log(err))

 
  //res.send(data);
  res.sendFile(path.join(__dirname,'public/response.png'));

});

const port = process.env.PORT || 3000;

//we can optional pass a callback function here
app.listen(port,() => { console.log(`Listening On Port ${port}`)});




