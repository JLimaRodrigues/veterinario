const ErrorHandler = require('../models/ErrorHandler');

class ErrorLoggerController {
  logError(req, res, next) {
    try {
      // Simula um erro no sistema
      throw new Error('Erro simulado no sistema');
    } catch (error) {
      // Utiliza o ErrorHandler para logar o erro e renderizar a página de erro
      ErrorHandler.logAndRenderError(error, res);
    }
  }
}

module.exports = new ErrorLoggerController();