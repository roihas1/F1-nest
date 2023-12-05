export declare class CircuitsService {
    getRandomCircuits(): Promise<any>;
    getAllCircuits(): Promise<any[]>;
    chooseCircuits(circuits: Array<any>): Array<any>;
    extractCircuitsDetails(circuits: Array<any>): Array<any>;
}
