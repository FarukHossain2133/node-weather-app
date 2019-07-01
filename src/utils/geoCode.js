const request = require('request');

// Get GeoCode
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZmFydWsyMTMzIiwiYSI6ImNqeGZ2bXhjdDE0MTEzbm1wbjlmd21qdDYifQ.Au-JRexIkc9COVmAXAo6KQ&limit=1`;
     request({url, json: true}, (error, {body}) => {
        if(error){
          callback('Your internet connection is problem', undefined)
        }else if(body.features.length === 0){
          callback('Your given address is not match', undefined)
        }else{ 
          callback(undefined, {
             latitute: body.features[0].center[1],
            longitute: body.features[0].center[0], 
            place: body.features[0].place_name
          })
          }
        }
     )
  }

  module.exports = geoCode;
     
   