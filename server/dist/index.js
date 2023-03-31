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
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Leaderboard_1 = __importDefault(require("./schemas/Leaderboard"));
// Use .env configuration
dotenv.config();
// Setup server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield mongoose_1.default.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
});
connectDB();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Get leaderboard in ascending order
app.get('/leaderboard', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Leaderboard_1.default.find({}).sort({ turnCount: 1 });
    if (!data) {
        res.status(404).json({
            success: false,
        });
    }
    res.status(200).json({
        sucess: true,
        data,
    });
}));
// Create new leaderboard
app.post('/leaderboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Leaderboard_1.default.create({
        username: req.body.username,
        turnCount: req.body.turnCount,
    });
    if (!data) {
        res.status(404).json({
            success: false,
        });
    }
    res.status(200).json({
        success: true,
        data: req.body,
    });
}));
server.listen(process.env.PORT, () => {
    console.log(`Listening on: ${process.env.PORT}`);
});
