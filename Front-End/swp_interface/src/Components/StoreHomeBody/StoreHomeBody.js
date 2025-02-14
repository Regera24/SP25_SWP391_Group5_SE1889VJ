import React, { useState, useEffect } from "react";
import { Button, Input, Table, Modal, Pagination, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';

const StoreHomeBody = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Define items per page (must match Spring Boot's default size)
  const [query, setQuery] = useState(""); // Bind input search term to state
  const [openResponsive, setOpenResponsive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Đặt vị trí là đầu trang
      behavior: "smooth", // Hiệu ứng scroll mượt mà
    });
  };

  // Synchronize search params (query + page)
  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    const pageParam = parseInt(searchParams.get("page")) || 1;

    setQuery(queryParam); // Keep the query synchronized with state
    setCurrentPage(pageParam); // Sync page
    fetchProducts(queryParam, pageParam); // Fetch products based on URL params
  }, [searchParams]);

  const fetchProducts = async (query = "", page = 1) => {
    try {
      // Construct dynamic URL for fetching results
      let url = `http://localhost:9999/store/products?page=${page - 1}&size=${pageSize}`;
      if (query) {
        url = `http://localhost:9999/store/products?query=${encodeURIComponent(query)}&page=${page - 1}&size=${pageSize}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        // Update products and pagination data
        setProducts(data.content); // Populate products from Spring Boot API
        setTotalPages(data.totalPages);
        setCurrentPage(data.number + 1); // Convert Spring Boot's 0-based page index to React's 1-based index

        // Update URL based on input and pagination for React Router
        navigate(`?query=${encodeURIComponent(query)}&page=${page}`);
        scrollToTop();
      } else {
        console.error("Error fetching products!", response.status);
      }
    } catch (error) {
      console.error("Error fetching products!", error);
    }
  };

  return (
    <div className="container-all">
      {/* Search bar */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Tìm kiếm sản phẩm</h2>
        <div className="search flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Nhập từ khóa..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim() === "") {
                fetchProducts("", 1);
              }
            }} // Update input
            onKeyDown={(e) => {
              if (e.key === "Enter") { // Kiểm tra nếu phím "Enter" được nhấn
                fetchProducts(query, 1); // Gọi hàm fetchProducts với query
              }
            }}
            className="border p-2 rounded w-full"
          />
          <Button
            onClick={() => fetchProducts(query, 1)} // Trigger search with the first page reset
          >
            <SearchOutlined />
          </Button>
        </div>
      </div>

      {/* Product list */}
      {products.map((product) => (
        <div key={product.productID} className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              <div className="row p-2 bg-white border rounded mt-2">
                <div className="col-md-3 mt-1">
                  <img className="img-fluid img-responsive rounded product-image"
                    src="https://th.bing.com/th/id/OIP.jbXWti_ufkFCWaPna_p79gHaHa?rs=1&pid=ImgDetMain"
                    alt={product.name} />
                </div>
                <div className="col-md-6 mt-1">
                  <h5>{product.name}</h5>
                </div>
                <div className="col-md-3 border-left mt-1">
                  <h4>{product.price} VNĐ/kg</h4>
                  <Flex vertical gap="middle" align="flex-start">
                    <Button type="primary" onClick={() => {
                      setSelectedProduct(product);
                      setOpenResponsive(true);
                    }}>
                      Thông tin
                    </Button>

                    {/* Modal with detailed information */}
                    <Modal
                      title="Thông tin chi tiết"
                      centered
                      open={openResponsive}
                      onOk={() => setOpenResponsive(false)}
                      onCancel={() => setOpenResponsive(false)}
                      width={{
                        xs: '90%',
                        sm: '80%',
                        md: '70%',
                        lg: '60%',
                        xl: '50%',
                        xxl: '40%',
                      }}
                    >
                      <Table
                        columns={[
                          { title: 'Tên', dataIndex: 'name', width: 150 },
                          { title: 'Thông tin thêm', dataIndex: 'information', width: 150 },
                          { title: 'Mô tả', dataIndex: 'productAttributes' }
                        ]}
                        dataSource={selectedProduct ? [{
                          key: selectedProduct.productID,
                          name: selectedProduct.name,
                          information: selectedProduct.information,
                          productAttributes: selectedProduct.productAttributes
                            ? selectedProduct.productAttributes.map(attr => attr.value).join(", ")
                            : "Không có",
                        }] : []}
                        pagination={false}
                      />
                    </Modal>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={totalPages * pageSize} // Total items for pagination component
        pageSize={pageSize}
        onChange={(page) => fetchProducts(query, page)} // Fetch the new page
        showSizeChanger={false}
      />
    </div>
  );
};

export default StoreHomeBody;