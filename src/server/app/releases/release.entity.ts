import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ExternalSource } from '../externalSources/externalSource.entity';
import { Song } from '../songs/song.entity';

@ObjectType()
@Entity()
export class Release {
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
  @Column({ nullable: true })
  releaseDate: Date;

  @Field()
  @Column({ nullable: true })
  label: string;

  @Field()
  @OneToMany((_type) => Song, (song) => song.release)
  songs?: Song[];

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
