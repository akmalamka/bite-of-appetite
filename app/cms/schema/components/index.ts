import { defineArrayMember } from 'sanity';

export const componentMembers = [
  defineArrayMember({
    name: 'heroTitle',
    type: 'heroTitle',
  }),
  defineArrayMember({
    name: 'heroImage',
    type: 'heroImage',
  }),
  defineArrayMember({
    name: 'heroQuote',
    type: 'heroQuote',
  }),
  defineArrayMember({
    name: 'imageCarousel',
    type: 'imageCarousel',
  }),
  defineArrayMember({
    name: 'articleList',
    type: 'articleList',
  }),
  defineArrayMember({
    name: 'recipeList',
    type: 'recipeList',
  }),
];
