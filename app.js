// const { Console } = require("console");
const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
// const { urlencoded } = require("express");


const app =express();
app.use(bodyParser.urlencoded({extends:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
    })
app.post("/", function(req,res){

    
        const query=req.body.cityName;
        const apikey="44a5cc06e7512e8b0407a4bbffeccefc";
        const unit="metric";
    
    
    
        const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apikey+"&units="+unit;
        https.get(url, function(response){
            console.log(response.statusCode);
    
             response.on("data", function(data){
                 const weatherdata= JSON.parse(data)
                //  const object ={
                //      name: "simrella",
                //      fav:"blue",
                //  }
                //  console.log( JSON.stringify(object));
                const temp= weatherdata.main.temp;
                const weather= weatherdata.weather[0].description;
                const icon=weatherdata.weather[0].icon;
                const imageurl=" http://openweathermap.org/img/wn/"+ icon +"@2x.png"
                console.log(temp);
                console.log(weather);
                res.write("<p>the weather is currently </p>"+ weather);
                res.write("<h1>temperature in "+query+" is " +temp+" degress</h1>");
                res.write("<img src="+imageurl+">");
                res.send();
    })
   
})
})


app.listen(3000, function(req,res){
    console.log("working in 3000");
});