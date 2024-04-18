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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userWithDtoCreate, userWithDtoUpdate } from './userWithDto';
import { loginWithDto } from './loginWithDto';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('useProfiles')
  getUserProfile(@Req() request) {
    console.log(request);
    const user = request.user;
    const userData = this.userService.getUserProfile(user);
    console.log(userData);
    return this.userService.getUserProfile(user);
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

  // @UseGuards(AuthGuard)
  // @Post('logout')
  // async logout(@Req() req){
  //   req.lo
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
