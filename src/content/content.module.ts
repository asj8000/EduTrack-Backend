import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentType } from './entities/content-type.entity';
import { Content } from './entities/content.entity';
import { ContentVersion } from './entities/content-version.entity';
import { ContentTypeResolver } from './content-type.resolver';
import { ContentResolver } from './content.resolver';
import { ContentVersionResolver } from './content-version.resolver';
import { ContentTypeService } from './content-type.service';
import { ContentService } from './content.service';
import { ContentVersionService } from './content-version.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentType, Content, ContentVersion])],
  providers: [
    ContentTypeResolver,
    ContentResolver,
    ContentVersionResolver,
    ContentTypeService,
    ContentService,
    ContentVersionService,
  ],
})
export class ContentModule {} 