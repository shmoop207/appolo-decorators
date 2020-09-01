"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = exports.interval = exports.once = exports.throttle = exports.mixins = exports.delay = exports.cache = exports.debounce = exports.bind = void 0;
require("reflect-metadata");
const bind_1 = require("./lib/bind");
Object.defineProperty(exports, "bind", { enumerable: true, get: function () { return bind_1.bind; } });
const debounce_1 = require("./lib/debounce");
Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
const cache_1 = require("./lib/cache");
Object.defineProperty(exports, "cache", { enumerable: true, get: function () { return cache_1.cache; } });
const delay_1 = require("./lib/delay");
Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
const mixins_1 = require("./lib/mixins");
Object.defineProperty(exports, "mixins", { enumerable: true, get: function () { return mixins_1.mixins; } });
const throttle_1 = require("./lib/throttle");
Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
const interval_1 = require("./lib/interval");
Object.defineProperty(exports, "interval", { enumerable: true, get: function () { return interval_1.interval; } });
const once_1 = require("./lib/once");
Object.defineProperty(exports, "once", { enumerable: true, get: function () { return once_1.once; } });
const memoize_1 = require("./lib/memoize");
Object.defineProperty(exports, "memoize", { enumerable: true, get: function () { return memoize_1.memoize; } });
//# sourceMappingURL=index.js.map