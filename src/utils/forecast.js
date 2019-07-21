const request = require('request');

// Updata Climate data
const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/21f33109b57e3d7b5ffa7791732c34aa/${lat}, ${lon}?lang=bn&units=si`;
    request({ url, json: true}, (error, { body }) => {
      if(error){
        callback('Your internet connection is problem', undefined);
      }else if(body.error){
        callback('Unable to find location', undefined)
      }else{
        const variable =  body.currently;
        callback(undefined, `It is currently ${variable.temperature} degree and <br>
         Todays highest temperature is : ${body.daily.data[0].temperatureHigh} <br> 
         Todays lowest temperature is : ${body.daily.data[0].temperatureLow} <br>
         Status is: ${body.daily.data[1].summary}`)
      }
    })
  }

  module.exports = forecast;