const fs = require('fs');
const path = require('path');

class ErrorLogger {
  constructor(logsFolderPath) {
    this.logsFolderPath = logsFolderPath || path.join(__dirname, '..', '..', 'logs'); // Caminho padrão fora da pasta "src"
  }

  //retorna a data atual no formato para ser inserido no nome do arquivo
  getCurrentDate() {
    const now     = new Date();
    const year    = now.getFullYear();
    const month   = String(now.getMonth() + 1).padStart(2, '0');
    const day     = String(now.getDate()).padStart(2, '0');
    const hours   = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0'); 
    return { year, month, day, hours, minutes, seconds };
  }

  logError(error) {
    const { year, month, day, hours, minutes, seconds } = this.getCurrentDate();
    const logFolder = path.join(this.logsFolderPath, year.toString());

    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder, { recursive: true });
    }

    const logFile = path.join(logFolder, `${day}${month}${year}.txt`);
    const errorMessage = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}  - ${error.toString()}${error.stack.split('\n')[1]};\n`;

    fs.appendFileSync(logFile, errorMessage, 'utf8');
  }
}

const instance = new ErrorLogger();
Object.freeze(instance);

module.exports = instance;