const express = require('express');
const cart = express.Router();

const cartArray = [
    {id: 1, product: 'Rice Krispies', price: 2.00, quantity: 2},
    {id: 2, product: 'Fish', price: 5.50, quantity: 1},
    {id: 3, product: 'Crackers', price: 1.10, quantity: 3},
    {id: 4, product: 'Fancy T-Rex Toy', price: 15.10, quantity: 10},
    {id: 5, product: 'Bacon', price: 20.10, quantity: 5}
];

// this is not working find out why later //
cart.get('/', (req, res) => {
    const maxPrice = parseFloat(req.query.maxPrice);
    const prefix = req.query.prefix;
    const pageSize = parseInt(req.query.pageSize);
    if (maxPrice) {
        cartArray === cartArray.filter(i => i.price <= maxPrice);
    } if (prefix) {
        cartArray === cartArray.filter(i => i.product.toUpperCase().startsWith(prefix.toUpperCase()));
    } if (pageSize) {
        cartArray === cartArray.slice(0, pageSize);
    }
    res.status(200);
    res.json(cartArray);
});

cart.get('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    const item = cartArray.find( i => i.id === cartId); {
        if(item) {
            res.status(200).send(item);
        } else {
            res.status(404);
            res.send('ID NOT FOUND');
        }
    }
});

cart.post('/', (req, res) => {
    const product = req.body.product;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const id = cartArray[cartArray.length -1].id + 1;
    const newItem = {id, product, price, quantity};
    cartArray.push(newItem);
    res.status(201).json(newItem);
});

cart.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCart = cartArray.findIndex(i => i.id === id);
    cartArray[indexOfCart].product = req.body.product;
    cartArray[indexOfCart].price = req.body.price;
    cartArray[indexOfCart].quantity = req.body.quantity;
    res.status(200).json(cartArray[indexOfCart]);
})

cart.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCart = cartArray.findIndex(i => i.id === id);
    cartArray.splice(indexOfCart, 1);
    res.sendStatus(204);
});

module.exports = cart;