import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentVersion } from './entities/content-version.entity';
import { CreateContentVersionInput } from './dto/create-content-version.input';
import { ContentService } from './content.service';

@Injectable()
export class ContentVersionService {
  constructor(
    @InjectRepository(ContentVersion)
    private readonly versionRepository: Repository<ContentVersion>,
    private readonly contentService: ContentService,
  ) {}

  async create(input: CreateContentVersionInput): Promise<ContentVersion> {
    const content = await this.contentService.findOne(input.contentId);
    
    // 기존 최신 버전 업데이트
    await this.versionRepository.update(
      { content: { id: content.id }, isLatest: true },
      { isLatest: false },
    );

    // 새 버전 생성
    const version = this.versionRepository.create({
      content,
      version: input.version,
      data: input.data,
      isLatest: true,
    });

    return this.versionRepository.save(version);
  }
} 