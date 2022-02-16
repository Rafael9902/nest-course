import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this._userService.create(body.email, body.password);
    console.log(body);
  }
}
