"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixins = void 0;
const utils_1 = require("@appolo/utils");
function mixins(mixins) {
    return function (fn) {
        utils_1.Functions.mixins(fn, mixins);
    };
}
exports.mixins = mixins;
//# sourceMappingURL=mixins.js.map