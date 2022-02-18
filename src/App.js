import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './views/Home';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import Plans from './views/Plans';
import Single from './views/Single';

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});

// 3. Extend the theme
const theme = extendTheme({ breakpoints });

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/app/:id" element={<Single />} />
      </Routes>
    </ChakraProvider>
  );
}
