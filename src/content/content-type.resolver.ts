import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ContentType } from './entities/content-type.entity';
import { ContentTypeService } from './content-type.service';
import { CreateContentTypeInput } from './dto/create-content-type.input';
import { UpdateContentTypeInput } from './dto/update-content-type.input';
import { PaginationInput } from './dto/pagination.input';

@Resolver(() => ContentType)
export class ContentTypeResolver {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Mutation(() => ContentType)
  createContentType(@Args('input') input: CreateContentTypeInput) {
    return this.contentTypeService.create(input);
  }

  @Query(() => [ContentType])
  contentTypes(@Args('pagination') pagination: PaginationInput) {
    return this.contentTypeService.findAll(pagination);
  }

  @Query(() => ContentType)
  contentType(@Args('id', { type: () => ID }) id: string) {
    return this.contentTypeService.findOne(id);
  }

  @Mutation(() => ContentType)
  updateContentType(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateContentTypeInput,
  ) {
    return this.contentTypeService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteContentType(@Args('id', { type: () => ID }) id: string) {
    return this.contentTypeService.delete(id);
  }
} 