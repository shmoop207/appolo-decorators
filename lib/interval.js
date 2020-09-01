"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = void 0;
function interval(milliseconds = 0) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        let interval;
        descriptor.value = function (...args) {
            clearInterval(interval);
            interval = setInterval(() => originalMethod.apply(this, args), milliseconds);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.interval = interval;
//# sourceMappingURL=interval.js.map