import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Country } from './Country';

@Table({
  tableName: 'users',
  timestamps: false
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false
  })
  user_id!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true
  })
  login!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  avatar!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  language!: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.SMALLINT,
    defaultValue: 184,
    allowNull: false
  })
  country_id!: number;

  @BelongsTo(() => Country)
  country!: Country;

  @Column({
    type: DataType.DECIMAL(3, 2),
    defaultValue: 0,
    allowNull: false
  })
  utc!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_active!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_root!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_admin!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_moderator!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_blocked!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_being_deleted!: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false
  })
  updated_at!: Date;
}
