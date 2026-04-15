import { DataTypes, QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    const table = await queryInterface.describeTable('hotels');

    if (!table.deleted_at) {
      await queryInterface.addColumn('hotels', 'deleted_at', {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      });
    }
  },

  async down(queryInterface: QueryInterface) {
    const table = await queryInterface.describeTable('hotels');

    if (table.deleted_at) {
      await queryInterface.removeColumn('hotels', 'deleted_at');
    }
  },
};
