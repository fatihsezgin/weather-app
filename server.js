/*
Console app for the weather app!

const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'b82f189bed79c5cf7058961eacbf8018';
let city = argv.c || 'istanbul';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`


request(url,(err,response,body)=>{
    if(err){
        console.log('Error:', err)
    }else{
        let weather = JSON.parse(body);
        //console.log('body',weather)

        let message = `It's ${weather.main.temp} degrees in
        ${weather.name}!`;
        console.log(message);
    }
});*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'b82f189bed79c5cf7058961eacbf8018';

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.render('index')
});

app.post('/', (req,res)=>{
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    request(url,(err,response,body)=>{
        if(err){
            res.render('index',{weather:null,error:'Error, please try again'})
        }else{
            let weather= JSON.parse(body);
            if(weather.main == undefined){
                res.render('index',{weather:null{weather:null,error:'Error, please try again'});
            }else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })  
});

app.listen(3000, ()=>{
    console.log("Example app listening on port 3000!")
})
