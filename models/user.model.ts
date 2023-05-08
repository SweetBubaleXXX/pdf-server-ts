import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, AllowNull, PrimaryKey, Unique, AutoIncrement, IsEmail } from 'sequelize-typescript';

export type UserAttributes = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  image: string | null,
  pdf: Buffer | null,
};

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'image' | 'pdf'>;

export type UserUpdateAttributes = Optional<UserAttributes, keyof Omit<UserAttributes, 'id'>>;

export type UserPdfExportAttributes = Optional<Pick<UserAttributes, 'firstName' | 'lastName' | 'image'>, 'image'>

@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  firstName!: string;

  @AllowNull(false)
  @Column
  lastName!: string;

  @Column(DataType.TEXT)
  image?: string | null;

  @Column(DataType.BLOB)
  pdf?: Buffer | null;
};
