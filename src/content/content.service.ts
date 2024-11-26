import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Content } from './entities/content.entity';
import { ContentVersion } from './entities/content-version.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { SearchContentInput } from './dto/search-content.input';
import { PaginationInput } from './dto/pagination.input';
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
    await this.validateContent(contentType.schema, input.data);
    
    const content = this.contentRepository.create({
      title: input.title,
      description: input.description,
      contentType,
    });
    
    const savedContent = await this.contentRepository.save(content);

    const version = this.versionRepository.create({
      content: savedContent,
      version: '1.0.0',
      data: input.data,
      isLatest: true,
    });
    await this.versionRepository.save(version);

    return savedContent;
  }

  async findAll(
    pagination: PaginationInput,
    search?: SearchContentInput,
  ): Promise<[Content[], number]> {
    const query = this.contentRepository.createQueryBuilder('content')
      .leftJoinAndSelect('content.contentType', 'contentType')
      .leftJoinAndSelect('content.versions', 'versions');

    if (search) {
      if (search.keyword) {
        query.andWhere('(content.title LIKE :keyword OR content.description LIKE :keyword)', 
          { keyword: `%${search.keyword}%` });
      }
      if (search.contentTypeId) {
        query.andWhere('content.contentTypeId = :contentTypeId', 
          { contentTypeId: search.contentTypeId });
      }
      if (search.startDate && search.endDate) {
        query.andWhere('content.createdAt BETWEEN :startDate AND :endDate', 
          { startDate: search.startDate, endDate: search.endDate });
      }
    }

    query.skip((pagination.page - 1) * pagination.limit)
         .take(pagination.limit);

    return await query.getManyAndCount();
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

  async update(id: string, input: UpdateContentInput): Promise<Content> {
    const content = await this.findOne(id);
    
    if (input.data) {
      await this.validateContent(content.contentType.schema, input.data);
      
      // Create new version
      await this.versionRepository.update(
        { content: { id }, isLatest: true },
        { isLatest: false }
      );

      const lastVersion = await this.versionRepository.findOne({
        where: { content: { id } },
        order: { version: 'DESC' }
      });

      const version = this.versionRepository.create({
        content,
        version: lastVersion ? this.incrementVersion(lastVersion.version) : '1.0.0',
        data: input.data,
        isLatest: true,
      });
      await this.versionRepository.save(version);
    }

    Object.assign(content, {
      title: input.title,
      description: input.description,
    });

    return this.contentRepository.save(content);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.contentRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  private async validateContent(schema: string, data: string): Promise<void> {
    try {
      const parsedSchema = JSON.parse(schema);
      const parsedData = JSON.parse(data);
      // 여기에 데이터 유효성 검사 로직 추가
      // JSON Schema validation 라이브러리 사용 권장
    } catch (error) {
      throw new BadRequestException('Invalid content data');
    }
  }

  private incrementVersion(version: string): string {
    const [major, minor, patch] = version.split('.').map(Number);
    return `${major}.${minor}.${patch + 1}`;
  }
} 