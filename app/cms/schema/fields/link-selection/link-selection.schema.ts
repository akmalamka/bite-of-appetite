import { defineType } from 'sanity';

import { LinkSelection } from './components/link-selection';

export const linkSelectionSchema = defineType({
  name: 'linkSelection',
  type: 'string',
  components: {
    input: LinkSelection,
  },
});
