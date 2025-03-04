import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'country',
  timestamps: false
})
export class Country extends Model<Country> {
  @Column({
    type: DataType.SMALLINT,
    primaryKey: true,
    allowNull: false
  })
  country_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  commo_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  formal_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  type!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  sub_type!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  sovereignty!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  capital!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  iso_4217_currency_code!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  iso_4217_currency_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  itu_t_telephone_code!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  iso_3166_1_2_letter_code!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  iso_3166_1_3_letter_code!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  iso_3166_1_number!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  iana_country_code_tld!: string;
}
