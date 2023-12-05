"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptService = void 0;
const openai_1 = require("openai");
const common_1 = require("@nestjs/common");
const openai = new openai_1.default({
    apiKey: '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 '
});
let GptService = class GptService {
    async getDriverSummary(url) {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Please provide a consice summary of the main points from the following topic in the url ${url}. reply in 30 words or less. Dont include information such as birthday, nationality, and his profession.`
                }
            ],
            max_tokens: 50,
        });
        let message = response.choices[0].message.content;
        if (message.endsWith('.') === false) {
            message = message.split('.').splice(0, message.length - 1).join('.') + '.';
        }
        return message;
    }
};
exports.GptService = GptService;
exports.GptService = GptService = __decorate([
    (0, common_1.Injectable)()
], GptService);
//# sourceMappingURL=gpt.service.js.map