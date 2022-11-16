import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
    constructor(
        private _cpuService: CpuService,
        private _diskService: DiskService
    ) {}

    @Get()
    public run() {
        return [
            this._cpuService.compute(1, 2),
            this._diskService.getData()
        ]
    }
}
