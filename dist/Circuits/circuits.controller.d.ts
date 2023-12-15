import { CircuitsService } from './circuits.service';
export declare class CircuitsController {
    private readonly circuitsService;
    constructor(circuitsService: CircuitsService);
    getRandomCircuits(): Promise<any>;
}
