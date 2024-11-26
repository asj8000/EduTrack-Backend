import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Content } from './content.entity';

@ObjectType({ description: '콘텐츠 타입을 정의하는 엔티티' })
@Entity()
export class ContentType {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: '콘텐츠 타입의 고유 식별자' })
  id: string;

  @Column()
  @Field(() => String, { description: '콘텐츠 타입의 이름' })
  name: string;

  @Column('json')
  @Field(() => String, { description: '콘텐츠의 구조를 정의하는 JSON 스키마' })
  schema: string;

  @OneToMany(() => Content, (content) => content.contentType)
  @Field(() => [Content], { description: '이 타입으로 생성된 콘텐츠 목록' })
  contents: Content[];

  @CreateDateColumn()
  @Field(() => Date, { description: '생성 일시' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: '수정 일시' })
  updatedAt: Date;
} 