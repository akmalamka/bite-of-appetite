import type { ChangeEvent } from 'react';
import type { StringInputProps, StringOptions, StringSchemaType } from 'sanity';

import type { LinkSelectionQuery } from '../link-selection.entity';
import { Button, Card, Flex, Inline, Popover, Radio, Spinner, Stack, Text, TextInput, useClickOutsideEvent } from '@sanity/ui';
import { useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { set, useClient } from 'sanity';

import styled from 'styled-components';
import { LinkSelectionOptions } from './link-selection-options';

const LINK_TYPES = ['internal', 'external'];

const StyledPopover = styled(Popover)`
  width: 100%;
`;

const StyledPopoverButton = styled(Button)`
  background-color: transparent;
  color: #e4e5e9;
  font-size: 15px;
  min-height: 34px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledTextInputWrapper = styled(Card)`
  width: 100%;
`;
const StyledSpinner = styled(Spinner)`
  margin-top: 7px;
`;

const StyledRadioWrapper = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledRadioText = styled(Text)`
  text-transform: capitalize;
`;

type LinkSelectionSchemaType = {
  options?: {
    onlyInternal?: boolean;
  } & StringOptions;
} & Omit<StringSchemaType, 'options'>;

export function LinkSelection(props: StringInputProps<LinkSelectionSchemaType>) {
  const { onChange, value, schemaType } = props;
  const popoverElement = useRef<HTMLDivElement>(null);
  const triggerElement = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [linkType, setLinkType] = useState('internal');

  const [pages, setPages] = useState<Array<Omit<LinkSelectionQuery, 'components'>>>([]);
  const client = useClient({ apiVersion: '2021-06-07' });

  async function openPopoverHandler(search: string) {
    if (openPopover) {
      setOpenPopover(false);
    } else {
      setIsLoading(true);

      search = search.toLowerCase();

      const query = `*[
        (_type == "pages" && !(_id in path("drafts.**")) && (title match $search || url.current match $search)) ||
        (_type == "articles" && !(_id in path("drafts.**")) && (title match $search || slug.current match $search)) ||
        (_type == "customerCases" && !(_id in path("drafts.**")) && (title match $search || slug.current match $search))
      ] {
        "url": select(
          _type == "pages" => url.current,
          _type == "articles" => ("/" + slug.current),
          _type == "customerCases" => ("/" + slug.current)
        ),
        "title": select(
          _type == "pages" => "[Pages] " + title,
          _type == "articles" => "[Articles] " + title,
          _type == "customerCases" => "[Customer Cases]" + title
        )
      } | order(url asc)`;

      await client.fetch<Array<LinkSelectionQuery>>(query, { search: `*${search || ''}*` })
        .then((data) => {
          const sectionData = data.map((item) => {
            return {
              title: item.title,
              url: item.url,
            };
          });

          setPages(sectionData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

      setOpenPopover(true);
      setIsLoading(false);
    }
  }

  function handleChangeOptionsValue(value: string) {
    onChange(set(value));
    setOpenPopover(false);
    inputRef.current!.value = value;
  }

  useClickOutsideEvent(() => {
    setOpenPopover(false);
    if (inputRef.current && value && linkType === 'internal') {
      inputRef.current.value = value;
    }
  }, () => [popoverElement.current, triggerElement.current]);

  return (
    <Stack>
      <Inline paddingBottom={3} space={3}>
        {!schemaType.options?.onlyInternal && LINK_TYPES.map((option) => (
          <StyledRadioWrapper align="center" gap={2} key={option} onClick={() => setLinkType(option)}>
            <Radio
              checked={linkType === option}
              name={`link-radio-${props.id}`}
              onChange={() => setLinkType(option)}
              value={option}
            />
            <StyledRadioText size={1}>{option}</StyledRadioText>
          </StyledRadioWrapper>
        ))}
      </Inline>

      {linkType === 'internal'
        ? (
            <StyledPopover
              content={<LinkSelectionOptions handleChangeValue={handleChangeOptionsValue} pages={pages} />}
              open={openPopover}
              ref={popoverElement}
            >
              <Flex direction="column" gap={4}>
                <Flex ref={triggerElement} width="fill">
                  <StyledTextInputWrapper>
                    <TextInput
                      aria-label="Internal link text input"
                      defaultValue={value}
                      iconRight={isLoading && <StyledSpinner />}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => openPopoverHandler(event.target.value)}
                      placeholder={linkType === 'internal' ? 'Type to search internal pages' : 'Type to directly put external link'}
                      ref={inputRef}
                    />
                  </StyledTextInputWrapper>

                  <StyledPopoverButton
                    mode="ghost"
                    onClick={() => openPopoverHandler('')}
                    padding={2}
                    paddingX={3}
                  >
                    <FaChevronDown size={12} />
                  </StyledPopoverButton>
                </Flex>
              </Flex>
            </StyledPopover>
          )
        : props.renderDefault(props)}
    </Stack>
  );
}
