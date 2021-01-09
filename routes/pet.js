const router = require('express').Router();
const Pet = require('../model/Animal.js')
router.post('/new-pet', async (req, res) => {
    // res.send('new pet')
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
router.get("/", async (req, res) => {
    try {
        // res.send(petsPath);
        let pets = await Pet.find({})
        res.send(pets);
    } catch (err) {
        console.error(err.massage);
        res.status(500).send('Server error')
    }
    // res.send(petsPath);
});

router.get('/:id', async (req, res) => {
    let id = req.params.id
    // console.log(id)
    const pet = await Pet.findOne({ _id: id })
    res.send({ pet })

})
router.put('/update/:id', async (req, res) => {
    let id = req.params.id
    const update = {
        name: req.body.name,
        type: req.body.type,
        adoptionStatus: req.body.adoptionStatus,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        hypoallergenic: req.body.hypoallergenic,
        dietary: req.body.dietary,
        bio: req.body.bio,
        // photoUrl: req.body.photoUrl
    }
    Pet.findOneAndUpdate({ _id: id }, update, { upsert: true }, (err, userObject) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json({ success: userObject })
        }
    })

})

module.exports = router;