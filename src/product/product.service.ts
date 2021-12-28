import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Categories, MainCategories, SubCategories } from './constants';
import { ProductDto } from './dto';
import { Product, ProductDocument } from './schemas';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModal: Model<ProductDocument>,
  ) {}

  async getAllProducts() {
    const allProducts = await this.productModal.find({});
    return allProducts;
  }

  async getMainCategory(mainCategory: MainCategories) {
    const products = await this.productModal.find({ mainCategory });
    return products;
  }

  async getCategory(mainCategory: MainCategories, category: Categories) {
    const products = await this.productModal.find({ mainCategory, category });
    return products;
  }

  async getProductDetail(productId: string) {
    const product = await this.productModal.findById({ _id: productId });
    return product;
  }

  async getSubCategory(
    mainCategory: MainCategories,
    category: Categories,
    subCategory: SubCategories,
  ) {
    const subCategoryProducts = await this.productModal.find({
      mainCategory,
      category,
      subCategory,
    });

    return subCategoryProducts;
  }

  async getSimilarProduct(
    mainCategory: MainCategories,
    category: Categories,
    subCategory: SubCategories,
  ) {
    const similarProducts = await this.productModal
      .find({
        mainCategory,
        category,
        subCategory,
      })
      .limit(30);

    return similarProducts;
  }

  async createProduct(product: ProductDto) {
    const createdProduct = await this.productModal.create(product);
    return createdProduct;
  }
}
