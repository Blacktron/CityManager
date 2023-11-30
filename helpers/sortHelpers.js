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

module.exports = {
    sortCities: sortCities
}