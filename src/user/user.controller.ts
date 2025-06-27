import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/updatePut-user.dto';
import { UpdatePatchUserDto } from './dto/updatePatch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.UserService.create(data);
  }

  @Get()
  readAll() {
    return this.UserService.readAll();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.readOne(id);
  }

  @Put(':id')
  update(
    @Body() data: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.UserService.update(id, data);
  }

  @Patch(':id')
  updateParcial(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.UserService.updateParcial(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.delete(id);
  }
}
