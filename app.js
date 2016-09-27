/**
 * Created by g00dv1n on 27.09.16.
 */

var rp = require('request-promise');

const url = 'http://www.system-tips.net/'
const getHome = () => {
    rp(url)
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