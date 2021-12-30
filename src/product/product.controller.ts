import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Categories, MainCategories, SubCategories } from './constants';
import { ProductDto, FilterDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/product_detail/:productId')
  getProductDetail(@Param('productId') productId: string) {
    return this.productService.getProductDetail(productId);
  }

  @Get('/main_category/:mainCategory')
  getMainCategory(@Param('mainCategory') mainCategory: MainCategories) {
    return this.productService.getMainCategory(mainCategory);
  }

  @Get('/:mainCategory/:category')
  getCategory(
    @Param('mainCategory') mainCategory: MainCategories,
    @Param('category') category: Categories,
  ) {
    return this.productService.getCategory(mainCategory, category);
  }

  @Get('/:mainCategory/:category/:subCategory')
  getSubCategory(
    @Param('mainCategory') mainCategory: MainCategories,
    @Param('category') category: Categories,
    @Param('subCategory') subCategory: SubCategories,
  ) {
    return this.productService.getSubCategory(
      mainCategory,
      category,
      subCategory,
    );
  }

  @Get('/filter')
  getFiltered(@Body() filterContent: FilterDto) {
    return this.productService.getFiltered(filterContent);
  }

  @Post('/create')
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }
}
