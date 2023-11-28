'use_strict';

const fs = require('fs');
const express = require('express');
const serverConfig = require('./configs/serverConfig');

const app = express();

let cityData;
fs.readFile('./cities.json', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }

    cityData = JSON.parse(data);
});


app.get('/', (req, res) => {
    let newCityData = cityData.map(function(city) {
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

app.listen(serverConfig.listeningPort);
