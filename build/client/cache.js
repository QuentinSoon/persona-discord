"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Alert_class_1 = __importDefault(require("../classes/alert/Alert.class"));
const Guild_class_1 = __importDefault(require("../classes/guild/Guild.class"));
class Cache {
    constructor(client) {
        this.client = client;
        this.guild = new Guild_class_1.default(client);
        this.alert = new Alert_class_1.default(client);
    }
}
exports.default = Cache;
