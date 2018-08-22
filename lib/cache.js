"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_cache_1 = require("appolo-cache");
const _ = require("lodash");
function cache(cacheOptions = {}) {
    return function (target, propertyKey, descriptor) {
        let options = _.defaults({}, cacheOptions);
        options.getMethod = options.peek ? "peek" : "get";
        if (options.refresh) {
            options.getMethod = options.peek ? "peekByExpire" : "getByExpire";
        }
        options.isPromise = false;
        const originalMethod = descriptor.value, cache = new appolo_cache_1.Cache(options);
        descriptor.value = function (...args) {
            let key = options.resolver ? options.resolver.apply(this, args) : args[0];
            if (options.interval && !options.timer) {
                options.timer = setInterval(() => refreshValue(this, originalMethod, key, args, cache, options), options.interval);
            }
            let item = getValueFromMemory(this, originalMethod, key, args, cache, options);
            if (item) {
                return options.isPromise ? Promise.resolve(item) : item;
            }
            let result = getValue(this, originalMethod, args, key, cache, options);
            return result;
        };
        return descriptor;
    };
    function getValueFromMemory(scope, originalMethod, key, args, cache, options) {
        let result = cache[options.getMethod](key);
        if (!result) {
            return null;
        }
        let value = result;
        if (options.refresh) {
            value = result.value;
            if (!result.validExpire) {
                refreshValue(scope, originalMethod, args, key, cache, options);
            }
        }
        return options.clone ? JSON.parse(value) : value;
    }
    function refreshValue(scope, originalMethod, args, key, cache, options) {
        let value = getValue(scope, originalMethod, args, key, cache, options);
        Promise.resolve(value).catch((e) => {
            if (options.logger) {
                options.logger.error(`failed to refresh ${key}`, { e });
            }
        });
    }
    function getValue(scope, originalMethod, args, key, cache, options) {
        let result = originalMethod.apply(scope, args);
        if (!result || !result.then || !result.catch) {
            cache.set(key, options.clone ? JSON.stringify(result) : result, options.maxAge);
            return result;
        }
        options.isPromise = true;
        let value = result.then((data) => {
            cache.set(key, options.clone ? JSON.stringify(data) : data, options.maxAge);
            return data;
        });
        return value;
    }
}
exports.cache = cache;
//# sourceMappingURL=cache.js.map