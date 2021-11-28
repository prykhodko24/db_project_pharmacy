import mongoose from 'mongoose';

import { DataTypes } from 'sequelize';

const itemModel = (sequelize) => {
  sequelize.define(
    'item',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          is: /^\w{3,}$/,
        },
        unique: true,
      },
      imagePath: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      countInStock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      numReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'items',
    }
  );

  sequelize.define(
    'review',
    {
      // The following specification of the 'id' attribute could be omitted
      // since it is the default.
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING,
      },
      itemId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'reviews',
    }
  );

  sequelize.models.item.hasMany(sequelize.models.item.review, {
    foreignKey: 'itemId',
    constraints: false,
    scope: {
      commentable: 'review',
    },
  });
  sequelize.models.item.review.belongsTo(sequelize.models.item, {
    foreignKey: 'itemId',
    constraints: false,
    as: 'review',
  });
};

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});

const productModel = mongoose.model('Product', prodctSchema);

export { productModel, itemModel };
