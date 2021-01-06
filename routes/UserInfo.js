const router = require('express').Router()
const verify = require(('./verifyToken'))
const User = require('../model/User')
const bcrypt = require('bcryptjs')
router.get('/', verify, (req, res) => {

    let id = req.IdFromToken._id
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ name: foundObject.name, lastName: foundObject.lastName })
        }
    })
})
// router.get('/', async (req, res) => {
//     try {
//         const pets = await User.find({})
//         res.json(pets)

//     } catch (err) {
//         res.status(500).send('Server error')

//     }



// })
router.put('/userinfo/:id', async (req, res) => {

    let id = req.params._id
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(400).send('Email already exists')
    }
    //change user
    const update = {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        userBio: req.body.userBio,
        // password: req.body.password
        password: hashPassword
    }
    User.findOneAndUpdate({ _id: id }, update, { upsert: true }
        , (err) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.send('done')

                console.log(req.body)
            }
        })
})
module.exports = router