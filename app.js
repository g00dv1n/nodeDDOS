/**
 * Created by g00dv1n on 27.09.16.
 */

var rp = require('request-promise');

const url1 = 'http://www.system-tips.net/'
const url2 = 'http://www.nailovsky.com/';
const getHome = () => {
    rp(url2)
        .then((htmlString) => {
            console.log('OK!');
        })
        .catch( (err) => {
            console.log(err);
        });
};


for(let i=0; i<10000; i++) {
    getHome();
}