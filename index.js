const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8083;
const dictionaryApi = "https://od-api.oxforddictionaries.com/api/v2";

app.get('/', function(req, res){
  res.send("Welcome to Dictionary API")
})

app.get('/dictionarysearch/:language/:wordId', async (req, res) => {

  const language = req.params.language;
  const wordId = req.params.wordId;

  const fileRead = fs.readFileSync('./config.json', 'utf-8');
  const auths = JSON.parse(fileRead);
  const app_id = auths.app_id;
  console.log(auths, 'auths');
  console.log(app_id, 'appid');
  const app_key =  auths.app_key;
  console.log(app_key, 'appkey');

  const apiUrl = `${dictionaryApi}/entries/${language}/${wordId.toLowerCase()}`;
  console.log(apiUrl);
  try{
    const response = await axios.get(apiUrl, {
      headers:  {
        'app_id': app_id,
        'app_key': app_key
      }
    })
    // console.log(response.data)
    res.send(response.data);
  }
  catch(err){
    console.log("Error response data", err.response.data);
    console.log("Error response status", err.response.status);
    console.log("Error response headers", err.response.headers);
  }


});


app.listen(port, ()=>{
  console.log("App listening to", port)
})

