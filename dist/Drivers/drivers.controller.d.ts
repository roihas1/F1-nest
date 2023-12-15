import { DriversService } from './drivers.service';
import { PuppeteerService } from '../ScrapeService/scrape.service';
export declare class DriversController {
    private readonly driversService;
    private readonly puppeteerService;
    constructor(driversService: DriversService, puppeteerService: PuppeteerService);
    getDriversByYear(year: number): Promise<any>;
    getAllDrivers(): Promise<any>;
    getRandomDrivers(): Promise<any>;
    searchDriver(name: string): Promise<any>;
    getStandingsByYear(year: number): Promise<any>;
    getDriverInfo(driverId: string): Promise<any>;
}
