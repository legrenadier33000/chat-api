class ErrorHandler {
    static handle(err, req, res) {
        const error = {
            message: err?.message,
            status: err?.status || 500,
            stack: err?.stack,
        }

        console.log(error.stack)
        res.status(error.status).json(error)
    }
}

module.exports = ErrorHandler