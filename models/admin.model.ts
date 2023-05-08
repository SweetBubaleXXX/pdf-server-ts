import { Optional } from 'sequelize';
import { Table, Model, Column, AllowNull, PrimaryKey, Unique, AutoIncrement, IsEmail } from 'sequelize-typescript';

export type AdminAttributes = {
  id: number,
  email: string,
  password: string,
};

export type AdminCreationAttributes = Optional<AdminAttributes, 'id'>;

export type AdminSigninAttributes = Pick<AdminAttributes, 'email' | 'password'>;

@Table({ timestamps: false })
export class Admin extends Model<AdminAttributes, AdminCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;
};
