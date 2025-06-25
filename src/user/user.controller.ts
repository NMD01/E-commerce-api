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

@Controller('users')
export class UserController {
  @Post()
  create(@Body() { name, email, password }: CreateUserDto) {
    return { name, email, password };
  }

  @Get()
  readAll() {
    return { users: [] };
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Put(':id')
  update(
    @Body() { name, email, password }: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { name, email, password, id };
  }

  @Patch(':id')
  updateParcial(
    @Body() { name, email, password }: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { name, email, password, id };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
