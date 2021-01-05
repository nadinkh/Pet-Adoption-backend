const mongoose = require('mongoose')
//last name phone
const petSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    adoptionStatus: {
        type: String,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    color: {
        type: String,
    },
    hypoallergenic: {
        type: Boolean,
    },
    dietary: {
        type: String,
    },
    bio: {
        type: String,
    },
    photoUrl: {
        type: String,
    }
})
module.exports = mongoose.model('Pet', petSchema)