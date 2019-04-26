module.exports = {
    getClients: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        id = parseInt(id)

        db.provider.get_clients({ provider_id: id }).then(
            resp => {
                res.status(200).send(resp)
            })
    },

    getClientRequests: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        id = parseInt(id)

        db.provider.get_client_requests({ provider_id: id }).then(
            resp => {
                res.status(200).send(resp)
            })
    },

    getRequestCount: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        id = parseInt(id)

        db.provider.get_request_count({ provider_id: id }).then(
            resp => {
                res.status(200).send(resp[0].count)
            })
    },

    getWalking: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params
        id = parseInt(id)
        db.provider.get_walking({provider_id: id}).then(
            resp => {
                res.status(200).send(resp)
            }
        )

    },

    pickup: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let { ownerId } = req.body
        id = parseInt(id)
        ownerId = parseInt(ownerId)
        db.provider.pickup({ provider_id: id, owner_id: ownerId }).then(
            resp => {
                res.status(200).send(resp)
            }
        )

    },

    dropoff: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let {provider_id} = req.body
        id = parseInt(id)
        provider_id = parseInt(provider_id)
        db.provider.dropoff({ walk_id: id, provider_id: provider_id}).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    },
    acceptRequest: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let {owner_id} = req.body
        id = parseInt(id)
        owner_id = parseInt(owner_id)
        db.provider.accept({provider_id:id, owner_id: owner_id }).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => console.log(err))
    },
    denyRequest: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        let {owner_id} = req.body
        id = parseInt(id)
        owner_id = parseInt(owner_id)
        db.provider.deny({provider_id:id, owner_id: owner_id }).then(
            resp => {
                res.status(200).send(resp)
            }
        )
    }
}