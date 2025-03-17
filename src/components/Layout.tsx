import React, { useState } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Package, BarChart2, Menu as MenuIcon, User, LogOut } from 'lucide-react';

const { Header, Sider, Content } = AntLayout;

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between px-6 bg-white shadow-sm">
        <div className="flex items-center">
          <MenuIcon 
            className="text-gray-600 cursor-pointer mr-4" 
            onClick={() => setCollapsed(!collapsed)}
          />
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Package className="text-blue-600" />
            ProductHub
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">John Doe</span>
          </div>
          <LogOut className="text-gray-600 cursor-pointer" />
        </div>
      </Header>
      <AntLayout>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          className="bg-white"
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="h-full border-r"
            items={[
              {
                key: '/',
                icon: <Package className="w-4 h-4" />,
                label: 'Product Details',
                onClick: () => navigate('/')
              },
              {
                key: '/compare',
                icon: <BarChart2 className="w-4 h-4" />,
                label: 'Compare Products',
                onClick: () => navigate('/compare')
              }
            ]}
          />
        </Sider>
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;