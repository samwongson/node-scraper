var fs = require('fs');
var cheerio = require('cheerio');
var requestModule = require('./module');
var csvWriter = require('csv-write-stream');



requestModule(process.argv[2], function(err, data) {
  var writer = csvWriter({headers: ["Permission", "Absolute URL", "Ext."]});
  writer.pipe(fs.createWriteStream('images.csv'));

  if (err) {
    throw err;
  } else {
    $ = cheerio.load(data);

    $('tr').each(function(i, elem) {
      var permission = $(this).find('td').first().text();
      var absURL = $($(this).find('td').get(2)).find('a').attr('href');
      var ext;
      if (absURL.split('.').length == 2) {
        ext = absURL.split('.').pop();
      } else {
        ext = "none";
      }
      writer.write([permission, absURL, ext]);
    });

    writer.end();

  }



})

