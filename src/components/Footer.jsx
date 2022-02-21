import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import React from 'react';

export default function Copyright() {
  return React.createElement(
    Box,
    {
      bg: useColorModeValue('gray.50', 'gray.900'),
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      color: useColorModeValue('gray.700', 'gray.200'),
    },
    React.createElement(
      Container,
      {
        as: Stack,
        maxW: '6xl',
        py: 2,
        direction: { base: 'column', md: 'row' },
        spacing: 4,
        justify: { base: 'center', md: 'space-between' },
        align: { base: 'center', md: 'center' },
      },
      React.createElement(Text, null, '\u00A9 2022 Rvl Open Source.')
    )
  );
}
