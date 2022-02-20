import request from 'postman-request'

function forecast(address, callback){

    const url = 'http://api.weatherstack.com/current?access_key=1aeb892affd3097317f534ec3c734704&query=' + 
                 address + '&units=f';


    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback("Unable to connect to the weather service");
        }else if(response.body.error){
            callback("Unable to find location. Try another search"); 
        }else{
            callback(undefined, {
                name: response.body.location.name,
                country: response.body.location.country,
                temperature: response.body.current.temperature,
                wind: response.body.current.wind_speed,
                precipitation: response.body.current.precip,
                feelslike: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions
            })
        }
    })
}

export {forecast}