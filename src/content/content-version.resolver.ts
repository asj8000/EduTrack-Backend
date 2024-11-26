import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ContentVersion } from './entities/content-version.entity';
import { ContentVersionService } from './content-version.service';
import { CreateContentVersionInput } from './dto/create-content-version.input';

@Resolver(() => ContentVersion)
export class ContentVersionResolver {
  constructor(private readonly versionService: ContentVersionService) {}

  @Mutation(() => ContentVersion)
  createContentVersion(@Args('input') input: CreateContentVersionInput) {
    return this.versionService.create(input);
  }
} 