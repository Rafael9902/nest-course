import { Controller, Get } from "@nestjs/common";

@Controller('/app')
export class AppController {
    
    @Get("greeting")
    public greeting(): string {
        return "Hello There";
    }
}