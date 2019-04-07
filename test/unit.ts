"use strict";
import chai = require('chai');
import Q = require('bluebird');
import {bind, cache, debounce, delay, once, throttle} from "../index";
import {Cache} from "appolo-cache";

let should = chai.should();

describe("decorator", function () {


    it('should call throttle', async () => {

        class Test {

            test = 0;

            @throttle(10, {leading: false})
            handle() {
                return ++this.test;
            }
        }

        let test = new Test();

        test.handle();
        test.handle();
        test.handle();
        await Q.delay(11);

        test.test.should.be.eq(1);


    });

    it('should call debounce', async () => {

        class Test {

            test = 0;

            @debounce(10)
            handle() {
                return ++this.test;
            }
        }

        let test = new Test();

        test.handle();
        test.handle();
        test.handle();

        await Q.delay(5);
        test.test.should.be.eq(0);

        await Q.delay(11);

        test.test.should.be.eq(1);

    });

    it('should call bind', async () => {

        class Test {

            test = "test";

            @bind
            handle() {
                return this.test;
            }
        }

        let test = new Test();


        test.handle.call(null).should.be.eq("test");

    });

    it('should call delay', async () => {

        class Test {

            test = 0;

            @delay(10)
            handle() {
                return ++this.test;
            }
        }

        let test = new Test();

        test.handle();

        await Q.delay(5);
        test.test.should.be.eq(0);

        await Q.delay(11);

        test.test.should.be.eq(1);

    });


    it('should call cache', async () => {

        class Test {

            test = 0;

            @cache()
            handle() {
                return ++this.test;
            }
        }

        let test = new Test();

        test.handle();
        test.handle();
        test.handle();


        test.test.should.be.eq(1);

    });

    it('should call cache with key', async () => {

        class Test {

            test = 0;

            @cache()
            handle(key: string) {
                return ++this.test;
            }
        }

        let test = new Test();

        test.handle("a");
        test.handle("a");
        test.handle("b");

        (test.handle as any).cache.should.be.instanceOf(Cache)


        test.test.should.be.eq(2);

    });

    it('should call cache with multi key', async () => {

        class Test {

            test = 0;

            @cache({multi: true})
            handle(key: string, key2: string) {
                return ++this.test;
            }
        }

        let test = new Test();

        test.handle("a", "b");
        test.handle("a", "b");
        test.handle("a", "c");


        test.test.should.be.eq(2);

    });


    it('should call async cache', async () => {

        class Test {

            test = 0;

            @cache()
            async handle() {
                return ++this.test;
            }
        }

        let test = new Test();

        await test.handle();
        await test.handle();
        await test.handle();


        test.test.should.be.eq(1);

    });

    it('should call async cache with expire', async () => {

        class Test {

            test = 0;

            @cache({refresh: true, maxAge: 20})
            async handle() {
                return ++this.test;
            }
        }

        let test = new Test();
        await test.handle();
        await Q.delay(12);

        await test.handle();
        await test.handle();


        test.test.should.be.eq(2);

    });

    it('should call async cache with interval', async () => {

        class Test {

            test = 0;

            @cache({interval: 10})
            async handle(name: string) {
                return ++this.test;
            }
        }

        let test = new Test();
        await test.handle("a");
        await Q.delay(12);

        await test.handle("a");
        await test.handle("a");


        test.test.should.be.eq(2);

    });

    it('should call  cache key as object', async () => {

        class Test {

            test = 0;

            @cache()
            async handle(name: any) {
                return ++this.test;
            }
        }

        let test = new Test();
        await test.handle({"a": "a"});

        await test.handle({"a": "a"});
        await test.handle({"a": "a"});


        test.test.should.be.eq(1);

    });

    it('should call once', async () => {

        class Test {

            test = 0;
            test2 = 0;

            @once()
            handle() {
                return ++this.test;
            }

            @once(2)
            handle2() {
                return ++this.test2;
            }
        }

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


});
