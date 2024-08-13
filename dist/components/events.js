"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventComponent {
    constructor(name, once = false) {
        this._once = false;
        this._name = name;
        this._once = once;
    }
    get name() {
        return this._name;
    }
    get once() {
        return this._once;
    }
}
exports.default = EventComponent;
