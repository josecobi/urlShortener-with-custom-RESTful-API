import {shortenUrl} from './helpers/shortenUrl.js';
import {getList} from './helpers/getList.js';
export {form, inputBox, shortenedLink, API_KEY, getLinksBtn, listOfLinks, tableBody, originalLink};


// Variables for all modules
const API_KEY = "example";


// LOGIC FOR THE SHORTEN URL FUNCTION
// Variables 

const form = document.querySelector(".form");
const inputBox = document.querySelector(".urlInputBox");
const shortenedLink = document.querySelector(".shortened-link");
const copyToClipboard = document.querySelector(".copy-to-clipboard");


// Call function to shorten URL
shortenUrl();

// LOGIC FOR THE GET LINKS FUNCTION
// Variables 
const getLinksBtn = document.querySelector(".getLinksBtn");
const listOfLinks = document.querySelector(".list-of-links");
const tableBody = document.querySelector('.table-body');
const originalLink = document.querySelector('.original-link')
// Call function to get list of links
getList();

// Call function to copy the short link
copyText(shortenedLink.value);

// Copy short link
function copyText() {
    copyToClipboard.addEventListener("click", () => {
        navigator.clipboard.writeText
        (shortenedLink.value);
    })
         
}