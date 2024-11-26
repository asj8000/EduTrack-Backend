import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content)
  createContent(@Args('input') input: CreateContentInput) {
    return this.contentService.create(input);
  }

  @Query(() => [Content])
  contents() {
    return this.contentService.findAll();
  }

  @Query(() => Content)
  content(@Args('id', { type: () => ID }) id: string) {
    return this.contentService.findOne(id);
  }
} 