import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(private _powerService: PowerService){}
    
    public getData(){
        console.log("Drawing 20 watts of power from power service");
        this._powerService.supplyPower(20);

        return "data!";
    }
}
