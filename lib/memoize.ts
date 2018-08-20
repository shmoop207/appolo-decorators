import _ = require('lodash');

export function memoize(resolver?: Function) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;

        descriptor.value = _.memoize(originalMethod);

        return descriptor;
    }
}