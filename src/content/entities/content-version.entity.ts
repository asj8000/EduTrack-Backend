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

@Entity()
@ObjectType()
export class ContentVersion {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Content, (content) => content.versions)
  @Field(() => Content)
  content: Content;

  @Column()
  @Field()
  version: string;

  @Column('json')
  @Field(() => String)
  data: string;

  @Column({ default: false })
  @Field()
  isLatest: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
} 