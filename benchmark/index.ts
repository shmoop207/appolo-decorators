'use strict'

import benchmark = require('benchmark');
import {cache} from '../';

let suite = new benchmark.Suite();

class Test {
    @cache({peek:true})
    get(value) {
        return value;
    }
}

let test = new Test();

suite.add('set', function () {
    test.get(1)
});




suite
    .on('cycle', (event) => {
        console.log(String(event.target))
        if (event.target.error)
            console.error(event.target.error)
    })
    .run()