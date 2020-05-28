# GeckoSpot

GeckoSpot is a single-page application built in React that allows users to manage their pet leopard geckos. In theory this app could be used to track any type of pet, but I chose geckos because of their complex feeding habits, genetic color traits, and amusing antics. Users can add a gecko to their collection, track its meals and weight, add photos, look at genetically related geckos, and buy, sell, and trade them in the marketplace.

## Installation

Along with the GeckoSpot repository, you will need to clone the [https://github.com/heidijane/geckospot-api](GeckoSpot-Api) repo as well which contains the data structure and some gecko data for you to play around with.

You will need [https://www.npmjs.com/package/json-server](json-server) installed in order to create the persistant data storage.

To start the json server, run the following command in your terminal inside of the geckospot-api directory:
```bash
json-server -p 8088 -w database.json
```
To start the application, run the following command in your terminal inside of the geckospot directory:
```bash
npm start
```
## Dummy User Data

To quickly get to the gecko goodness login with the follwing dummy user data:

Username: heidi
Password: 1234

## Technologies Used

[https://reactjs.org/](React)
[https://reactstrap.github.io/](Reactstrap) for speedy styling
[https://cloudinary.com/](Cloudinary) for image uploads
[https://www.chartjs.org/](Chart.js) for the line graph
[https://dbdiagram.io/home](dbdiagram.io) for data structure planning
[https://sketchboard.me/home](Sketchboard.me) for easy wireframing

## Other Goodies

[https://github.com/afialapis/reactstrap-date-picker](reactstrap-date-picker) for date pickin' made easy!
[https://github.com/blakeembrey/pluralize](pluralize) for making a word plural or singular easily
[https://github.com/nkbt/react-copy-to-clipboard](react-copy-to-clipboard) implement copy to clipboard in a snap
[https://github.com/jerairrest/react-chartjs-2](react-chartjs-2) for using Chart.js in React

## Image Credits

Adorable tiled gecko background illustration by [https://malkshake.tumblr.com/](Malky)
Various icons from [https://icons8.com/](icons8)
Leopard gecko photos from the kind folks over on [https://www.reddit.com/r/leopardgeckos/](/r/leopardgeckos)
