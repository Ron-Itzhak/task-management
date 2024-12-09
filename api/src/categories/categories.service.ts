import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  private readonly categoriesCollection = this.db.collection('categories');
  private readonly tasksCollection = this.db.collection('tasks');

  async findAll(): Promise<any[]> {
    const categories = await this.categoriesCollection.find().toArray();

    return categories.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
  }

  async findOne(id: string): Promise<any> {
    const found = await this.categoriesCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!found) {
      return null;
    }
    const { _id, ...rest } = found;
    return {
      id,
      ...rest,
    };
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    return await this.categoriesCollection.insertOne(createCategoryDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    await this.categoriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateCategoryDto },
    );
    return this.findOne(id);
  }
  async delete(id: string): Promise<boolean> {
    console.log(id);

    const categoryId = new ObjectId(id);
    const categoryResult = await this.categoriesCollection.deleteOne({
      _id: categoryId,
    });

    if (categoryResult.deletedCount === 1) {
      console.log(
        'there was a deletion of category and now try delete id from tasks',
      );

      await this.tasksCollection.updateMany(
        { categoryId },
        { $unset: { categoryId: '' } },
      );
      return true;
    }

    return false;
  }
}
