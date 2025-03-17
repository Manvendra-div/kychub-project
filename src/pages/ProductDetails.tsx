import React, { useEffect, useState } from "react";
import { Table, Button, message, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import { useCompareProducts } from "../context/CompareContext";
import { ArrowUpDown, Check, Plus } from "lucide-react";

const ProductDetails: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { compareProducts, addToCompare } = useCompareProducts();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        message.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  const columns: ColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: () => (
        <div className="flex items-center gap-2">
          Title <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: () => (
        <div className="flex items-center gap-2">
          Brand <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: () => (
        <div className="flex items-center gap-2">
          Category <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: () => (
        <div className="flex items-center gap-2">
          Price <ArrowUpDown className="w-4 h-4" />
        </div>
      ),
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `$${price}`,
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (discount: number) => `${discount}%`,
      width: "fit-content",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isInCompare = compareProducts.some((p) => p.id === record.id);
        return (
          <Button
            type="primary"
            disabled={isInCompare}
            onClick={() => {
              if (compareProducts.length >= 4) {
                message.warning("You can compare up to 4 products at a time");
                return;
              }
              addToCompare(record);
              message.success("Product added to comparison");
              navigate("/compare");
            }}
          >
            {isInCompare ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isInCompare ? "Added" : "Compare"}
          </Button>
        );
      },
    },
  ];

  return (
    <Card title="Product Details" className="shadow-sm">
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        className="bg-white rounded-lg"
      />
    </Card>
  );
};

export default ProductDetails;
