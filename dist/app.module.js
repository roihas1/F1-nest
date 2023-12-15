"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const drivers_module_1 = require("./Drivers/drivers.module");
const circuits_module_1 = require("./Circuits/circuits.module");
const typeorm_1 = require("@nestjs/typeorm");
const scrape_service_1 = require("./ScrapeService/scrape.service");
const gpt_service_1 = require("./gptService/gpt.service");
const users_module_1 = require("./Users/users.module");
const user_entity_1 = require("./Entities/user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [drivers_module_1.DriversModule, circuits_module_1.CircuitsModule, users_module_1.UsersModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'rHas9697!',
                database: 'f1db',
                entities: [user_entity_1.User],
                synchronize: true,
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, scrape_service_1.PuppeteerService, gpt_service_1.GptService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map