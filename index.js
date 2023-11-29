'use_strict';

const fs = require('fs');
const express = require('express');
const serverConfig = require('./configs/serverConfig');
const sortHelper = require('./helpers/sortHelpers')

const app = express();
// TODO Remove duplicates from city data

let cityData;
fs.readFile('./cities.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }

    cityData = JSON.parse(data);
});

app.set('view engine', 'ejs');

app.use(express.json());

// app.get('/getData/:sortBy/:order', (req, res) => {
//     let updatedCityData = cityData.map(function(city) {
//         let cityAreaKm = city.area * 1.6;
//         let populationDensity = Math.round((city.population / cityAreaKm) * 100) / 100;
//
//         return {
//             name: city.name,
//             area: city.area,
//             population: city.population,
//             density: populationDensity
//         };
//     });
//
//     let sortKey = req.params['sortBy'];
//     if (sortKey) {
//         let order = req.params['order'].toLowerCase();
//         if (order === 'descending') {
//             sortHelper.sortCities(updatedCityData, sortKey, order);
//         } else {
//             sortHelper.sortCities(updatedCityData, sortKey);
//         }
//     }
//
//     res.send(updatedCityData);
// });

let newCityData;
app.get('/', (req, res) => {
    newCityData = cityData.map(function(city) {
        let cityAreaKm = city.area * 1.6;
        let populationDensity = Math.round((city.population / cityAreaKm) * 100) / 100;

        return {
            name: city.name,
            area: city.area,
            population: city.population,
            density: populationDensity
        };
    });

    // res.send(newCityData);
    res.render('pages/index.ejs', {
        data: newCityData,
        test: "test"
    });
});

app.get('/sort', (req, res) => {
    let sortKey;
    if (req.query.sortBy) {
        sortKey = req.query.sortBy;
    }

    if (sortKey) {
        if (req.query.order && req.query.order.toLocaleLowerCase() === 'descending') {
            sortHelper.sortCities(newCityData, sortKey, req.query.order);
        } else {
            sortHelper.sortCities(newCityData, sortKey);
        }
    } else {
        return newCityData;
    }

    res.send(newCityData)
});

app.get('/filter/:keyword', (req, res) => {
    let filteredCities = [];
    let keyword = req.params['keyword'];
    if (keyword) {
        newCityData.forEach((city) => {
            if (city.name.includes(keyword)) {
                filteredCities.push(city);
            }
        });
    }

    res.send(filteredCities);
});

app.post('/addCity', (req, res) => {
    if (req.body.name && req.body.area && req.body.population) {
        let newCity = req.body;
        fs.readFile('./cities.json', 'utf8', (err, data) => {
            if (err) throw err;

            const cityData = JSON.parse(data);
            cityData.push(newCity);
            fs.writeFile('./cities.json', JSON.stringify(cityData), (err) => {
                if (err) throw err;
            });
        });

        res.send('New city added successfully');
    } else {
        res.send('Failed to add new city to file!');
    }
});

app.listen(serverConfig.listeningPort, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${serverConfig.listeningPort}`);
});


