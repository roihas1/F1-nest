"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const api_url = "http://ergast.com/api/f1/";
let CircuitsService = class CircuitsService {
    async getRandomCircuits() {
        const circuits = await this.getAllCircuits();
        const randomCircuits = this.chooseCircuits(circuits);
        return randomCircuits;
    }
    async getAllCircuits() {
        const response = await axios_1.default.get(api_url + 'circuits.json?limit=1000');
        const circuits = this.extractCircuitsDetails(response.data.MRData.CircuitTable.Circuits);
        return circuits;
    }
    chooseCircuits(circuits) {
        const randomCircuits = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * circuits.length);
            randomCircuits.push(circuits[randomIndex]);
            circuits.splice(randomIndex, 1);
        }
        return randomCircuits;
    }
    extractCircuitsDetails(circuits) {
        const circuits_details = [];
        for (const circuit of circuits) {
            const { circuitId, url, circuitName, Location } = circuit;
            circuits_details.push({
                circuitId: circuitId,
                url: url,
                circuitName: circuitName,
                city: Location.locality,
                country: Location.country
            });
        }
        return circuits_details;
    }
};
exports.CircuitsService = CircuitsService;
exports.CircuitsService = CircuitsService = __decorate([
    (0, common_1.Injectable)()
], CircuitsService);
//# sourceMappingURL=circuits.service.js.map