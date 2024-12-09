import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.categoriesService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Categories retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieving categories',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.categoriesService.create(createCategoryDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Category created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating category',
        error: error.message,
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.categoriesService.update(id, updateCategoryDto);

      return res.status(HttpStatus.OK).json({
        message: 'Catalog updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error updating catalog',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const isDeleted = await this.categoriesService.delete(id);
      let message;
      if (isDeleted) {
        message = 'Category deleted and associated tasks updated successfully';
      } else {
        message = 'Category not found';
      }
      return res.status(HttpStatus.OK).json({
        message,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error deleting category',
        error: error.message,
      });
    }
  }
}
