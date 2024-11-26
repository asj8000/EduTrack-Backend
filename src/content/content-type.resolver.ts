import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ContentType } from './entities/content-type.entity';
import { ContentTypeService } from './content-type.service';
import { CreateContentTypeInput } from './dto/create-content-type.input';

@Resolver(() => ContentType)
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Mutation(() => ContentType)
  createContentType(@Args('input') input: CreateContentTypeInput) {
    return this.contentTypeService.create(input);
  }

  @Query(() => [ContentType])
  contentTypes() {
    return this.contentTypeService.findAll();
  }

  @Query(() => ContentType)
  contentType(@Args('id', { type: () => ID }) id: string) {
    return this.contentTypeService.findOne(id);
  }
} 