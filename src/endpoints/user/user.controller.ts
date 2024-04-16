import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userWithDtoCreate, userWithDtoUpdate } from './userWithDto';
import { loginWithDto } from './loginWithDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(ValidationPipe)
  @Post('register')
  create(@Body() user: userWithDtoCreate) {
    return this.userService.create(user);
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() userData: loginWithDto, @Res({ passthrough: true }) res) {
    console.log(res);
    return this.userService.login(userData, res);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedUserData: userWithDtoUpdate) {
    return this.userService.update(id, updatedUserData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
