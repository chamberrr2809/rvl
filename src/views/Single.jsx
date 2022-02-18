import { useParams } from 'react-router-dom';
import db from '../firebase';

export default function App() {
  const { id } = useParams();
  return <h3>{id}</h3>;
}
