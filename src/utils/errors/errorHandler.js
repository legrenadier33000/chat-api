const errorHandler = (err, req, res) => {
    if (res.headersSent)
        return next(err)

    return res.status(err.statusCode).send(err.message)
}

module.exports = errorHandler