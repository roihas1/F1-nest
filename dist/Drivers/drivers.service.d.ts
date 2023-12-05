import { PuppeteerService } from 'src/ScrapeService/scrape.service';
import { GptService } from 'src/gptService/gpt.service';
export declare class DriversService {
    private readonly puppeteerService;
    private readonly gptService;
    constructor(puppeteerService: PuppeteerService, gptService: GptService);
    getDriversByYear(year: number): Promise<any>;
    extractDriversDetails(drivers: Array<any>): any[];
    insertPosition(drivers: Array<any>, year: number): Promise<any[]>;
    getStandingsbyYear(year: number): Promise<any>;
    getDriversAbout(drivers: any): Promise<any>;
    getDriverAbout(url: string): Promise<any>;
    getAllDrivers(): Promise<any>;
    getRandomDrivers(): Promise<any>;
    chooseDrivers(drivers: Array<any>): Array<any>;
    searchDriver(name: string): Promise<any>;
    searchDriversByName(drivers: Array<any>, name: string): any[];
    getStandingsByYear(year: number): Promise<any>;
    getDriverPointsInfo(driverId: string): Promise<any>;
}
