"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildsSchema = exports.GuildSchema = void 0;
const zod_1 = require("zod");
exports.GuildSchema = zod_1.z.object({
    guild_id: zod_1.z.string(),
    created_at: zod_1.z.string(),
});
exports.GuildsSchema = zod_1.z.array(exports.GuildSchema);
