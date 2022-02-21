import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import Landing from './views/Landing';
import Plans from './views/Plans';
import Single from './views/Single';
import NotFound from './views/NotFound';
import React from 'react';
import Manage from './views/Manage';

const RedirectHandler = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/lost');
  }, []);
  return <h3>Nothing</h3>;
};
// 2. Update the breakpoints as key-value pairs
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. Extend the theme
const theme = extendTheme({ config });

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/app/:id" element={<Single />} />
        <Route path="/app/:id/manage" element={<Manage />} />
        <Route path="/lost" element={<NotFound />} />
        <Route path="*" element={<RedirectHandler />} />
      </Routes>
    </ChakraProvider>
  );
}
