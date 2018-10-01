import {Cache} from "appolo-cache";
import _ = require('lodash');
import Timer = NodeJS.Timer;

interface IOptions {
    resolver?: Function;
    maxSize?: number;
    maxAge?: number;
    clone?: boolean;
    peek?: boolean;
    refresh?: boolean;
    logger?: { error: (...args: any[]) => void };
    interval?: number;
    multi?: boolean

}

interface IInnerOptions extends IOptions {
    isPromise?: boolean;
    timer?: Timer | number;
    getMethod?: "get" | "peek" | "getByExpire" | "peekByExpire"

}

export function cache(cacheOptions: IOptions = {}) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {


        let options: IInnerOptions = _.defaults({}, cacheOptions);

        options.getMethod = options.peek ? "peek" : "get";

        if (options.refresh) {
            options.getMethod = options.peek ? "peekByExpire" : "getByExpire";
        }

        options.isPromise = false;

        const originalMethod = descriptor.value,
            cache = new Cache(options),
            argsLength = descriptor.value.length;

        descriptor.value = function (...args) {

            let key = getKey(argsLength, this, options, arguments);

            if (options.interval && !options.timer) {
                options.timer = setInterval(refreshValue.bind(null, this, originalMethod, args, key, cache, options), options.interval)
            }

            let item = getValueFromMemory(this, originalMethod, key, args, cache, options);

            if (item) {
                return options.isPromise ? Promise.resolve(item) : item
            }

            let result = getValue(this, originalMethod, args, key, cache, options);

            return result


        };

        descriptor.value.cache = cache;

        return descriptor;
    };

    function getKey(argsLength: number, scope: any, options: IInnerOptions, args: any) {
        if (options.resolver) {
            return options.resolver.apply(scope, args)
        }

        if ((argsLength > 1 && options.multi)) {
            return JSON.stringify(args)
        }

        let arg = args[0];

        return typeof arg == "object" ? JSON.stringify(arg) : arg
    }

    function getValueFromMemory(scope: any, originalMethod: any, key: any, args: any[], cache: Cache<any, any>, options: IInnerOptions) {

        let result = cache[options.getMethod](key);

        if (!result) {
            return null;
        }

        let value = result;

        if (options.refresh) {
            value = result.value;

            if (!result.validExpire) {
                refreshValue(scope, originalMethod, args, key, cache, options)
            }
        }

        return options.clone ? JSON.parse(value) : value;

    }

    function refreshValue(scope: any, originalMethod: any, args: any[], key: any, cache: Cache<any, any>, options: IOptions) {
        let value = getValue(scope, originalMethod, args, key, cache, options);

        Promise.resolve(value).catch((e) => {
            if (options.logger) {
                options.logger.error(`failed to refresh ${key}`, {e})
            }
        })
    }

    function getValue(scope: any, originalMethod: any, args: any[], key: any, cache: Cache<any, any>, options: IInnerOptions): Promise<any> | any {

        let result = originalMethod.apply(scope, args);

        if (!result || !result.then || !result.catch) {
            cache.set(key, options.clone ? JSON.stringify(result) : result, options.maxAge);
            return result;
        }

        options.isPromise = true;
        let value = result.then((data) => {
            cache.set(key, options.clone ? JSON.stringify(data) : data, options.maxAge);
            return data
        });

        return value
    }
}
