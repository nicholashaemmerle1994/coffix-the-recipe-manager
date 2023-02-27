import { cache } from 'react';
import { sql } from './connect';

export type Category = {
  id: number;
  name: string;
  icon: string;
  sitename: string;
}[];

export const category: Category = [
  { id: 1, name: 'Espresso', icon: '/portafilter.png', sitename: 'espresso' },
  {
    id: 2,
    name: 'French Press',
    icon: '/frenchpress.png',
    sitename: 'frenchpress',
  },
  { id: 3, name: 'AeroPress', icon: '/aeropress.png', sitename: 'aeropress' },
  { id: 4, name: 'V60', icon: '/v60.png', sitename: 'v60' },
  { id: 5, name: 'Moka Pot', icon: '/moka.png', sitename: 'moka' },
];

export const getCategory = cache(async () => {
  const categories = await sql`SELECT * FROM category`;
  return categories;
});

//
