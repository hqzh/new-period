const md5 = require('md5');

const tools = {
  md(str){
    return md5(str)
  }
}

module.exports = tools;