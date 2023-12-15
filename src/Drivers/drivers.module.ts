import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { PuppeteerService } from 'src/ScrapeService/scrape.service';
import { GptService } from 'src/gptService/gpt.service';

@Module({
    controllers: [DriversController],
    providers: [DriversService,PuppeteerService,GptService]
})
export class DriversModule {}