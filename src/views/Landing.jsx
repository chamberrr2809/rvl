import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { auth } from '../firebase';
import Copyright from '../components/Footer'

export default function Landing() {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    navigate('/app');
    return <p>Redirecting you. Please Wait</p>;
  }
  return (
    <>
      <Notification />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                  overflow: 'hidden',
                }}
              >
                Rvl
              </Text>
              <br /> <Text color={'blue.400'} as={'span'}></Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Dapatkan pesan dari temanmu. Tanpa identitas. Dengan menekan Mulai
              Sekarang, berarti kamu setuju dengan{' '}
              <a
                href="https://policies.google.com/privacy?hl=en-US"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>{' '}
              dan{' '}
              <a
                href="https://policies.google.com/terms?hl=en-US"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
              </a>{' '}
              Google
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  const provider = new GoogleAuthProvider();
                  signInWithPopup(auth, provider)
                    .then(result => {
                      window.location.href = '/app';
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
              >
                Mulai Sekarang
              </Button>
              <Button
                onClick={() => {
                  window.location.href = '/plans';
                }}
                rounded={'full'}
              >
                Gabung Premium
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://cdn.discordapp.com/attachments/937506444331335760/943054178329165824/undraw_anonymous_feedback_re_rc5v.png'
            }
          />
        </Flex>
      </Stack>
      <Copyright />
    </>
  );
}
