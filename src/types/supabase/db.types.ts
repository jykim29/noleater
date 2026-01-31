import { Database } from '../../../database.types';

export type TableRow<V extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][V]['Row'];

export type ViewRow<V extends keyof Database['public']['Views']> =
  Database['public']['Views'][V]['Row'];
