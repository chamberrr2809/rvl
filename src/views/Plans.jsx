import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
}

export default function Plans() {
  const navigate = useNavigate();
  return (
    <>
      <Notification />
      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Bergabung ke Premium
          </Heading>
          <Text fontSize="lg" color={'gray.500'}>
            Paket Basic dapat digunakan kapan saja, gratis selamanya
          </Text>
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Basic
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="5xl" fontWeight="900">
                  Gratis
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={8}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Gratis Selamanya
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Buat sebanyak yang kamu mau, tanpa batasan
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Keamanan terjamin
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button
                  w="full"
                  colorScheme="red"
                  onClick={() => {
                    navigate('/app');
                  }}
                >
                  Mulai Gratis
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Premium
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  Rp
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  15.000
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /selamanya
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Semua di basic
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Buat dengan namamu dibelakangnya (
                  {`${window.location.href}/app/namamu`})
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Bayar sekali, gunakan seumur hidup.
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Tambahkan gambar, dan lampiran lainnya yang didukung*
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  Coming soon
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Box>
    </>
  );
}
