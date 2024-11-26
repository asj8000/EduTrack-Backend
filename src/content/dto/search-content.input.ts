import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchContentInput {
  @Field(() => String, { nullable: true, description: '검색 키워드' })
  keyword?: string;

  @Field(() => String, { nullable: true, description: '콘텐츠 타입 ID' })
  contentTypeId?: string;

  @Field(() => Date, { nullable: true, description: '검색 시작 날짜' })
  startDate?: Date;

  @Field(() => Date, { nullable: true, description: '검색 종료 날짜' })
  endDate?: Date;
} 