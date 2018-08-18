"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function memoize(resolver) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = _.memoize(originalMethod);
        return descriptor;
    };
}
exports.memoize = memoize;
//# sourceMappingURL=memoize.js.map