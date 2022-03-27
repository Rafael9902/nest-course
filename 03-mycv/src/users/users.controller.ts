import { Controller, Post, Body, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private _userService: UsersService) { }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this._userService.find(email);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this._userService.findOne(parseInt(id));
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this._userService.create(body.email, body.password);
  }

  @Delete('/:id') 
  removeUser(@Param('id') id: string) {
    return this._userService.remove(parseInt(id));
  }
  


}
