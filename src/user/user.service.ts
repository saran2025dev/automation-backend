// user.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

async signup(createUserDto: CreateUserDto) {
  const { email, password, username, roleId } = createUserDto;

  const existingUser = await this.userRepo.findOne({ where: [{ email }, { username }] });
  if (existingUser) throw new BadRequestException('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = this.userRepo.create({
    email,
    username,
    password: hashedPassword,
    role: { id: roleId }, 
  });

  await this.userRepo.save(newUser);

  return { message: 'Signup successful' };
}

async login(loginDto: LoginUserDto) {
  const { email, password } = loginDto;

  const user = await this.userRepo.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestException('Invalid credentials');
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    message: 'Login successful',
    user: userWithoutPassword,
  };
}

}
