import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) { }

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });

    return this.repository.save(user);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  find(email: string) {
    return this.repository.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new Error('User not found');

    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new Error('User not found');
     
    return this.repository.remove(user);
  }
}
