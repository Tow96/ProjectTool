// Libraries
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ProjectsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['api/*'],
    }),
    RouterModule.register([
      {
        path: 'api',
        children: [{ path: 'project', module: ProjectsModule }],
      },
    ]),
  ],
})
export class RoutingModule {}
