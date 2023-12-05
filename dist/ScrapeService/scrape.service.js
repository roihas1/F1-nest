"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_1 = require("puppeteer");
let PuppeteerService = class PuppeteerService {
    async runPuppeteer(url) {
        const browser = await puppeteer_1.default.launch({ headless: false, });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        console.log("from scrape " + url);
        await page.waitForSelector('#mw-content-text > div.mw-parser-output > p:first-of-type');
        const p = await page.$eval('#mw-content-text > div.mw-parser-output > p:first-of-type', el => el.textContent);
        await browser.close();
        console.log("from scrape" + p);
        return p;
    }
};
exports.PuppeteerService = PuppeteerService;
exports.PuppeteerService = PuppeteerService = __decorate([
    (0, common_1.Injectable)()
], PuppeteerService);
//# sourceMappingURL=scrape.service.js.map