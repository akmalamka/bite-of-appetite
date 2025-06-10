import type { LinkSelectionQuery } from '../link-selection.entity';
import { Card, Stack, Text } from '@sanity/ui';
import styled from 'styled-components';

const StyledPopoverCard = styled(Card)`
  max-height: 250px;
  overflow-y: scroll;
  padding: 5px;
`;

const StyledPopoverOption = styled(Stack)`
  &:hover {
    cursor: pointer;
    background-color: rgba(35, 35, 47, 0.4);
  }
`;

const StyledPopoverText = styled(Text)`
  text-transform: capitalize;
`;

interface LinkSelectionOptionsProps {
  pages: Array<Omit<LinkSelectionQuery, 'components'>>;
  handleChangeValue: (value: string) => void;
}

export function LinkSelectionOptions({ pages, handleChangeValue }: LinkSelectionOptionsProps) {
  return (
    <StyledPopoverCard>
      { pages.map((page, index) => (
        <StyledPopoverOption key={index} onClick={() => handleChangeValue(page.url)} padding={3} space={3}>
          <StyledPopoverText size={1}>
            { page.title }
          </StyledPopoverText>

          <Text muted size={1}>
            { page.url }
          </Text>
        </StyledPopoverOption>
      )) }

      { pages.length === 0 && (
        <StyledPopoverOption padding={4}>
          <Text align="center" size={1}>No internal page found</Text>
        </StyledPopoverOption>
      ) }
    </StyledPopoverCard>
  );
}
