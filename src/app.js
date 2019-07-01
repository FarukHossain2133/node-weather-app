const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

// Define Pathes for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Hanglerbars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Faruk Hossain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Faruk Hossain'
    })
})
 


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Helping Page',
        name: 'Faruk Hossain',
        msg: 'For any help please visit our Q&A page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide your address'
        })
    }
    geocode(req.query.address, (error, {latitute, longitute, place} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitute, longitute, (error, data) => {
            if(error){
                return res.send({error})
            }
            res.send({
                data,
                place

            })
        })
    })

})

app.get('/products',(req, res) => { 
    if(!req.query.search){
        return res.send({
             error: 'you must provide a search term'
         })
    }
   console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Faruk Hossain',
        errorMsg: 'SORRY Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Faruk Hossain',
        errorMsg: 'SORRY Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})