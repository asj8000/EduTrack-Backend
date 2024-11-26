import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentTypeInput {
  @Field()
  name: string;

  @Field()
  schema: string;
} 