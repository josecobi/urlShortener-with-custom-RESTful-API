# URL Shortener README

## Table of Contents
1. [Overview](#overview)
2. [Screenshots](#screenshots)
3. [Files and Structure](#files-and-structure)
    - [Backend](#backend)
        - [data](#data)
        - [routes](#routes)
        - [utilities](#utilities)
        - [views](#views)
    - [Frontend](#frontend)
        - [app.js](#appjs)
        - [shortenUrl.js](#shortenurljs)
        - [getlist.js](#getlistjs)
        - [createanchor.js](#createanchorjs)
        - [home.html](#homehtml)
        - [shortenlinks.html](#shortenlinkshtml)
        - [SVG Files](#svg-files)
4. [Usage of Event Listeners and custom API](#usage-of-event-listeners-and-custom-api)
5. [Async Functions and Import/Export](#async-functions-and-importexport)
6. [Styling](#styling)
7. [Usage](#usage)
8. [Contact](#contact)

## Overview

This project is a URL shortener web application that allows users to shorten long URLs and view a history of the links they have shortened. A custom RESTful API was created  for URL shortening. The implementation includes the use of async functions, DOM manipulation, event listeners, and GET, POST, PUT and DELETE methods to fetch information from the API.
## Screenshots
![Screenshot 2024-01-15 011353](https://github.com/josecobi/url-shortener/assets/58313777/c000a1dd-b750-40ca-8f8b-f305d84540c6)
![Screenshot 2024-01-15 011407](https://github.com/josecobi/url-shortener/assets/58313777/92750b44-44f9-41a8-b662-6c555b5180c2)
![Screenshot 2024-01-26 073804](https://github.com/josecobi/urlShortener-with-custom-RESTful-API/assets/58313777/c8df39b3-9301-4fce-a287-560f3eefec31)

![Screenshot 2024-01-15 011428](https://github.com/josecobi/url-shortener/assets/58313777/7ec70ca0-4bab-4592-bde1-52cacc0accbe)
![Screenshot 2024-01-15 011449](https://github.com/josecobi/url-shortener/assets/58313777/0ebdd57f-e9c0-4f44-8d91-7e47e6c22f0c)

## Express.js as a web server and EJS as a templating engine.

Express.js: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Express is used to create server, define routes, and handle HTTP requests and responses.

Express middleware is used for parsing request bodies (body-parser), serving static files, and checking API keys.

EJS (Embedded JavaScript): EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. EJS is used to render views in the Express application.It is used as my template engine. Ihe views are set to the directory ./backend/views. This is where Express will look for the EJS templates.

## Files and Structure

## Backend
- **data:**
  - **apiKeys.js:** File containing API keys data.
  - **links.js:** File containing information about links.

- **routes:**
  - **createApiKeys.js:** File handling API key creation.
  - **getLinks.js:** File handling the retrieval of links.
  - **manipulateLink.js:** File for manipulating link data.
  - **shortenURL.js:** File responsible for shortening URLs.

- **utilities:**
  - **error.js:** Utility file for handling errors.
  - **findLinkByProperty.js:** Utility file for finding links based on properties.

- **views:**
  - **index.ejs:** View file for the main index.
  - **shortenlinks.ejs:** View file for shortening links.
    - (Both views include partials that extend them)

## Frontend
### app.js

- **Functionality:**
  - Imports and exports variables and functions for various modules.
  - Defines constants like the API_KEY.
  - Sets up logic for the URL shortening form and the "Get Links" functionality.

### shortenUrl.js

- **Functionality:**
  - Handles the logic for shortening URLs.
  - Listens for form submissions, prevents default behavior, and fetches a shorter URL from the ManyApis.com API.
  - Utilizes async functions to handle API requests and responses.

### getlist.js

- **Functionality:**
  - Manages the logic for retrieving and displaying the list of shortened URLs.
  - Utilizes the "Get Links" button to trigger API requests and updates the table with relevant information.

### createanchor.js

- **Functionality:**
  - Declares a function to create anchor elements with URLs.
  - Used for creating clickable links in the table.

### home.html

- **Functionality:**
  - Defines the structure of the home page, including cards with information about features and an action button.
  - Includes an explanation of the app's features and functionality.

### shortenlinks.html

- **Functionality:**
  - Represents the app's main functionality page for URL shortening.
  - Includes a form for submitting long URLs, displaying the short URL, and listing previously shortened URLs.

### SVG Files

- **Functionality:**
  - Provides visual elements (analitics.svg, easyandfast.svg, forfree.svg, and qr-code.svg) for a more engaging and stylish design.

## Usage of Event Listeners and custom API

- **Event Listeners:**
  - The app utilizes event listeners to capture user interactions, such as form submissions and button clicks.
  - These listeners trigger various functions that handle the logic for URL shortening and retrieving the list of shortened URLs.

- **Custom API:**
  - The custom API is used for shortening URLs and retrieving a list of shortened URLs.
  - API requests are made using the `fetch` function, and responses are processed to update the app's UI.

## Async Functions and Import/Export

- **Async Functions:**
  - The app uses async functions to handle asynchronous operations, such as API requests.
  - This ensures that the app can perform tasks like fetching data without blocking the main thread.

- **Import/Export:**
  - Modules are imported and exported to organize the code into separate files, promoting maintainability and reusability.


### CSS (index.css)

- Hides the list of links by default (`display: none`).
- Styled components for better UI.

## Styling

The project utilizes Bootstrap (v5.3.2) for styling, providing a clean and responsive design.

## Usage

1. Open `index.html` in a web browser.
2. Paste a long URL in the input box and click "Shorten URL" to get a shortened URL.
3. Click on "My Links" in the navigation bar to view a history of shortened links.
4. Click "Show My Links" to display the table with link details.

Feel free to explore the code files (`index.js`, `shortenUrl.js`, `getlist.js`, and `index.css`) for a detailed understanding of the implementation.

## Contact

**Developer:** Jose Lopez Cobano (CobiDev) 
**Email:** cobitremolo@gmail.com 
