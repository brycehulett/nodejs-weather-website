import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express'
import hbs from 'hbs'
import {forecast} from './utils/forecast.mjs'

const app = express()

// define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs') // to set up handle bars for dynamic templates 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Bryce Hulett'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Bryce Hulett'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        helpText: 'Ha Ha. No help here.',
        name: 'Bryce Hulett'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    forecast(req.query.address, (error, {temperature, wind, precipitation} = {}) => {
        console.log(error) 
        if(error){
            return res.send({error})
        }
        res.send({
            address: req.query.address,
            temperature,
            precipitation,
            wind
        })

      })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render("404",{
        title: '404',
        name: 'Bryce Hulett',
        error: 'Help resource not found'
    })
})

// must be last, and to match everything we use the wildcard character
app.get('*',(req, res)=>{
    res.render("404",{
        title: 'Page not found: 404 error',
        name: 'Bryce Hulett',
        error: 'Article not found'
    })
})

// starts the server and listens to a port (basic http is port 80)
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})   

