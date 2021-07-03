const express = require('express')
const https = require('https')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))



app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    
    const city = req.body.city
    const apiKey = "fa00ab39f366e569e48312fc25c7ceff"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData);
           const temp1 = weatherData.main.temp;
           const weatherDescription = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write("<h1>The temperature in "+city+" is "+temp1+"</h1>")
           res.write("<p>Description "+weatherDescription+"</p>")
           res.write("<img src="+imgURL+">")
           res.send()

        })
    })
})
app.listen(3000,function(){
    console.log("listening to 3000")
})
