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
    }
}