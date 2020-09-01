"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = void 0;
function once(n = 1) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        let counter = 0;
        let value;
        descriptor.value = function (...args) {
            if (counter < n) {
                value = originalMethod.apply(this, args);
                counter++;
            }
            return value;
        };
        return descriptor;
    };
}
exports.once = once;
//# sourceMappingURL=once.js.map