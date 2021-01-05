const router = require('express').Router();
const Pet = require('../model/Animal.js')
router.post('/new-pet', async (req, res) => {
    res.send('new pet')
    const pet = new Pet({
        name: req.body.name,
        type: req.body.type,
        adoptionStatus: req.body.adoptionStatus,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        hypoallergenic: req.body.hypoallergenic,
        dietary: req.body.dietary,
        bio: req.body.bio,
        photoUrl: req.body.photoUrl
    })
    try {
        const savedPet = await pet.save()
        res.send({
            pet: pet._id
        })
    }
    catch (err) {
        res.status(400).send(err)
    }
})
module.exports = router;