"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const utils_1 = require("@appolo/utils");
const index_1 = require("../index");
const appolo_cache_1 = require("appolo-cache");
let should = chai.should();
describe("decorator", function () {
    it('should call throttle', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.throttle)(10)
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        await utils_1.Promises.delay(12);
        test.handle();
        test.test.should.be.eq(2);
    });
    it('should call debounce', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.debounce)(10)
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        await utils_1.Promises.delay(5);
        test.test.should.be.eq(0);
        await utils_1.Promises.delay(11);
        test.test.should.be.eq(1);
    });
    it('should call bind', async () => {
        class Test {
            constructor() {
                this.test = "test";
            }
            handle() {
                return this.test;
            }
        }
        tslib_1.__decorate([
            index_1.bind
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle.call(null).should.be.eq("test");
    });
    it('should call delay', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.delay)(10)
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        await utils_1.Promises.delay(5);
        test.test.should.be.eq(0);
        await utils_1.Promises.delay(11);
        test.test.should.be.eq(1);
    });
    it('should call cache', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)()
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        test.test.should.be.eq(1);
    });
    it('should call cache with key', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle(key) {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)()
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle("a");
        test.handle("a");
        test.handle("b");
        test.handle.cache.should.be.instanceOf(appolo_cache_1.Cache);
        test.test.should.be.eq(2);
    });
    it('should call cache with multi key', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle(key, key2) {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)({ multi: true })
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle("a", "b");
        test.handle("a", "b");
        test.handle("a", "c");
        test.test.should.be.eq(2);
    });
    it('should call async cache', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)()
        ], Test.prototype, "handle", null);
        let test = new Test();
        await test.handle();
        await test.handle();
        await test.handle();
        test.test.should.be.eq(1);
    });
    it('should call async cache with expire', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)({ refresh: true, maxAge: 20 })
        ], Test.prototype, "handle", null);
        let test = new Test();
        await test.handle();
        await utils_1.Promises.delay(12);
        await test.handle();
        await test.handle();
        test.test.should.be.eq(2);
    });
    it('should call async cache with interval', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle(name) {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)({ interval: 10 })
        ], Test.prototype, "handle", null);
        let test = new Test();
        await test.handle("a");
        await utils_1.Promises.delay(12);
        await test.handle("a");
        await test.handle("a");
        test.test.should.be.eq(2);
    });
    it('should call  cache key as object', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle(name) {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)()
        ], Test.prototype, "handle", null);
        let test = new Test();
        await test.handle({ "a": "a" });
        await test.handle({ "a": "a" });
        await test.handle({ "a": "a" });
        test.test.should.be.eq(1);
    });
    it('should call once', async () => {
        class Test {
            constructor() {
                this.test = 0;
                this.test2 = 0;
            }
            handle() {
                return ++this.test;
            }
            handle2() {
                return ++this.test2;
            }
        }
        tslib_1.__decorate([
            (0, index_1.once)()
        ], Test.prototype, "handle", null);
        tslib_1.__decorate([
            (0, index_1.once)(2)
        ], Test.prototype, "handle2", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        test.handle2();
        test.handle2();
        test.handle2();
        test.test.should.be.eq(1);
        test.test2.should.be.eq(2);
    });
    it('should call async mutli same key cache', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle(key) {
                await utils_1.Promises.delay(10);
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            (0, index_1.cache)()
        ], Test.prototype, "handle", null);
        let test = new Test();
        let [result1, result2, result3] = await Promise.all([test.handle(1), test.handle(1), test.handle(2)]);
        test.test.should.be.eq(2);
        result2.should.be.eq(1);
        result1.should.be.eq(1);
        result3.should.be.eq(2);
    });
});
//# sourceMappingURL=unit.js.map