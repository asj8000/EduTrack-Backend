import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateContentVersionInput {
  @Field(() => ID)
  contentId: string;

  @Field()
  version: string;

  @Field()
  data: string;
} 