import * as _ from "lodash";

export function mixins(mixins: Function | Function[]): (fn: Function) => void {
    return function (fn: Function) {

        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => fn.prototype[name] = mixin.prototype[name])

        });
    }
}