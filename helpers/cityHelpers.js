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

module.exports = {
    removeDuplicates: removeDuplicates
}