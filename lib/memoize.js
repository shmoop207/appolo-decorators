"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
const utils_1 = require("@appolo/utils");
function memoize(resolver) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = utils_1.Functions.memoize(originalMethod);
        return descriptor;
    };
}
exports.memoize = memoize;
//# sourceMappingURL=memoize.js.map