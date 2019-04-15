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
        console.log(req.params)
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
        console.log(req.params)
        console.log(req.body)
        const db = req.app.get('db')
        let { id } = req.params
        let { ownerId } = req.body
        id = parseInt(id)
        ownerId = parseInt(ownerId)
        console.log(id, ownerId)
        db.provider.pickup({ provider_id: id, owner_id: ownerId }).then(
            resp => {
                res.status(200).send(resp)
                console.log(resp)
            }
        )

    },

    dropoff: (req, res) => {
        console.log(req.params)
        console.log(req.body)
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
    }
}