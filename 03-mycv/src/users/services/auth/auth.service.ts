import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { encrypt, validateHash } from 'src/utilites/crypt';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
	constructor(private _usersService: UsersService){}

	async signUp(email: string, password: string) {
		//See if email is in use
		const user = await this._usersService.find(email);

		if(user.length > 0) throw new BadRequestException('Email in use');

		// Hash the users password
		password = await encrypt(password);

		// Create a new user
		const newUser = await this._usersService.create(email, password);

		// return the user
		return newUser;
	}

	async signIn(email: string, password: string) {
		const [ user ] = await this._usersService.find(email);

		if(!user) throw new NotFoundException('User Not Found');

		const validatePassword = await validateHash(user.password, password);

		if(!validatePassword) throw new BadRequestException('Wrong Password');

		return user;
	}
}

