import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Categories, MainCategories, SubCategories } from './constants';
import { ProductDto, FilterDto } from './dto';
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
    const [products, similarProducts] = await Promise.all([
      this.productModal.find({ mainCategory }),
      this.productModal.find({ mainCategory }).limit(30),
    ]);
    return { products, similarProducts };
  }

  async getCategory(mainCategory: MainCategories, category: Categories) {
    const [products, similarProducts] = await Promise.all([
      this.productModal.find({ mainCategory, category }),
      this.productModal.find({ mainCategory, category }).limit(30),
    ]);
    return { products, similarProducts };
  }

  async getSubCategory(
    mainCategory: MainCategories,
    category: Categories,
    subCategory: SubCategories,
  ) {
    const [products, similarProducts] = await Promise.all([
      this.productModal.find({
        mainCategory,
        category,
        subCategory,
      }),
      this.productModal.find({ mainCategory, category, subCategory }).limit(30),
    ]);

    return { products, similarProducts };
  }

  async getProductDetail(productId: string) {
    const product = await this.productModal.findById({ _id: productId });
    const similarProducts = await this.productModal
      .find({
        mainCategory: product.mainCategory,
        category: product.category,
        subCategory: product.subCategory,
      })
      .limit(30);
    return { product, similarProducts };
  }

  async getFiltered(filterContent: FilterDto) {
    const {
      sizes = null,
      colors = null,
      marks = null,
      prices = null,
    } = filterContent;
    console.log('///////////////////////');
    console.log(filterContent);
    // const products = await this.productModal.find({ ...filterContent });
    // return products;
  }

  async createProduct(product: ProductDto) {
    const createdProduct = await this.productModal.create(product);
    return createdProduct;
  }
}
