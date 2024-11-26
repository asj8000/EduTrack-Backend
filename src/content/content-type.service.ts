import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from './entities/content-type.entity';
import { CreateContentTypeInput } from './dto/create-content-type.input';
import { UpdateContentTypeInput } from './dto/update-content-type.input';
import { PaginationInput } from './dto/pagination.input';

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectRepository(ContentType)
    private readonly contentTypeRepository: Repository<ContentType>,
  ) {}

  async create(input: CreateContentTypeInput): Promise<ContentType> {
    await this.validateSchema(input.schema);
    const contentType = this.contentTypeRepository.create(input);
    return this.contentTypeRepository.save(contentType);
  }

  async findAll(pagination: PaginationInput): Promise<[ContentType[], number]> {
    const [items, total] = await this.contentTypeRepository.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      relations: ['contents'],
    });
    return [items, total];
  }

  async findOne(id: string): Promise<ContentType> {
    const contentType = await this.contentTypeRepository.findOne({
      where: { id },
      relations: ['contents'],
    });
    if (!contentType) {
      throw new NotFoundException(`ContentType with ID ${id} not found`);
    }
    return contentType;
  }

  async update(id: string, input: UpdateContentTypeInput): Promise<ContentType> {
    const contentType = await this.findOne(id);
    if (input.schema) {
      await this.validateSchema(input.schema);
    }
    Object.assign(contentType, input);
    return this.contentTypeRepository.save(contentType);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.contentTypeRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  private async validateSchema(schema: string): Promise<void> {
    try {
      const parsedSchema = JSON.parse(schema);
      // 여기에 스키마 유효성 검사 로직 추가
      if (!parsedSchema.type || !parsedSchema.properties) {
        throw new Error('Invalid schema structure');
      }
    } catch (error) {
      throw new BadRequestException('Invalid JSON schema');
    }
  }
} 