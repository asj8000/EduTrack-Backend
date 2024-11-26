import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Content } from './content.entity';

@ObjectType({ description: '콘텐츠 버전 엔티티' })
@Entity()
export class ContentVersion {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: '버전의 고유 식별자' })
  id: string;

  @ManyToOne(() => Content, (content) => content.versions)
  @Field(() => Content, { description: '연관된 콘텐츠' })
  content: Content;

  @Column()
  @Field(() => String, { description: '버전 문자열 (예: 1.0.0)' })
  version: string;

  @Column('json')
  @Field(() => String, { description: '버전의 실제 데이터 (JSON)' })
  data: string;

  @Column({ default: false })
  @Field(() => Boolean, { description: '최신 버전 여부' })
  isLatest: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: '생성 일시' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: '수정 일시' })
  updatedAt: Date;
} 