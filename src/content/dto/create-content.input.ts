import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateContentInput {
  @Field(() => String, { description: '콘텐츠 제목' })
  title: string;

  @Field(() => String, { nullable: true, description: '콘텐츠 설명' })
  description?: string;

  @Field(() => ID, { description: '콘텐츠 타입 ID' })
  contentTypeId: string;

  @Field(() => String, { description: '콘텐츠 데이터 (JSON)' })
  data: string;
} 