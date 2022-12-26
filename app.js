
// this is a very simple node.js app to demonstrate how to use cookies
// run with: node app.js
// then visit: http://localhost:3000

const Cookies = require('cookies')

// Optionally define keys to sign cookie values
// to prevent client tampering
const keys = ['keyboard cat']

const app = require('express')();

app.all('*', function(req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');


    const cookies = new Cookies(req, res, { keys: keys })

    // Get the cookie
    const lastVisit = cookies.get('LastVisit', { signed: true })
  
    if (!lastVisit) {
        // Set the cookie with expiration time one minute (for testing)
        cookies.set('LastVisit', new Date().toISOString(),
          { signed: true, maxAge: Date.now() + 60*1000 , path: '/' })

        // try this instead (what is the difference? we give a path to the cookie therefore it is only valid for this path)
        //cookies.set('LastVisit', new Date().toISOString(),
        //    { signed: true, maxAge: Date.now() + 60*1000 , path: '/foo' })

        // note the HTML produced is not valid. Later we will see how to use a template engine to produce valid HTML
        res.write('<!DOCTYPE html><html><head></head><body><p>First visit with cookie</p></body></html>');
    }
    else
         res.write('<!DOCTYPE html><html><head></head><body><p>Welcome back!</p></body></html>');


    res.end();
});

app.listen(3000)