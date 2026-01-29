//Summary: Handles the initial renderpass/landingpage render for React Router
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

//see comment at EOF to understand why this is commented out
//import registerServiceWorker from './registerServiceWorker';



//baseUrl is the document URL, stored to set the home address/prefix of the routing tree,
//used for converting relative to absolute addresses
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
//rootElement parses the document to store the root
const rootElement = document.getElementById("root");
//element stores the definition of our initial render pass
const element =
    //Redux store that wraps the data and makes it globally accessable through call of store
    <Provider store={store}>
        {/*BrowserRouter is utilized by ReactRouter to build the redirect tree*/}
        <BrowserRouter basename={baseUrl}>
            {/*App.js is the first page rendered in the router*/}
            <App />
        </BrowserRouter>
    </Provider>;

//Requests React to render the 'element' in the respective location 'rootElement'
ReactDOM.render(element,rootElement);

{/* Uncomment the import registerServiceWorker function
and the registerServiceWorker() function to register the generated service worker.
By default create-react-app includes a service worker to improve the
performance of the application by caching static assets. This service
worker can interfere with the Identity UI, so it is
disabled by default when Identity is being used.*/}
//registerServiceWorker();

