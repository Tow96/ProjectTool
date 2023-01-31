// Libraries
import { Controller, Param, Post, Req } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { LogIdRequest } from '@shared/logger';
// Services
import ArchiveService from './archive.service';

@Controller('api/archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}
  private parseId(id: string): number {
    const output = parseInt(id);
    if (isNaN(output)) throw new HttpException(`Invalid id`, HttpStatus.UNPROCESSABLE_ENTITY);

    return output;
  }

  @Post('/in/:id')
  async archiveProject(@Req() req: LogIdRequest, @Param('id') id: string) {
    const parsedId = this.parseId(id);
    const result = await this.archiveService.archiveProject(req['x-log-id'], parsedId);

    return { message: result };
  }

  @Post('/out/:id')
  async unarchiveProject(@Req() req: LogIdRequest, @Param('id') id: string) {
    const parsedId = this.parseId(id);
    const result = await this.archiveService.unarchiveProject(req['x-log-id'], parsedId);

    return { message: result };
  }
}
