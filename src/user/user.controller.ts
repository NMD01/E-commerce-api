import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  create(@Body() body: string) {
    return { body };
  }

  @Get()
  readAll() {
    return { users: [] };
  }

  @Get(':id')
  readOne(@Param() param: string) {
    return { param };
  }

  @Put(':id')
  update(@Body() body: string, @Param() param: string) {
    return { body, param };
  }

  @Patch(':id')
  updateParcial(@Body() body: string, @Param() param: string) {
    return { body, param };
  }

  @Delete(':id')
  delete(@Param() param: string) {
    return {
      param,
    };
  }
}
