import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateContentInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  contentTypeId: string;

  @Field()
  data: string;
} 