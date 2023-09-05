import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { getUser } from './../auth/decorator/getUser.decorator';
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller("user")
export class UserController{
    @Get("me")
    getUserInfor(@getUser() user: User){
        return user
    }
}