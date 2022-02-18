import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
} from '@chakra-ui/react';

export default function Notification() {
  return (
    <Box w="100%">
      <Alert status="info">
        <AlertIcon />
        Rvl masih dalam versi Beta. Jika kamu menemukan bug, tolong laporkan bug
        tersebut. Terimakasih{' '}
        <Button
          colorScheme="teal"
          ml={4}
          w="full"
          onClick={() => window.open('mailto:chamberrsiagian@gmail.com')}
        >
          Laporkan
        </Button>
      </Alert>
    </Box>
  );
}
