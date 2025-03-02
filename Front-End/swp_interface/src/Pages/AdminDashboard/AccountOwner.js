import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Form, Pagination } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./style.css";
import API from "../../Utils/API/API.js";
import { getToken } from "../../Utils/UserInfoUtils";

const AccountOwner = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API.ADMIN.GET_ALL_ACCOUNT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (response.data.code === 200) {
          setUserData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const updateAccountStatus = async (accountID, isActive) => {
    try {
      const response = await axios.patch(
        API.ADMIN.UPDATE_ACCOUNT_STATUS,
        {
          id: accountID,
          isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        const updatedResponse = await axios.get(API.ADMIN.GET_ALL_ACCOUNT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (updatedResponse.data.code === 200) {
          setUserData(updatedResponse.data.data);
          setFilteredData(updatedResponse.data.data);
        }
      } else {
        setError("Failed to update account status");
      }
    } catch (err) {
      console.error("Error updating account status:", err);
      setError("Error updating account status");
    }
  };

  useEffect(() => {
    let filtered = userData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) =>
        statusFilter === "active" ? user.isActive : !user.isActive
      );
    }

    if (genderFilter !== "all") {
      filtered = filtered.filter((user) =>
        genderFilter === "male" ? user.gender === true : user.gender === false
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.email &&
            user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.phoneNumber && user.phoneNumber.includes(searchQuery))
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const valueA = a[sortConfig.key] ?? "";
      const valueB = b[sortConfig.key] ?? "";

      if (sortConfig.key === "createdAt") {
        return sortConfig.direction === "asc"
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }

      if (sortConfig.key === "isActive" || sortConfig.key === "gender") {
        return sortConfig.direction === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }

      return sortConfig.direction === "asc"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });

    setFilteredData(filtered);
  }, [statusFilter, genderFilter, searchQuery, sortConfig, userData]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentRecords = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const getPaginationItems = () => {
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    return [...Array(end - start + 1)].map((_, index) => (
      <Pagination.Item
        key={start + index}
        active={start + index === currentPage}
        onClick={() => setCurrentPage(start + index)}
      >
        {start + index}
      </Pagination.Item>
    ));
  };

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Container className="mt-5">
          <h2 className="mb-4 text-center">Tài khoản của chủ cửa hàng</h2>

          <div className="d-flex gap-3 mb-3">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </Form.Select>

            <Form.Select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="all">Tất cả giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </Form.Select>
          </div>

          {/* Bảng hiển thị dữ liệu */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th onClick={() => handleSort("username")}>
                  Tên {getSortIcon("username")}
                </th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ảnh đại diện</th>
                <th onClick={() => handleSort("createdAt")}>
                  Ngày tạo {getSortIcon("createdAt")}
                </th>
                <th onClick={() => handleSort("isActive")}>
                  Trạng thái {getSortIcon("isActive")}
                </th>
                <th onClick={() => handleSort("gender")}>
                  Giới tính {getSortIcon("gender")}
                </th>
                <th onClick={() => handleSort("birthDate")}>
                  Ngày sinh {getSortIcon("birthDate")}
                </th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((user) => (
                <tr key={user.accountID}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" width="50" />
                    ) : (
                      "No Avatar"
                    )}
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{user.isActive ? "Hoạt động" : "Không hoạt động"}</td>
                  <td>{user.gender ? "Nam" : "Nữ"}</td>
                  <td>{user.birthDate}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() =>
                          updateAccountStatus(user.accountID, !user.isActive)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Phân trang */}
          <Pagination className="mt-3">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {getPaginationItems()}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Container>
      </div>
    </div>
  );
};

export default AccountOwner;
