const express = require('express');
const app = express();

const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));


app.get('/',(req,res)=>{
    let quote , auther 
    quote = "";
    author = "";
   

    res.render('layout',{quote:quote , auther:auther }); 
})

app.post('/quotes',async(req,res)=>{
 
    const category = req.body.category
    console.log(category);
    const options = {
        method: 'GET',
        url: 'https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes',
        params: {category: category},
        headers: {
          'X-RapidAPI-Key': 'f1494d0684mshbacf0a251e7a71ap10b30ajsn233ce10fb6f1',
          'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
        
          const quote = response.data[0].quote;
          const author = response.data[0].author;
       res.render('layout',{quote:quote,author:author});

      } catch (error) {
          res.send(error);
      }


    
})





app.listen(3000);