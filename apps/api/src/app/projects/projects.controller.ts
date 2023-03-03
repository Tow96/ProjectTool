import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller()
export class ProjectsController {
  @Get('a')
  @ApiOperation({ summary: 'This is a test route' })
  testA() {
    return 'a';
  }
  @Get('c')
  @ApiOperation({ summary: 'This is another test route' })
  testB() {
    return 'b';
  }
}
