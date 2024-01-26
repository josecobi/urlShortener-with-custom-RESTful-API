

function findLinkByProperty(array, propertyName, propertyValue) {
    let foundLink = null;
    //loop through the array of objects that contain links data
    for (const obj of array) {
        const linksData = obj.linksData;

        // Find the link with the matching property
        const link = linksData.find((link) => link[propertyName] === propertyValue);

        if (link) {
            foundLink = link;
            break;
        }
    }

    return foundLink;
}

module.exports = findLinkByProperty;
