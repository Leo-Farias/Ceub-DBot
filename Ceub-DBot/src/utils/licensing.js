const packages = require('../../package-licenses.json')


function countOccurancies(arr) {
    const total = arr.length
    var counts = {};

    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    for(license in counts){
        counts[license] = ((counts[license] / total) * 100).toFixed(2) + '%'
    }
    return counts
}

const licensiamento = () => {
    licenses = []
    packages.forEach((package) => {
        licenses.push(package.license)
    })
    const count = countOccurancies(licenses)
    return count
}

module.exports = licensiamento