import { Controller, Post, Body, Get, Patch, Param, Query, Delete, NotFoundException, Session} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './services/auth/auth.service';
//DTOS
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private _userService: UsersService, private _authService: AuthService) { }

	@Get('whoami')
	whoAmI(@CurrentUser() user: User){
		return 
	}

  @Get()
  findAllUsers(@Query('email') email: string) { 
    return this._userService.find(email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this._userService.findOne(parseInt(id));
		if(!user) throw new NotFoundException('user not found');

		return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
		const user = await this._authService.signUp(body.email, body.password);
		session.userId = user.id;

		return user;
  }

	@Post('signOut')
	signOut(@Session() session: any) {
		session.userId = undefined;
	}

	@Post('signIn')
	async signIn(@Body() body: CreateUserDto, @Session() session: any) {
		const user = await this._authService.signIn(body.email, body.password);
		session.userId = user.id;
		
		return user;
	}

  @Delete('/:id') 
  removeUser(@Param('id') id: string) {
    return this._userService.remove(parseInt(id));
  }

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this._userService.update(parseInt(id), body);
	}
  


}
