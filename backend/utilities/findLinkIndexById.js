
function findLinkIndexById(array, idValue) {
    let foundLinkIndex = null;
    //loop through the array of objects that contain links data
    for (const obj of array) {
        const linksData = obj.linksData;

        // Find the index of the link with the matching id
        const index = linksData.findIndex((link) => link.id === idValue);
        

        if (index) {
            foundLinkIndex = index;
            break;
        }
    }

    return foundLinkIndex;
}

module.exports = findLinkIndexById;
