

var Cookies = require('cookies')

// Optionally define keys to sign cookie values
// to prevent client tampering
var keys = ['keyboard cat']

let app = require('express')();

app.all('*', function(req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');


    var cookies = new Cookies(req, res, { keys: keys })

    // Get the cookie
    var lastVisit = cookies.get('LastVisit', { signed: true })
  
    if (!lastVisit) {
      // Set the cookie with expiration time one minute (for testing)
      cookies.set('LastVisit', new Date().toISOString(),
          { signed: true, maxAge: Date.now() + 60*1000 })
      res.write('<p>' +  'First visit with cookie' +'</p>');
    }
    else
         res.write('<p>' +  'You were here before...' +'</p>');


    res.end();
});

app.listen(3000)