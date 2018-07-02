const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let pizzas = [
  {
    id: "1",
    pizza: "hawaii",
    price: "20"
  },
  {
    id: "2",
    pizza: "chicken",
    price: "100"
  },
  {
    id: "3",
    pizza: "donkey",
    price: "100000"
  }
];

app.get("/", function(req, res) {
  res.send("Hello World!");
});

//GET
app.get("/pizzas", function(req, res) {
  res.send(pizzas);
});

app.get("/pizzas/:id", function(req, res) {
  const requestedPizza = pizzas.find(pizza => {
    return pizza.id === req.params.id;
  });
  res.send(requestedPizza);
});

// PUT
app.put("/pizzas/:id", function(req, res) {
  const requestedPizza = pizzas.find(pizza => {
    return pizza.id === req.params.id;
  });
  const updatedPizza = { ...requestedPizza, ...req.body };
  console.log(updatedPizza);
  // ES5 Method
  // const updatedPizza = {
  //     name: req.body.name || requestedPizza.name,
  //     price: req.body.price || requestedPizza.price
  // }
  res.send(updatedPizza);
});

//POST
app.post("/pizzas", (req,res) => {
    pizzas.push(req.body);
    res.send(pizzas);
});

app.post("/pizzas", (req,res) => {
    pizzas = {...pizzas, ...req.body}
    res.send(pizzas);
});

//DELETE 
app.delete("/pizzas/:id", function(req, res) {
    const deletedPizza = pizzas.filter(pizza => {
      return pizza.id !== req.params.id;
    });
    res.send(deletedPizza);
  });
  

const server = app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}...`);
});
