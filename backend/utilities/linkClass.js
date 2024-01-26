const nanoid = require("nanoid");
const findLinkIndexById = require("./backend/utilities/findLinkIndexById");

class Link {
    constructor(id, longUrl) {
        this.id = id;
        this.longUrl = longUrl;
        this.shortUrl = nanoid();
        this.createdAt = new Date();
    }

    //create method to update shortUrl
    updateShortUrl() {
        this.shortUrl = nanoid();
    }

    //create method to delete the link
    deleteLink(links) {
        //find element that contains the provided id
        const index = findLinkIndexById(links, this.id);
        //if the id is found, delete link
        if (index !== -1) {
            links.splice(index, 1);
        }
    }
}

module.exports = Link;
