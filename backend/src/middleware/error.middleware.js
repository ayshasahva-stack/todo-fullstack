function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500
    let message = err.message || 'something went wrong'

    res.status(statusCode).json({
        success: true,
        message
    })

}
export default errorHandler

