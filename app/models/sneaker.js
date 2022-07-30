// SNEAKER -> have an owner, that is a user
// eventually we'll add an array of toy subdocuments

const mongoose = require('mongoose')

const { Schema, model } = mongoose

const sneakerSchema = new Schema(
    {
        brand: {
            type: String,
            required: true
        },
        colorway: {
            type: String,
            required: true
        },
        release: {
            type: Number,
            required: true
        },
        deadstock: {
            type: Boolean,
            required: true
        }
    }, {
        timestamps: true,
        // we're going to be adding virtuals to our model, the following lines will make sure that those virtuals are included whenever we return JSON or an Object
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

// virtuals go here
// these are virtual properties, that use existing data(saved in the database), to add a property whenever we retieve a document and convert it to JSON or an object.
sneakerSchema.virtual('fullTitle').get(function () {
    // in here, we can do whatever javascripty things we want, to make sure we return some value that will be assigned to this virtual
    // fullTitle is going to combine the name and type to build a title
    return `${this.brand} the ${this.colorway}`
})

sneakerSchema.virtual('too clean').get(function () {
    if (this.deadstock === true ) {
        return "yeah, drip going crazy"
    } else if (this.release === 2022 && this.deadstock === true) {
        return "pull em out one time"
    } else {
        return "man clean these thangs"
    }
})

module.exports = model('Sneaker', sneakerSchema)