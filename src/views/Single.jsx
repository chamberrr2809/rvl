import {
  Flex,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Button,
  AlertDialog,
  AlertDialogBody,
  useToast,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import moment from 'moment';
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../firebase';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import Ma from '../components/Ma';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const Single = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notFound, setNotFound] = React.useState(false);
  const [value, loading, error] = useCollection(
    query(collection(db, 'index'), where('id', '==', id)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  React.useEffect(async () => {
    const docRef = doc(db, 'index', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      navigate('/lost');
    }
  }, []);
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && (
          <Text fontSize="3xl" textAlign="center">
            Mengambil Data... Mohon Tunggu
          </Text>
        )}
        {value && (
          <span>
            {value.docs.map(doc => (
              <Found doc={doc} />
            ))}
          </span>
        )}
      </p>
    </div>
  );
};

export default Single;

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Found = props => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const onAlertClose = () => setIsAlertOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [anotherMessage, setAnotherMessage] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const sendMessage = async () => {
    if (message === '') {
      alert('Pesan tidak boleh kosong');
    } else {
      setLoading(true);
      await setDoc(doc(db, 'messages', makeid(25)), {
        messageFor: props.doc.data().id,
        messageId: makeid(50),
        content: message,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      })
        .then(result => {
          setIsAlertOpen(true);
          setLoading(false);
        })
        .catch(error => {
          alert('Uncaught error occured: ' + error);
        });
    }
  };
  const resendHandler = async () => {
    if (anotherMessage === '') {
      alert('Pesan tidak boleh kosong');
    } else {
      setLoading(true);
      await setDoc(doc(db, 'messages', makeid(25)), {
        messageFor: props.doc.data().id,
        messageId: makeid(50),
        content: anotherMessage,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      })
        .then(result => {
          setIsAlertOpen(false);
          onClose();
          toast({
            title: 'Pesan Baru telah dikirim',
            description: `Pesanmu telah dikirim ke ${
              props.doc.data().name
            }, identitasmu tetap dirahasiakan!`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch(error => {
          alert('Uncaught error occured: ' + error);
        });
    }
  };
  return (
    <>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        m={{ base: '6', md: '14' }}
        mt={{ base: '24', md: '14' }}
      >
        <VStack spacing="10">
          <Box>
            <VStack spacing="2">
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                textAlign="center"
                fontWeight="bold"
              >
                Berikan pesan rahasia untuk {props.doc.data().name}
              </Text>
              <Input
                variant="filled"
                placeholder="Pesan"
                width="full"
                value={message}
                onChange={e => {
                  setMessage(e.target.value);
                }}
                size="lg"
                mb="2"
              />
              <Button
                isLoading={loading}
                onClick={sendMessage}
                colorScheme="teal"
                size="lg"
              >
                Kirim
              </Button>
              <Alert status="info">
                <AlertIcon />
                {props.doc.data().name} tidak akan pernah mengetahui siapa yang
                mengirim pesan ini.
              </Alert>
            </VStack>
          </Box>
          <VStack
            mt="5"
            spacing="1"
            bg={useColorModeValue('#F9FAFB', 'gray.600')}
          >
            <Text fontSize="xl" textAlign="center" fontWeight="bold">
              {props.doc.data().allowInspect
                ? 'Pesan'
                : `${
                    props.doc.data().name
                  } tidak memperbolehkan kamu untuk melihat pesan dari pengguna lain. Rvl akan menjaganya`}
            </Text>
            <Comments />
          </VStack>
        </VStack>
      </Flex>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Pesan terkirim
            </AlertDialogHeader>

            <AlertDialogBody>
              Pesanmu sudah dikirimkan ke {props.doc.data().name}. Jangan
              beritahu dia kalau kamu yang mengirimnya!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  window.location.href = '/app';
                }}
              >
                Baiklah!
              </Button>
              <Button colorScheme="teal" onClick={onOpen} ml={3}>
                Kirim Pesan Lain
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kirim Pesan Lain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="2xl">
              Kirimkan pesan lain untuk {props.doc.data().name}
            </Text>
            <Input
              placeholder="Pesan"
              value={anotherMessage}
              onChange={e => setAnotherMessage(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Tutup
            </Button>
            <Button colorScheme="blue" onClick={resendHandler}>
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function Comments() {
  const { id } = useParams();
  const [value, loading, error] = useCollection(
    query(collection(db, 'messages'), where('messageFor', '==', id)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Menunggu Pesan</span>}
        {value && (
          <span>
            {value.docs.map(doc => (
              <Ma time={doc.data().createdAt} message={doc.data().content} />
            ))}
          </span>
        )}
      </p>
    </div>
  );
}
