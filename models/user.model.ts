import { Table, Model, Column, DataType } from 'sequelize-typescript';


@Table({ tableName: 'user' })
export class User extends Model {
    @Column
    email!: string;

    @Column
    firstName!: string;

    @Column
    lastName!: string;

    @Column({ allowNull: true })
    image!: string;

    @Column({
        type: DataType.BLOB,
        allowNull: true,
    })
    pdf!: Buffer;
};
