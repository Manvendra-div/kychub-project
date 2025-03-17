import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import ProductDetails from './pages/ProductDetails';
import CompareProducts from './pages/CompareProducts';
import { CompareProvider } from './context/CompareContext';

const theme = {
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 6,
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <CompareProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductDetails />} />
              <Route path="compare" element={<CompareProducts />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </ConfigProvider>
  );
}

export default App;