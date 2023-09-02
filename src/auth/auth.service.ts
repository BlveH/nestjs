import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
    siginIn(){
        return{msg:"Hello signin"};
    }

    signUp(){
        return{msg:"Hello signup"};

    }
}