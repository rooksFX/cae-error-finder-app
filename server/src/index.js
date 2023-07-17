"use strict";
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
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = (0, express_1.default)();
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)('https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json');
    const data = yield response.json();
    return data;
});
app.get('/', (req, res) => {
    const data = fetchData();
    res.send(data);
    res.send('Hi World!');
});
app.listen(5000);
