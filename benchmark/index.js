'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const benchmark = require("benchmark");
const __1 = require("../");
let suite = new benchmark.Suite();
class Test {
    get(value) {
        return value;
    }
}
tslib_1.__decorate([
    __1.cache({ peek: true })
], Test.prototype, "get", null);
let test = new Test();
suite.add('set', function () {
    test.get(1);
});
suite
    .on('cycle', (event) => {
    console.log(String(event.target));
    if (event.target.error)
        console.error(event.target.error);
})
    .run();
//# sourceMappingURL=index.js.map