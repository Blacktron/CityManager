'use_strict';

const fs = require('fs');
const express = require('express');
const sortHelper = require('./helpers/sortHelpers');
const cityHelper = require('./helpers/cityHelpers');
const constants = require('./configs/constants');

const app = express();

app.set('view engine', 'ejs'); // Set the view to EJS.

app.use(express.json()); // Parse request body as JSON.

app.get('/getData', (req, res) => {
    fs.readFile('./cities.json', constants.utf8, (err, data) => {
        if (err) {
            throw err;
        }

        cityData = JSON.parse(data);
        cityData = cityHelper.removeDuplicates(cityData);

        let updatedCityData = cityData.map(function(city) {
            let cityAreaKm = city.area * 2.59; // Convert square miles to square kilometers.
            let populationDensity = Math.round((city.population / cityAreaKm) * 100) / 100;

            return {
                name: city.name,
                area: city.area,
                population: city.population,
                density: populationDensity
            };
        });

        let sortKey = req.query.sortBy ? req.query.sortBy : '';
        if (sortKey) {
            let order = (req.query.order && req.query.order.toLocaleLowerCase() === constants.descending)
                ? constants.descending : constants.ascending;
            sortHelper.sortCities(updatedCityData, sortKey, order);
        }

        let keyword = req.query.keyword ? req.query.keyword : '';
        if (keyword) {
            let filteredCities = [];
            updatedCityData.forEach((city) => {
                if (city.name.toLowerCase().includes(keyword)) {
                    filteredCities.push(city);
                }
            });

            updatedCityData = filteredCities;
        }

        res.render('pages/index.ejs', {
            data: updatedCityData
        });
    });
});

app.post('/addCity', (req, res) => {
    if (req.body.name && req.body.area && req.body.population) {
        let newCity = req.body;
        fs.readFile('./cities.json', constants.utf8, (err, data) => {
            if (err) throw err;

            const cityData = JSON.parse(data);
            cityData.push(newCity);
            /*
                Further improvement - only add the new city if
                it's not already present in the file
             */
            fs.writeFile('./cities.json', JSON.stringify(cityData), (err) => {
                if (err) throw err;
            });
        });

        res.send('New city added successfully');
    } else {
        res.send('Failed to add new city to file!');
    }
});

app.listen(constants.listeningPort, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${constants.listeningPort}`);
});
