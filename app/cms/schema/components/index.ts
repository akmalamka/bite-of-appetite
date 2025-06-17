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
];
