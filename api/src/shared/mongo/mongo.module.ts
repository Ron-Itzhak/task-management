import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          const client = await MongoClient.connect(process.env.MONGO_URI, {});
          return client.db(process.env.MONGO_DB);
        } catch (e) {
          throw new Error('authentication failed on the mongo');
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class MongoModule {}
