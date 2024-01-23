import {getLinksBtn, listOfLinks, API_KEY, tableBody, originalLink} from '../app.js';
import {createAnchor} from "./createanchor.js";

// Declare function to list the links
export async function getList(){
    try{
        getLinksBtn.addEventListener("click", () => {
            const headers = {
                'Accept':'application/json',
                'x-api-key': API_KEY
              };
              
              fetch('https://api.manyapis.com/v1-list-short-url',
              {
                method: 'GET',
              
                headers: headers
              })
              .then(function(res) {
                  return res.json();
              }).then(function(body) {
                  addLinksToTable(body.data);
              });
        })
    }
    catch(error){
        console.log(error);
    }
}

/** Declare function that adds links to a table.
It takes the array from the result given by the API 
and passes the data from each object into a new row **/
function addLinksToTable(arr){
    listOfLinks.style.display = 'block';
    // Filter the object so we get rid of the data we don't need(sid, expiry, updateAt) and keep the rest.
    const filteredData = arr.map(({ sid, expiry, updatedAt, ...rest }) => rest);
    // Clear table if there is any link
    clearLinks();
    let counter = 1;
    filteredData.forEach((object) => {
        // Number each row        
        let tableRow = document.createElement('tr');
        let rowNumber = document.createElement('th');
        rowNumber.textContent = counter++;
        rowNumber.setAttribute("scope", "row");
        tableRow.appendChild(rowNumber);
        
        // Iterate through the object https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
        for (const property in object){
            let tableData = document.createElement('td');
            
            if(property === 'expireAt'|| property === 'createdAt'){
                // Convert date to UTCString https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
                object[property] = new Date(object[property]).toUTCString();
            }
            // Make links clickable and add them to the row
            if(property === 'url'|| property === 'shortUrl'){
                const anchor = createAnchor(object[property], counter);
                tableData.setAttribute("style", "max-width: 40rem;");
                tableData.setAttribute("class", "overflow-auto");
                
                tableData.appendChild(anchor);
                tableRow.appendChild(tableData);
                if(property === 'url'){
                    tableData.setAttribute("class", "d-none d-sm-block overflow-auto");
                    originalLink.setAttribute("class", "d-none d-sm-block overflow-auto")
                }
            }
            // Add the rest of the data to the row
            else{
                tableData.textContent = object[property];
                tableRow.appendChild(tableData);
            }
        }
        // Add each row to the table body
        tableBody.appendChild(tableRow);   
    })    
}


// Declare a function to clear the table
function clearLinks(){
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
}