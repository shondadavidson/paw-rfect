module.exports = {
    getMyProviders: (req, res) => {
        // console.log('hit getMyProviders', req.params)
        const db = req.app.get('db')
        let {id} = req.params
        id = parseInt(id)
        console.log('id', id)
        
        db.users.get_my_providers({owner_id: id}).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },

    provider: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params
        id = parseInt(id)
        db.users.get_provider({id:id}).then(
            resp => {
                res.status(200).semd(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    }

}