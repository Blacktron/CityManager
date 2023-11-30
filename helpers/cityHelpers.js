function removeDuplicates(arr) {
    let filteredCityData = [];
    for (let i = 0; i < arr.length; i++) {
        let isDuplicateFound = false;
        for (let j = 0; j < filteredCityData.length; j++) {
            if (filteredCityData[j].name === arr[i].name) {
                isDuplicateFound = true;
                break;
            }
        }

        if (!isDuplicateFound) {
            filteredCityData.push(arr[i]);
        }
    }

    return filteredCityData;
}

function updateCitiesWithDensity(arr) {
    arr.forEach(function(city) {
        let cityAreaKm = city.area * 2.59; // Convert square miles to square kilometers.
        let populationDensity = Math.round((city.population / cityAreaKm) * 100) / 100;
        city.density = populationDensity;
    });

    return arr;
}

function sortCities(arr, propertyName, order) {
    const sortedCities = arr.sort((a, b) => {
        if (a[propertyName] < b[propertyName]) {
            return -1;
        }

        if (a[propertyName] > b[propertyName]) {
            return 1;
        }

        return 0;
    });

    if (order === 'descending') {
        sortedCities.reverse();
    }

    return sortedCities;
}

function filterCitiesByKeyword(arr, keyword) {
    let filteredCities = [];
    arr.forEach((city) => {
        if (city.name.toLowerCase().includes(keyword)) {
            filteredCities.push(city);
        }
    });

    return filteredCities;
}

module.exports = {
    removeDuplicates: removeDuplicates,
    updateCitiesWithDensity: updateCitiesWithDensity,
    sortCities: sortCities,
    filterCitiesByKeyword: filterCitiesByKeyword
}