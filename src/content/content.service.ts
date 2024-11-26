import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { ContentVersion } from './entities/content-version.entity';
import { CreateContentInput } from './dto/create-content.input';
import { ContentTypeService } from './content-type.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(ContentVersion)
    private readonly versionRepository: Repository<ContentVersion>,
    private readonly contentTypeService: ContentTypeService,
  ) {}

  async create(input: CreateContentInput): Promise<Content> {
    const contentType = await this.contentTypeService.findOne(input.contentTypeId);
    
    const content = this.contentRepository.create({
      title: input.title,
      description: input.description,
      contentType,
    });
    
    const savedContent = await this.contentRepository.save(content);

    // 첫 버전 생성
    const version = this.versionRepository.create({
      content: savedContent,
      version: '1.0.0',
      data: input.data,
      isLatest: true,
    });
    await this.versionRepository.save(version);

    return savedContent;
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      relations: ['contentType', 'versions'],
    });
  }

  async findOne(id: string): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ['contentType', 'versions'],
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }
} 