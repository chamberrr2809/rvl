import {
  Flex,
  VStack,
  Box,
  Input,
  Button,
  useToast,
  Popover,
  IconButton,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Heading,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { BsWhatsapp, BsFacebook, BsTwitter } from 'react-icons/bs';
import { RiLineLine } from 'react-icons/ri';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import db from '../firebase';
import moment from 'moment';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      // do something
    })
    .catch(error => {
      console.error(error);
    });
};

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const crtAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [nama, setNama] = React.useState('');
  const id = uniqid();
  const [load, setLoad] = React.useState(false);
  const handleClick = async () => {
    if (nama === '') {
      alert('Nama tidak boleh kosong');
    } else {
      setLoad(true);
      await setDoc(doc(db, 'index', id), {
        name: nama,
        dateCreated: crtAt,
        id: id,
        userId: auth.currentUser.uid,
      });
      setLoad(false);
      onOpen();
    }
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(`${window.location.href}/${id}`);
    toast({
      title: 'Link disalin',
      status: 'success',
      isClosable: true,
    });
  };
  const nativeShareHandler = async () => {
    const shareData = {
      title: 'Rvl',
      text: `${window.location.href}/${id}`,
      url: `${window.location.href}/${id}`,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error(err);
    }
  };
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
    return (
      <>
        <Button colorScheme="teal" onClick={() => signOut(auth)}>
          Logout
        </Button>
        <ColorModeSwitcher />
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          m="12"
        >
          <VStack>
            <Text align="center" fontSize="5xl" sx={{ fontWeight: 'bold' }}>
              Tulis namamu!
            </Text>
            <Input
              size="lg"
              value={nama}
              onChange={e => setNama(e.target.value)}
              placeholder="Nama"
            />
            <Button
              isLoading={load}
              size="lg"
              loadingText="Tunggu Sebentar"
              colorScheme="teal"
              onClick={handleClick}
            >
              Buat
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Berhasil</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontSize="xl">Nama: {nama}</Text>
                  <Text fontSize="xl">Dibuat pada: {crtAt}</Text>
                  <Text fontSize="xl">
                    Link: {`${window.location.href}/${id}`}
                  </Text>
                  <Text fontSize="xl">ID: {id}</Text>
                </ModalBody>

                <ModalFooter>
                  <Popover>
                    <PopoverTrigger>
                      <Button colorScheme="blue" mr={3}>
                        Bagikan
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Bagikan</PopoverHeader>
                      <PopoverBody>
                        <HStack spacing="14px">
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<BsWhatsapp />}
                            size="lg"
                            onClick={() =>
                              (window.location.href = `whatsapp://send?text=${window.location.href}/${id}`)
                            }
                            data-action="share/whatsapp/share"
                          />
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<BsFacebook />}
                            size="lg"
                            onClick={() =>
                              window.open(
                                `https://www.facebook.com/sharer.php?u=${window.location.href}/${id}`,
                                'popUpWindow',
                                'height=1000,width=700,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
                              )
                            }
                          />
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<RiLineLine />}
                            size="lg"
                            onClick={() =>
                              window.open(
                                `https://line.me/R/msg/text/?${window.location.href}/${id}`,
                                'popUpWindow',
                                'height=1000,width=700,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
                              )
                            }
                          />
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<MdContentCopy />}
                            size="lg"
                            onClick={copyHandler}
                          />
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<MdOutlineMoreHoriz />}
                            size="lg"
                            onClick={nativeShareHandler}
                          />
                        </HStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/dashboard');
                    }}
                  >
                    Dashboard
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
        </Flex>
      </>
    );
  }
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Kamu harus login untuk menggunakan halaman ini
      </Heading>
      <Text color={'gray.500'}>
        Kamu sepertinya telah menekan link yang mengharuskan mu untuk login.
        Santai saja, kamu hanya perlu menekan tombol di bawah ini.
      </Text>
      <Button colorScheme="blue" mt="2" onClick={loginHandler}>
        Login
      </Button>
    </Box>
  );
}
