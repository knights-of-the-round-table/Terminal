exports.responseError = function response ( data ) {
    return {
        status: 'ERROR',
        data
    }
}

exports.responseSuccess = function response ( data ) {
    return {
        status: 'OK',
        data
    }
}