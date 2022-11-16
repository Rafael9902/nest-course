import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //create repositories with typeorm
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
