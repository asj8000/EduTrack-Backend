import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateContentTypeInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  schema?: string;
} 