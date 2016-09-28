/**
 * Created by g00dv1n on 28.09.16.
 */
const fs = require('fs');


class ProxyChanger {
    constructor(filePath, interval) {
        let data = fs.readFileSync(filePath, 'UTF-8');
        this.pl = data.split('\n');
        this.interval = interval;
        this.length = this.pl.length;
        this.i = 0;
    }

    changeProxy(self) {
        process.env.HTTP_PROXY = 'http://' + self.pl[self.i];
        console.log(`Current proxy: ${process.env.HTTP_PROXY}`);
        self.i =  (self.i + 1 < self.length) ? (self.i + 1) : 0;
    }

    run() {
        let task = () =>{
            this.changeProxy(this);
        }
        setInterval(task, this.interval);
    }

}

module.exports = ProxyChanger;
