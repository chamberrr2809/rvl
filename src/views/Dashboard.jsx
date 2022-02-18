import { collection, query, where, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import db, { auth } from '../firebase';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Text,
  Td,
  TableCaption,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Dashboard = () => {
  const [snapshot, setSnapshot] = React.useState({});
  React.useEffect(async () => {
    const q = query(
      collection(db, 'index'),
      where('userId', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    setSnapshot(querySnapshot);
  }, []);

  const navigate = useNavigate();
  const [value, loading, error] = useCollection(snapshot);
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <>
            <Text fontSize="3xl" align="center" fontWeight="bold">
              Selamat Datang!
            </Text>
            <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
              <Table variant="simple" mt="10" maxWidth="90%">
                <TableCaption>Data sudah Habis</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>Email</Th>
                    <Th>Link</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {value.docs.map(doc => (
                    <React.Fragment key={doc.id}>
                      <Tr>
                        <Td>{doc.data().name}</Td>
                        <Td>{doc.data().email}</Td>
                        <Td>{`${window.location.href}/${doc.data().id}`}</Td>
                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              navigate(`/app/${doc.data().id}/view`);
                            }}
                          ></Button>
                        </Td>
                      </Tr>
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </>
        )}
      </p>
    </div>
  );
};

export default Dashboard;
