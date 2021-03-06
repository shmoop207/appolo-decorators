"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
function delay(milliseconds = 0) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            setTimeout(() => originalMethod.apply(this, args), milliseconds);
        };
        return descriptor;
    };
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map