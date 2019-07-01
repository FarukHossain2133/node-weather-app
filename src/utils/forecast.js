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
        callback(undefined, `It is currently ${variable.temperature} degree there is ${variable.precipProbability}% change of rain and status is ${body.daily.data[1].summary}`)
      }
    })
  }

  module.exports = forecast;