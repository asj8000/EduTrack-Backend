import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { SearchContentInput } from './dto/search-content.input';
import { PaginationInput } from './dto/pagination.input';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content)
  createContent(@Args('input') input: CreateContentInput) {
    return this.contentService.create(input);
  }

  @Query(() => [Content])
  contents(
    @Args('pagination') pagination: PaginationInput,
    @Args('search', { nullable: true }) search?: SearchContentInput,
  ) {
    return this.contentService.findAll(pagination, search);
  }

  @Query(() => Content)
  content(@Args('id', { type: () => ID }) id: string) {
    return this.contentService.findOne(id);
  }

  @Mutation(() => Content)
  updateContent(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateContentInput,
  ) {
    return this.contentService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteContent(@Args('id', { type: () => ID }) id: string) {
    return this.contentService.delete(id);
  }
} 