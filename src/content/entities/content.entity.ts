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

@Entity()
@ObjectType()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  description?: string;

  @ManyToOne(() => ContentType, (contentType) => contentType.contents)
  @Field(() => ContentType)
  contentType: ContentType;

  @OneToMany('ContentVersion', 'content')
  @Field(() => ['ContentVersion'])
  versions: Promise<any[]>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
} 