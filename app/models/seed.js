// seed.js is going to be the file we run, whenever we want to seed our database, we'll create a bunch of pets at once.

// we want to be careful with this, because when we run it, it'll delete all of the pets in the db. 

// we can modify this later, to only delete pets that don't have an owner already, but we'll keep it simple for now.

const mongoose = require('mongoose')
const Pet = require('./sneaker')
const db = require('../../config/db')

const startSneakers = [
    { brand: 'Alexander McQueen', colorway: 'Black/White', release: 2020, deadstock: false},
    { brand: 'Air Jordan Retro 11', colorway: 'Cool Grey', release: 2010, deadstock: false},
    { brand: 'Versace', colorway: 'Green/Yellow', release: 2018, deadstock: false},
    { brand: 'Nike - Air Force 1', colorway: 'White', release: 2022, deadstock: true},
    { brand: 'Christian Louboutin (Red Bottoms)', colorway: 'Black', release: 2021, deadstock: false},
    { brand: 'Prada', colorway: 'Navy Blue', release: 2021, deadstock: true},
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the sneakers
        // here we can add something to make sure we only delete sneakers without an owner
        Sneaker.deleteMany({ owner: null })
            .then(deletedSneakers => {
                console.log('deletedSneakers', deletedSneakers)
                // the next step is to use our startSneakers array to create our seeded pSneakers
                Sneaker.create(startSneakers)
                    .then(newSneakers => {
                        console.log('the new sneakers', newSneakers)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })