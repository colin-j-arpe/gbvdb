import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableForeignKey,
  UpdateDateColumn,
} from 'typeorm';
import { ExternalSource } from '../externalSources/externalSource.entity';
import { Release } from '../releases/release.entity';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@ObjectType()
@Entity()
export class Song {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ nullable: false })
  artist: string;

  @Field()
  @ManyToOne((_type) => Release, (release) => release.songs)
  release: Release;

  @Field()
  @OneToOne((_type) => ExternalSource, {
    nullable: false,
  })
  @JoinColumn()
  externalSource: ExternalSource;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
