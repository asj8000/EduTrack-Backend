import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ContentType } from './content-type.entity';
import { ContentVersion } from './content-version.entity';

@ObjectType({ description: '콘텐츠 엔티티' })
@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: '콘텐츠의 고유 식별자' })
  id: string;

  @Column()
  @Field(() => String, { description: '콘텐츠 제목' })
  title: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true, description: '콘텐츠 설명' })
  description?: string;

  @ManyToOne(() => ContentType, (contentType) => contentType.contents)
  @Field(() => ContentType, { description: '콘텐츠의 타입' })
  contentType: ContentType;

  @OneToMany(() => ContentVersion, (version) => version.content)
  @Field(() => [ContentVersion], { description: '콘텐츠의 버전 목록' })
  versions: ContentVersion[];

  @CreateDateColumn()
  @Field(() => Date, { description: '생성 일시' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: '수정 일시' })
  updatedAt: Date;
} 