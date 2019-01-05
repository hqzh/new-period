var request = require('request');
const cheerio = require('cheerio');   // 解析html
request('https://cn.bing.com/', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

const $ = cheerio.load('<h2 class="title">Hello world</h2>');

console.log($('.title').text())