// Libraries
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ProjectsModule,
    // Angular App
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'webclient'),
      exclude: ['api/*', 'public/*'],
      serveRoot: '/',
    }),

    // Image share
    ServeStaticModule.forRoot({
      rootPath: join(process.env.COLD_FOLDER, '.thumbnails'),
      serveRoot: '/public',
    }),

    // Routes
    RouterModule.register([
      {
        path: 'api',
        children: [{ path: 'project', module: ProjectsModule }],
      },
    ]),
  ],
})
export class RoutingModule {}
