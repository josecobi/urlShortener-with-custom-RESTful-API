import {getLinksBtn, listOfLinks, API_KEY, tableBody, originalLink} from '../app.js';
import {createAnchor} from "./createanchor.js";

// Declare function to list the links
export async function getList(){
    try{
        getLinksBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const headers = {
                'Accept':'application/json',
                'x-api-key': API_KEY
              };
              
              fetch('http://127.0.0.1:3000/api/getLinks',
              {
                method: 'GET',
              
                headers: headers
              })
              .then(function(res) {
                  return res.json();
              }).then(function(body) {
                console.log("body: ", body);
                  addLinksToTable(body.linksDataArray);
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
    // const filteredData = arr.map(({ id, expiry, updatedAt, ...rest }) => rest);
    // Clear table if there is any link
    clearLinks();
    let counter = 1;
    // filteredData.forEach((object) => {
        arr.forEach((object) => {
        // Number each row        
        let tableRow = document.createElement('tr');
        let rowNumber = document.createElement('th');
        rowNumber.textContent = counter++;
        rowNumber.setAttribute("scope", "row");
        tableRow.appendChild(rowNumber);
        
        // Iterate through the object https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
        for (const property in object){
            let tableData = document.createElement('td');
            
            if(property === 'createdAt'){
                // Convert date to UTCString https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
                object[property] = new Date(object[property]).toUTCString();
            }
            // Make links clickable and add them to the row
            if(property === 'longUrl'|| property === 'shortUrl'){
                const anchor = createAnchor(object[property], counter);
                tableData.setAttribute("style", "max-width: 40rem;");
                tableData.setAttribute("class", "overflow-auto");
                
                tableData.appendChild(anchor);
                tableRow.appendChild(tableData);
                if(property === 'longUrl'){
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
        //add update and delete buttons to the row
        let updateButton = createButton('Update', 'btn btn-primary', object.id, 'update');
        let deleteButton = createButton('Delete', 'btn btn-danger', object.id, 'delete');
        
        let updateData = document.createElement('td');
        updateData.appendChild(updateButton);
        tableRow.appendChild(updateData);

        let deleteData = document.createElement('td');
        deleteData.appendChild(deleteButton);
        tableRow.appendChild(deleteData);


        //add each row to the table body
        tableBody.appendChild(tableRow);   
    })    
}

// Function to create a button
function createButton(label, className, id, action) {
    let button = document.createElement('button');
    button.textContent = label;
    button.setAttribute("class", className);
    button.setAttribute("data-id", id);
    button.setAttribute("data-action", action);
    
    // Attach click event listener
    button.addEventListener("click", handleButtonClick);
    return button;
}

//function to handle button clicks
async function handleButtonClick(event) {
    const id = event.target.getAttribute("data-id");
    const action = event.target.getAttribute("data-action");

    //perform action based on button clicked (update or delete)
    if (action === 'update') {
        try {
            //send HTTP request to update link
            const apiKey = API_KEY;


            const response = await fetch(`http://127.0.0.1:3000/api/manipulateLink/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to update link with ID ${id}`);
            }

            const body = await response.json();
            console.log(body);
            //if I have time, add feedback for the user in the UI
            console.log(`Link with ID ${id} updated successfully`);
        } catch (error) {
            console.error(error);
            //handle error
            alert(`Failed to update link with ID ${id}`);
        }
    } else if (action === 'delete') {
        //handle delete logic 
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/manipulateLink/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-key': API_KEY
                }
            });
        
            //check the status code of the response
            switch (response.status) {
                case 204:
                    console.log(`Link with ID ${id} deleted successfully`);
                    break;
                case 404:
                    throw new Error('Link not found');
                default:
                    throw new Error(`Failed to delete link with ID ${id}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
}
// Declare a function to clear the table
function clearLinks(){
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
}