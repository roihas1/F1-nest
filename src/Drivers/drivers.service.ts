import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/ScrapeService/scrape.service';
import axios from 'axios';
import { GptService } from 'src/gptService/gpt.service';
const api_url = "http://ergast.com/api/f1/" 

@Injectable()
export class DriversService {
    constructor(private readonly puppeteerService: PuppeteerService,
        private readonly gptService:GptService) {}
    
    async getDriversByYear(year:number) : Promise<any>{
        const response = await axios.get(api_url+year.toString()+'/drivers.json');
        const extractDrivers = this.extractDriversDetails(response.data.MRData.DriverTable.Drivers);
        let drivers = await this.insertPosition(extractDrivers,year);
        drivers = drivers.sort((a,b) => a.position - b.position);
        drivers = await this.getDriversAbout(drivers);
        return drivers;
    }
    extractDriversDetails(drivers:Array<any>) {
        const driversDetails = [];
        for (const driver of drivers) {
            const {driverId ,url, givenName,familyName,dateOfBirth,nationality} = driver;
            driversDetails.push({
                driverId:driverId 
                ,url:url
                , givenName:givenName
                ,familyName:familyName
                ,dateOfBirth:dateOfBirth
                ,nationality:nationality
            })
        }
        return driversDetails;
    }
    async insertPosition(drivers:Array<any>,year:number){
        const positions = await this.getStandingsbyYear(year);
        for (const driver of drivers) {
            
            const info = positions.find(element => element.Driver.driverId === driver.driverId)
            if (info === undefined){
                driver.position = "N/A";
                continue;
            }
            driver.position = info.position;
            driver.points = info.points;
            driver.constructor = info.Constructors[0];
    
        }
        return drivers;
    
    }
    async getStandingsbyYear(year:number){
        const response = await axios.get(api_url+year.toString()+'/driverStandings.json?limit=1000');
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
    /////////// **************
    async getDriversAbout(drivers){
        
        const promises = drivers.map(async driver => {
            const about = await this.getDriverAbout(driver.url);
            driver.about = about;
            return driver;
        });
        const updatedDrivers = await Promise.all(promises);

        console.log(updatedDrivers);
        return drivers;
    }
    async getDriverAbout(url:string) : Promise<any>{
        
        return  await this.gptService.getDriverSummary(url);
        
    }
    async getAllDrivers() : Promise<any>{
        const response = await axios.get(api_url+'drivers.json?limit=1000');
        return response.data.MRData.DriverTable.Drivers;
    }
    async getRandomDrivers() : Promise<any>{
        const drivers = await this.getAllDrivers();
        const randomDrivers = this.chooseDrivers(drivers);
        const updatedDrivers = await this.getDriversAbout(randomDrivers);
        return updatedDrivers;
    }
    chooseDrivers(drivers:Array<any>):Array<any> {
        const randomDrivers = [];
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * drivers.length);
            const driver = drivers[random];
            drivers.splice(random, 1);
            randomDrivers.push(driver);
        }
        return randomDrivers;
    }
    async searchDriver(name:string) : Promise<any>{
        const drivers = await this.getAllDrivers();
        const searchDrivers = this.searchDriversByName(drivers,name);
        if (searchDrivers.length !== 0){
            const updatedDrivers = await this.getDriversAbout(searchDrivers);
            return updatedDrivers;
        }
        return searchDrivers;
    }
    searchDriversByName(drivers:Array<any>,name:string) {
        const searchDrivers = [];
        for (const driver of drivers) {
            if (driver.givenName.toLowerCase()===name.toLowerCase() || 
                driver.familyName.toLowerCase()===name.toLowerCase()||
                driver.driverId.toLowerCase()===name.toLowerCase()) {
                    searchDrivers.push(driver);
            }
        }
        return searchDrivers;
    }
    async getStandingsByYear(year:number) : Promise<any>{
        const response = await axios.get(api_url+year.toString()+'/driverStandings.json?limit=1000');
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }

    async getDriverPointsInfo(driverId:string) : Promise<any>{
        const response = await axios.get(api_url+'drivers/'+driverId+'/driverStandings.json?limit=1000');
        const driverStandings = response.data.MRData.StandingsTable.StandingsLists;
        let totalPoints = 0;
        let totalWins = 0;
        const standingPerYear={};
        for (const standing of driverStandings) {
            totalPoints += Number(standing.DriverStandings[0].points);
            totalWins += Number(standing.DriverStandings[0].wins);
            standingPerYear[standing.season] = {position:standing.DriverStandings[0].position,points:standing.DriverStandings[0].points,wins:standing.DriverStandings[0].wins};
        }
        return {totalPoints:totalPoints,totalWins:totalWins,standingPerYear:standingPerYear};

    }
}

