import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Modal,
  Table,
  Input,
  Pagination
} from 'antd';
import {
  SearchOutlined
} from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';

const StoreHomeBody = ({ products: initialProducts }) => {
  const [openResponsive, setOpenResponsive] = useState(false);

  const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
    };
  });

  const { styles } = useStyle();

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Thông tin thêm',
      dataIndex: 'information',
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'productAttributes',
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);


  const [products, setProducts] = useState(initialProducts);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Gửi request tìm kiếm đến backend
  const handleSearch = async (e, page = 0) => {
    e.preventDefault();
    navigate(`?query=${encodeURIComponent(query)}&page=${page}`)
    try {
      const response = await fetch(`http://localhost:9999/store/products?query=${encodeURIComponent(query)}&page=${page}&size=5`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number + 1);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm!", error);
    }
  };

  // Fetch tất cả sản phẩm khi mở trang
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9999/store/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm!", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 container-all">
      {/*Form tìm kiếm sản phẩm */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Tìm kiếm sản phẩm</h2>
        <form onSubmit={handleSearch}>
          <div className="search flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Nhập từ khóa..."
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <Button type="submit" >
              <SearchOutlined />
            </Button>
          </div>
        </form>
      </div>

      {/* Sản phẩm */}
      {products.map((product) => (
        // tùng sản phẩm
        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              <div className="row p-2 bg-white border rounded mt-2">
                <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src="https://th.bing.com/th/id/OIP.jbXWti_ufkFCWaPna_p79gHaHa?rs=1&pid=ImgDetMain" /></div>
                <div className="col-md-6 mt-1">
                  <h5>{product.name}</h5>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                  <div className="d-flex flex-row align-items-center">
                    <h4 className="mr-1">{product.price}VNĐ/kg</h4><span className="strike-text"></span>
                  </div>
                  <div className="d-flex flex-column mt-4 detail">
                    <Flex vertical gap="middle" align="flex-start">
                      {/* Responsive */}
                      <Button type="primary" onClick={() => {
                        setSelectedProduct(product); // Lưu sản phẩm được chọn
                        setOpenResponsive(true)
                      }}>
                        Thông tin
                      </Button>
                      {/* Bảng thông tin của từng sản phẩm  */}
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
                        {/* <p>{product.name}</p>
                        <p>{product.information}</p>
                        <ul>
                          {product.productAttributes.map((attribute) => (
                            <li key={attribute.productAttributeID}>{attribute.value}</li>
                          ))}
                        </ul> */}
                        <Table
                          className={styles.customTable}
                          columns={columns}

                          dataSource={selectedProduct ? [
                            {
                              key: selectedProduct.productID,
                              name: selectedProduct.name,
                              information: selectedProduct.information,
                              productAttributes: selectedProduct.productAttributes
                                ? selectedProduct.productAttributes.map(attr => attr.value).join(", ")
                                : "Không có",
                            },
                          ] : []}

                          pagination={false} //tắt phân trang
                        />
                      </Modal>
                    </Flex>

                    <button className="btn btn-outline-primary btn-sm mt-2" type="button">Thêm vào giỏ</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
      }
      <Pagination
        current={currentPage}
        total={totalPages * 10} // Vì mỗi trang có 10 sản phẩm
        pageSize={10}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </div >
  );
};

export default StoreHomeBody;
