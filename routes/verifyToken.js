module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}