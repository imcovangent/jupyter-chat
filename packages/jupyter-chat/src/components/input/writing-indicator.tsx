/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */

import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

import { IChatModel } from '../../model';

/**
 * Classname on the root element. Used in E2E tests.
 */
const WRITERS_ELEMENT_CLASSNAME = 'jp-chat-writers';

/**
 * The input writing indicator component props.
 */
export interface IInputWritingIndicatorProps {
  /**
   * The list of users currently writing.
   */
  writers: IChatModel.IWriter[];
}

/**
 * Format the writers list into a readable string.
 * Examples: "Alice is typing...", "Alice and Bob are typing...", "Alice, Bob, and Carol are typing..."
 */
function formatWritersText(writers: IChatModel.IWriter[]): string {
  if (writers.length === 0) {
    return '';
  }

  const names = writers.map(
    w => w.user.display_name ?? w.user.name ?? w.user.username ?? 'Unknown'
  );

  if (names.length === 1) {
    return `${names[0]} is typing...`;
  } else if (names.length === 2) {
    return `${names[0]} and ${names[1]} are typing...`;
  } else {
    const allButLast = names.slice(0, -1).join(', ');
    const last = names[names.length - 1];
    return `${allButLast}, and ${last} are typing...`;
  }
}

/**
 * The input writing indicator component, displaying typing status in the chat messages area.
 */
export function InputWritingIndicator(
  props: IInputWritingIndicatorProps
): JSX.Element {
  const { writers } = props;

  const writersText = formatWritersText(writers);

  return (
    <Box
      className={WRITERS_ELEMENT_CLASSNAME}
      sx={{
        minHeight: '16px',
        display: writers.length > 0 ? 'flex' : 'none',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      <CircularProgress size={10} thickness={5} />
      <Typography
        variant="caption"
        sx={{
          color: 'var(--jp-ui-font-color2)',
          fontSize: '10px',
          fontFamily: 'var(--jp-ui-font-family)',
          lineHeight: '16px'
        }}
      >
        {writersText}
      </Typography>
    </Box>
  );
}
