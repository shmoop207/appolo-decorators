"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function mixins(mixins) {
    return function (fn) {
        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => fn.prototype[name] = mixin.prototype[name]);
        });
    };
}
exports.mixins = mixins;
//# sourceMappingURL=mixins.js.map