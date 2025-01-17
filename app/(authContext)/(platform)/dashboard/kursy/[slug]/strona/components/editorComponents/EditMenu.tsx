import React, { useState } from 'react';

import MMenu from '@mui/material/Menu';
import { Box, type PopoverOrigin } from '@mui/material';
import TextInput from '@/components/materialUI/TextInput';

type Props = {
  id: string;
  children: React.ReactNode;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  container?: HTMLElement;
  className?: string;
  inputs: {
    title: string;
    value: string;
    type?: 'text' | 'color';
    onChange: (text: string) => void;
  }[];
  noOutline?: boolean;
};

const EditMenu = ({
  id,
  container,
  children,
  anchorOrigin,
  transformOrigin,
  inputs,
  className,
  noOutline,
}: Props) => {
  const [elementRef, setElementRef] = useState<Element | null>(null);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setElementRef(e.target as HTMLElement);
  };

  const onClose = () => {
    setElementRef(null);
  };

  return (
    <>
      <Box
        className={`tw-cursor-pointer ${
          noOutline ? '' : 'tw-outline-2 tw-outline-dashed'
        }  ${
          className ?? ''
        }  -tw-outline-offset-2 hover:tw-outline-primary-main ${
          elementRef ? ` tw-outline-primary-main` : `tw-outline-transparent`
        }  `}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              //@ts-expect-error clone element with onClick props
              onClick,
            })
          : null}
      </Box>
      <MMenu
        container={container}
        classes={{
          root: 'tw-rounded-lg tw-mt-2',
          paper: 'tw-rounded-lg ',
          list: 'tw-rounded-lg  tw-p-4 tw-bg-background-paper tw-border tw-border-primary-light',
        }}
        onClick={(e) => e.stopPropagation()}
        open={Boolean(elementRef)}
        onClose={onClose}
        anchorEl={elementRef}
        anchorOrigin={
          anchorOrigin ?? {
            vertical: 'bottom',
            horizontal: 'center',
          }
        }
        transformOrigin={
          transformOrigin ?? {
            vertical: 'top',
            horizontal: 'center',
          }
        }
        sx={{
          minWidth: 320,
          maxWidth: '100%',
          '.MuiList-root': {
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
      >
        {inputs.map((input) => {
          return (
            <TextInput
              key={input.title}
              value={input.value}
              className="tw-min-w-24 "
              id={`${id}-field-${input.title}`}
              type={input.type ?? 'color'}
              label={input.title}
              onChange={(e) => input.onChange(e.target.value)}
            />
          );
        })}
      </MMenu>
    </>
  );
};

export default EditMenu;
