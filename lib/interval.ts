export function interval(milliseconds: number = 0) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;

        let interval: NodeJS.Timeout;

        descriptor.value = function (...args) {

            clearInterval(interval);

            interval = setInterval(() => originalMethod.apply(this, args), milliseconds);

            return originalMethod.apply(this, args);
        };
        return descriptor;
    }

}