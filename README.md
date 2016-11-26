# Climate Zone Query

This is a React application for querying data about the Köppen–Geiger climate classification system

## About Köppen-Geiger

The Köppen-Geiger climate classification is a taxonomy of the climates of the Earth's surface. It was developed by Wladimir Köppen and Rudolf Geiger. The system distinguishes between major types of climates (tropical, temperate, subarctic) as well as more granular distinctions among these broader classifications.

For example, the Köppen-Geiger distinguishes between tropical monsoon climates (such as Monrovia, Liberia) and tropical rainforest climates (such as Manaus, Brazil). Similar distinctions are made in the temperate climates: Washington, DC is classified as a humid subtropical climate, while Los Angeles is a Mediterranean climate although both fall under the broad category of temperate climate.

These classifications were considered overly broad, particularly for temperate climates in Asia and North America, and were revised in the [Trewartha climate system](https://en.wikipedia.org/wiki/Trewartha_climate_classification).

## About the Data

Climate data is from [this site](http://koeppen-geiger.vu-wien.ac.at/) run by the Institute for Veterinary Public Health and the Provincial Government of Carinthia in Austria. The KMZ overlay file was created by M. Scott Wilkerson and M. Beth Wilkerson at DePauw University.

## About the app

What Does this App Do?

This app to allow users to search for any place on the earth and see the corresponding climate zone. Results are placed on a Google Map, where a visual representation of the Köppen-Geiger classification can be overlaid.

Caveats: Occasionally discrepencies exist between the marker location, climate zone, and KMZ overlay becuase the data set rounds each latitude longitude pair to the nearest half degree.
Technologies: This application is built with React.js, Google Fusion Tables, the Google Maps API, create-react-app, and react-google-maps.

## Installation Instructions

This project depends on node.js and npm.

    # make sure create-react-app is installed globally
    npm install -g create-react-app
    # Clone the repository
    git clone git@github.com:sco-tt/Climate-Zone-Query.git my-climate-zone-query && cd my-climate-zone-query
    # Install packages
    npm install
    # Run the application
    npm start