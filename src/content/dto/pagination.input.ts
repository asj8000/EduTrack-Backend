import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { description: '페이지 번호', defaultValue: 1 })
  page: number = 1;

  @Field(() => Int, { description: '페이지당 항목 수', defaultValue: 10 })
  limit: number = 10;
} 