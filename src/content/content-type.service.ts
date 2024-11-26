import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from './entities/content-type.entity';
import { CreateContentTypeInput } from './dto/create-content-type.input';

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectRepository(ContentType)
    private readonly contentTypeRepository: Repository<ContentType>,
  ) {}

  async create(input: CreateContentTypeInput): Promise<ContentType> {
    const contentType = this.contentTypeRepository.create(input);
    return this.contentTypeRepository.save(contentType);
  }

  async findAll(): Promise<ContentType[]> {
    return this.contentTypeRepository.find();
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
} 