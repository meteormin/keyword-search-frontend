import { DynamicSchema } from 'components/common/DaynamicTable';
import React from 'react';
import { Search } from 'api/interfaces/Search';

export interface SearchTableSchema {
  id: number;
  publish: React.ReactNode;
  query: string;
  queryKey: string;
  shortUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  origin: Search;
}

export const schema: DynamicSchema = {
  id: {
    name: 'primary key',
    primaryKey: true,
  },
  description: {
    name: 'description',
  },
  queryKey: {
    name: 'query key',
  },
  query: {
    name: 'query',
  },
  shortUrl: {
    name: 'short url',
  },
  publish: {
    name: 'publish',
  },
  createdAt: {
    name: 'created at',
  },
  updatedAt: {
    name: 'updated at',
  },
};
