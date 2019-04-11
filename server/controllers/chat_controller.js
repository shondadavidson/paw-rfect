module.exports = {
    getChat: (req, res){
    const db = req.app.get('db')
        let { id } = req.params
        db.chat.get_message_history({ room: id }).then(
            resp => {
                console.log(resp)
                res.status(200).send(resp)
            }
        ).catch(err => {
            res.status(400).send(err)
        })
    }

}
