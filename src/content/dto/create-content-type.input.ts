import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentTypeInput {
  @Field(() => String, { description: '콘텐츠 타입의 이름' })
  name: string;

  @Field(() => String, { description: '콘텐츠 타입의 JSON 스키마' })
  schema: string;
} 