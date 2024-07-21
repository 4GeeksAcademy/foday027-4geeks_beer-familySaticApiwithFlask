const express = require("express");
const PORT = 25000;
const beers = require("./beers.js");

const app = express();
// console.log(beers);

app.get("/", (request, response) => {
  response.send("this is my first route");
});

app.get("/beers", (request, reponse) => {
  reponse.json(beers)
})

app.get("/beer/id/:id", (request, response) => {
  const { id } = request.params;
  response.json(beers.filter(beer => beer.id === parseInt(id)));
});

app.get("/beer/name/:name", (request, response) => {
  const { name } = request.params;
  response.json(beers.filter(beer => beer.name.toLowerCase() === name.toLowerCase()))
  console.log(name, beers[0].name)
});

app.delete("/beer/id/:id", (request, response) => {
  const {id} = request.params
  beerToBeDeleted = beers.find(beer=> beer.id === parseInt(id))
  if(beerToBeDeleted){
    beers = beers.filter(beer => beer.id != parseInt(id))
    response.json(beerToBeDeleted)
  }

})

app.post("/beer", (request, response) => {
  const newBeer = request.body;
  const newId = beers.length > 0 ? Math.max(...beers.map(beer=> beer.id)) + 1 : 1;
  newBeer.id = newId
  beers.push(newBeer)
  response.json(newBeer)
  

})


app.listen(PORT, () => {
  console.log(`user connected on port: ${PORT}`);
});


{
  "name": "Sample Beer",
  "type": "Lager",
  "abv": 5.0
}