import React from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";

const DEFAULT_IMAGE_URL =
  "https://torog-cdn.kootoro.com/cms/upload/image/1689819413711-m%E1%BB%9F%20c%E1%BB%ADa%20h%C3%A0ng%20b%C3%A1n%20g%E1%BA%A1o.jpg";

const StoreDetailModal = ({ show, handleClose, store }) => {
  if (!store) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết cửa hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={store.image ? `${store.image}` : DEFAULT_IMAGE_URL}
                alt={store.storeName}
                onError={(e) => (e.target.src = DEFAULT_IMAGE_URL)}
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{store.storeName}</Card.Title>
                <Card.Text>
                  <strong>Địa chỉ:</strong> {store.address} <br />
                  <strong>Liên hệ:</strong> {store.hotline} <br />
                  <strong>Mô tả:</strong> {store.description} <br />
                  <strong>Giờ hoạt động:</strong> {store.operatingHour} <br />
                  <strong>Chủ cửa hàng:</strong> {store.accountName} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default StoreDetailModal;
