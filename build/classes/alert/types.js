"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsSchema = exports.AlertSchema = void 0;
const zod_1 = require("zod");
exports.AlertSchema = zod_1.z.object({
    id: zod_1.z.number(),
    guild_id: zod_1.z.string(),
    login_id: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    channel_id: zod_1.z.string().nullable(),
});
exports.AlertsSchema = zod_1.z.array(exports.AlertSchema);
