import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ default: 'EUR' })
  baseCurrency: string;

  //TODO relation avec la table coin
  // @Column({ default: [] })
  // coin: Array<string>;

  @Column({ default: [] })
  keywords: Array<string>;
}
