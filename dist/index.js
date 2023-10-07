"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 45000;
const app = (0, express_1.default)();
app.use('/api', (req, res) => {
    res.status(200).json({
        name: 'RESTful API for natal charts search and create',
        version: '1.0.0',
        running: true,
        paths: ['/api/users', '/api/charts', '/api/users/login'],
    });
});
app.listen(PORT, () => {
    console.log("SERVER LISTENING ON PORT: ", PORT);
});
