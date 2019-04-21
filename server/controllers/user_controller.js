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
                console.log(resp)
                res.status(200).send(resp)
            }
        ).catch(err => {
            console.log(err)
            res.status(400).send(err)
        })
    },
    getOwner: (req, res) => {
        // console.log('hit controller get owner')
        // console.log({params:req.params})
        let {id} = req.params
        // console.log(id)
        id = parseInt(id)
        // console.log({getOwnerId: id})
        const db = req.app.get('db')
        db.users.get_owner({id: id}).then(
            owner => {
                // console.log({owner:owner})
                res.status(200).send(owner)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    updateOwner: (req, res) => {
        // console.log('hit user_controller owner')
        const { id } = req.params;
        // console.log(id)
        // console.log(req.body)
        const {ownerName, ownerShortDescription, ownerPicture, ownerZip} = req.body
        const infoUpdate = {
            name: ownerName,
            picture: ownerPicture,
            owner_desc: ownerShortDescription,
            zip: ownerZip,
            id: id
        }
        // console.log(infoUpdate)
        const db = req.app.get('db')
        db.users.update_owner(infoUpdate).then(
            (resp)=>{
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })

    },
    getDogs: (req, res) => {
        // console.log('hit get dogs')
        let { id } = req.params;
        // console.log(id)
        id = parseInt(id);
        // console.log(id)
        const db = req.app.get('db')
        db.users.get_dogs({owner_id: id}).then(
            dogs => {
                // console.log({dogs: dogs})
                res.status(200).send(dogs)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    addDog: (req, res) => {
        // console.log('hit user_controller addDog')
        // console.log(req.params)
        // console.log(req.body)
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
                // console.log({dogs: dogs})
                res.status(200).send(dogs)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    deleteDog: (req, res) => {
        // console.log('hit controller delete dog', {reqParams: req.params}, {reqData:req.data})
        const {id} = req.params
        const dog_id = parseInt(id)
        const {ownerId} = req.body
        // console.log({ownerId: ownerId})
        // console.log({reqBody: req.body})
        owner_id = parseInt(ownerId)
        // console.log({dogId: dog_id},{ownerId: owner_id})
        const dog = {
            dog_id:dog_id, 
            owner_id:owner_id
        }
        const db = req.app.get('db')
        db.users.delete_dog(dog).then(
            remainingDogs => {
                // console.log({remainingDogs:remainingDogs})
                res.status(200).send(remainingDogs)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    getProviderProfile: (req, res) => {
        // console.log('hit controller get provider profile')
        // console.log({params:req.params})
        let {id} = req.params
        // console.log(id)
        id = parseInt(id)
        // console.log({getProviderId: id})
        const db = req.app.get('db')
        db.users.get_provider_profile({id: id}).then(
            provider => {
                // console.log({provider:provider})
                res.status(200).send(provider)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },
    updateProviderProfile: (req, res) => {
        // console.log('hit user_controller update provider profile')
        const { id } = req.params;
        // console.log(id)
        const {providerName, providerShortDescription, providerExperience, providerBio, providerPicture, providerZip, dogWalkService, dogSitService, dogBoardService} = req.body
        const db = req.app.get('db')
        db.users.update_provider_profile({
            name: providerName, 
            short_desc: providerShortDescription, 
            picture: providerPicture,
            experience: providerExperience,
            bio: providerBio,
            zip: providerZip,
            provider_walker: dogWalkService,
            provider_sitter: dogSitService,
            provider_boarder: dogBoardService,
            id
        }).then( (resp) => {
            res.status(200).send(resp)
        }
        ).catch(err => {
            res.status(400).send(err)
        })
    },

    removeProvider: (req, res) => {
        console.log(req.params)
        console.log(req.body)
        let {id} = req.params
        let {owner_id }= req.body
        owner_id = parseInt(owner_id)
        const db = req.app.get('db')
        db.users.remove_provider({provider_id: id, owner_id: owner_id}).then(
            provider => {
                res.status(200).send(provider)
            }
        ).catch(err => {
            console.log(err)
            res.status(400).send(err)
        })

    }


}