import React from 'react';
import { Card, Button, Modal, Table, Empty, message } from 'antd';
import { useCompareProducts } from '../context/CompareContext';
import { X, Plus } from 'lucide-react';
import type { Product } from '../types/product';

const CompareProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { compareProducts, removeFromCompare, addToCompare } = useCompareProducts();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      message.error('Failed to load products');
    }
    setLoading(false);
  };

  const handleAddMore = () => {
    fetchProducts();
    setIsModalOpen(true);
  };

  const compareAttributes = [
    // { label: 'Image', key: 'thumbnail' },
    { label: 'Title', key: 'title' },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price' },
    { label: 'Discount', key: 'discountPercentage' },
    { label: 'Description', key: 'description' },
  ];

  if (compareProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <Empty
          description="No products selected for comparison"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Button type="primary" onClick={handleAddMore} className="mt-4">
          Add Products to Compare
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Compare Products</h2>
        <Button 
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleAddMore}
          disabled={compareProducts.length >= 4}
        >
          Add More
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {compareProducts.map((product) => (
          <Card
            key={product.id}
            className="relative"
            cover={
              <img
                alt={product.title}
                src={product.thumbnail}
                className="h-48 object-cover"
              />
            }
          >
            <Button
              type="text"
              icon={<X className="w-4 h-4" />}
              className="absolute top-2 right-2"
              onClick={() => removeFromCompare(product.id)}
            />
            {compareAttributes.map(({ label, key }) => (
              <div key={key} className="mb-2">
                <strong>{label}:</strong>{' '}
                {key === 'price'
                  ? `$${product[key]}`
                  : key === 'discountPercentage'
                  ? `${product[key]}%`
                  : product[key as keyof Product]}
              </div>
            ))}
          </Card>
        ))}
      </div>

      <Modal
        title="Add Products to Compare"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Table
          dataSource={products}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          columns={[
            {
              title: 'Image',
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              render: (thumbnail) => (
                <img
                  src={thumbnail}
                  alt="product"
                  className="w-12 h-12 object-cover rounded"
                />
              ),
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Brand',
              dataIndex: 'brand',
              key: 'brand',
            },
            {
              title: 'Action',
              key: 'action',
              render: (_, record) => {
                const isInCompare = compareProducts.some((p) => p.id === record.id);
                return (
                  <Button
                    type="primary"
                    disabled={isInCompare}
                    onClick={() => {
                      if (compareProducts.length >= 4) {
                        message.warning('You can compare up to 4 products at a time');
                        return;
                      }
                      addToCompare(record);
                      message.success('Product added to comparison');
                      setIsModalOpen(false);
                    }}
                  >
                    {isInCompare ? 'Added' : 'Add to Compare'}
                  </Button>
                );
              },
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default CompareProducts;