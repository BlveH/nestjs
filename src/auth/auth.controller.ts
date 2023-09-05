import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    }

    @Post("signin")
    signIn(){
        return this.authService.siginIn();
    }
}