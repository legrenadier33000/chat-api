const errorHandler = (err, req, res) => {
    if (res.headersSent)
        return next(err)

    res.status(500)
    return res.render('error', { error: err })
}

module.exports = errorHandler