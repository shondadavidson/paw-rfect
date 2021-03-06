module.exports = {
    getChat: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params
        db.chat.get_message_history({ room: id }).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },

    getInbox: (req, res) => {

        const db = req.app.get('db')
        let { id } = req.params
        id = parseInt(id)
        db.chat.get_inbox({ user_id: id }).then(
            resp => {
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    },

    read: (req, res) => {
        const db = req.app.get('db')
        let { room } = req.body
        let {id} = req.params
        id = parseInt(id)
        db.chat.read({ room: room, user_id: id }).then(
            resp => {
                res.status(200).send(resp)
            }).catch(err => {
            res.status(400).send(err)
        })
    },
    getNewMessageCount: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params
        id = parseInt(id)
        db.chat.new_message_count({user_id: id }).then(
            resp => {
                res.status(200).send(resp[0])
            }).catch(err => {
            res.status(400).send(err)
        })
    }

}
