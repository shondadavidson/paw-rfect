module.exports = {
    getMyProviders: (req, res) => {
        // console.log('hit getMyProviders', req.params)
        const db = req.app.get('db')
        let { id } = req.params
        id = parseInt(id)

        db.users.get_my_providers({ owner_id: id }).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },

    provider: (req, res) => {
        console.log(req.params)
        console.log(req.body)
        const db = req.app.get('db')
        let { id } = req.params
        id = parseInt(id)
        let { ownerId } = req.body
        ownerId = parseInt(ownerId)
        db.users.get_provider({ id: id, owner_id: ownerId }).then(
            resp => {
                res.status(200).send(resp[0])
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    searchProviders: (req, res) => {
        console.log('hit')
        console.log(req.params)
        const db = req.app.get('db')
        let { zip } = req.params
        zip = parseInt(zip)
        db.users.search_providers({ zip: zip }).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },

    addProvider: (req, res) => {
        console.log('params', req.params)
        console.log('body', req.body)
        const db = req.app.get('db')
        let { id } = req.params
        let { providerId } = req.body
        id = parseInt(id)
        providerId = parseInt(providerId)
        db.users.add_provider({ owner_id: id, provider_id: providerId }).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    owner: (req, res) => {
        console.log('hit user_controller owner')
    },
    addDog: (req, res) => {
        console.log('hit user_controller addDog')
        console.log(req.params)
        console.log(req.body)
        let { id } = req.params
        let {dogName, dogAge, dogWeight, dogBreed, dogGender, dogSpecialNotes, dogPicture} = req.body;
        id = parseInt(id);
        dogAge = parseInt(dogAge);
        dogWeight = parseInt(dogWeight);
        const newDog = {
            dog_name: dogName, 
            dog_age : dogAge, 
            weight: dogWeight, 
            breed: dogBreed,
            dog_gender: dogGender, 
            special_notes: dogSpecialNotes, 
            dog_picture: dogPicture,
            owner_id: id
        }
        const db = req.app.get('db')
        db.users.add_dog(newDog).then(
            dogs => {
                console.log({dogs: dogs})
                res.status(200).send(dogs)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    }


}