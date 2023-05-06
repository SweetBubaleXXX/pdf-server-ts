import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, AllowNull, PrimaryKey, Unique, AutoIncrement } from 'sequelize-typescript';

export type UserAttributes = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    image: string,
    pdf: Buffer,
};

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'image' | 'pdf'>;

export type UserUpdateAttributes = Optional<UserAttributes, keyof Omit<UserAttributes, 'id'>>;

@Table({ tableName: 'user' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Unique
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    firstName!: string;

    @AllowNull(false)
    @Column
    lastName!: string;

    @Column
    image!: string;

    @Column(DataType.BLOB)
    pdf!: Buffer;
};
