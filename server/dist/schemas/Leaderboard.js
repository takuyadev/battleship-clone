"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LeaderboardSchema = new mongoose_1.Schema({
    turnCount: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Leaderboard', LeaderboardSchema);
