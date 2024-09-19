import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import { store } from './redux/store';

const { Sider, Content } = Layout;

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={70} style={{ backgroundColor: '#578597' }}>
          <Sidebar />
        </Sider>
        <Content style={{ padding: '20px', minHeight: '100vh'}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  </Provider>
);

export default App;
