class ApiError extends Error {
    constructor(
        statuCode,
        message = "Something went Wrong",
        errors = [],
        statck = ''
    ){
        super(message)
        this.statuCode = statuCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}