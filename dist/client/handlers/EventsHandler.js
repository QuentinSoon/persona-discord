"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const events_1 = __importDefault(require("../../components/events"));
const files_1 = require("../../utils/files");
class EventsHandler {
    constructor(client) {
        this.client = client;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield (0, files_1.loadFiles)('../../events/');
                for (const file of files) {
                    const { default: Event } = yield Promise.resolve(`${path_1.default.join(file)}`).then(s => __importStar(require(s)));
                    console.log(`Imported Event from file ${file}:`, Event);
                    if (typeof Event !== 'function') {
                        console.error(`Failed to load event from file ${file}: Not a constructor`);
                        continue;
                    }
                    const event = new Event();
                    if (event instanceof events_1.default) {
                        if (event.once) {
                            this.client.once(event.name, event.execute.bind(event, this.client));
                        }
                        else {
                            this.client.on(event.name, event.execute.bind(event, this.client));
                        }
                        console.log(`Loaded event ${event.name}`);
                    }
                    else {
                        console.error(`Event from file ${file} is not an instance of DiscordEvent`);
                    }
                }
            }
            catch (err) {
                console.error(`Error loading events: ${err}`);
            }
        });
    }
}
exports.default = EventsHandler;
