# GeckoSpot

GeckoSpot is a single-page application built in React that allows users to manage their pet leopard geckos. In theory this app could be used to track any type of pet, but I chose geckos because of their complex feeding habits, genetic color traits, and amusing antics. Users can add a gecko to their collection, track its meals and weight, add photos, look at genetically related geckos, and buy, sell, and trade them in the marketplace.

## Installation

Along with the GeckoSpot repository, you will need to clone the [GeckoSpot-API](https://github.com/heidijane/geckospot-api) repo as well which contains the data structure and some gecko data for you to play around with.

You will need [json-server](https://www.npmjs.com/package/json-server) installed in order to create the persistant data storage.

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

[React](https://reactjs.org/)

[Reactstrap](https://reactstrap.github.io/) for speedy styling

[Cloudinary](https://cloudinary.com/) for image uploads

[Chart.js](https://www.chartjs.org/) for the line graph

[dbdiagram.io](https://dbdiagram.io/home) for data structure planning

[Sketchboard.me](https://sketchboard.me/home) for easy wireframing


## Other Goodies

[reactstrap-date-picker](https://github.com/afialapis/reactstrap-date-picker) for date pickin' made easy!

[pluralize](https://github.com/blakeembrey/pluralize) for making a word plural or singular easily

[react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) implement copy to clipboard in a snap

[react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) for using Chart.js in React

## Image Credits

Adorable tiled gecko background illustration by [Malky](https://malkshake.tumblr.com/)

Various icons from [icons8](https://icons8.com/)

Leopard gecko photos from the kind folks over on [/r/leopardgeckos](https://www.reddit.com/r/leopardgeckos/)
