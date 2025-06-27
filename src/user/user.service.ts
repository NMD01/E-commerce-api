import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UpdatePutUserDto } from './dto/updatePut-user.dto';
import { UpdatePatchUserDto } from './dto/updatePatch-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    await this.emailExist(data.email);
    return this.userRepository.save(data);
  }

  async readAll() {
    return await this.userRepository.find();
  }

  async readOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com o id: ${id} não encontrado!`);
    }
    return user;
  }

  async update(id: number, data: UpdatePutUserDto) {
    await this.userExist(id);
    await this.emailExist(data.email);
    return this.userRepository.update(id, data);
  }

  async updateParcial(id: number, data: UpdatePatchUserDto) {
    await this.userExist(id);
    if (data.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(`Email: ${data.email} já existe`);
      }
    }

    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    await this.userExist(id);

    return this.userRepository.delete(id);
  }

  async userExist(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com o id: ${id} não encontrado!`);
    }
  }

  async emailExist(email: string) {
    if (await this.userRepository.findOne({ where: { email } })) {
      throw new ConflictException(`Email: ${email} já existe`);
    }
  }
}
