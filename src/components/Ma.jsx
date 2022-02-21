import React from 'react';
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Text,
} from '@chakra-ui/react';

const Ma = props => {
  return (
    <Flex p={3} w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue('white', 'gray.800')}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {props.time}
          </chakra.span>
        </Flex>
        <Box mt={1}>
          <Text
            fontSize="2xl"
            mt={2}
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            {props.message}
          </Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: 'none', sm: 'block' }}
              src="https://cdn.discordapp.com/attachments/937506444331335760/944988286613614652/32azl7Hg2EaDqxQQLpKGaQpdyIJilUpPF2XqX7ufq36f4HsKvTkQ5dkaAAAAAASUVORK5CYII.png"
              alt="avatar"
            />
            <Link
              color={useColorModeValue('gray.700', 'gray.200')}
              fontWeight="700"
              cursor="pointer"
            >
              Anonymous
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Ma;
