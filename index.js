'use_strict';

const fs = require('fs');
const express = require('express');
const serverConfig = require('./configs/serverConfig');
const sortHelper = require('./helpers/sortHelpers')

const app = express();
// TODO Remove duplicates from city data
let cityData;
fs.readFile('./cities.json', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }

    cityData = JSON.parse(data);
});

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

    res.send(newCityData);
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

app.listen(serverConfig.listeningPort);


