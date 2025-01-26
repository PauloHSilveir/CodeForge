class ResponseHandler {
    static responseSuccess(res, data, statusCode = 200) {
      return res.status(statusCode).json({
        success: true,
        data: data
      });
    }
  
    static responseError(res, message, statusCode = 500) {
      return res.status(statusCode).json({
        success: false,
        error: message
      });
    }
  }
  
  module.exports = ResponseHandler;