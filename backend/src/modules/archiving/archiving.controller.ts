import { LogIdRequest } from '@app/winston';
import { Controller, Param, Post, Req } from '@nestjs/common';
import { ArchivingService } from './archiving.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('api/archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchivingService) {}

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
