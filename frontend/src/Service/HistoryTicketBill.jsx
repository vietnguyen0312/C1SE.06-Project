import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { FaPhone, FaCircle } from "react-icons/fa";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ReactRating from "react-rating";
import axios from "../Configuration/AxiosConfig";
import ButtonCPN from "../components/Button/Button";
import {
  ModalTitle,
  ModalWrapper,
  ModalHeader,
  ModalBody,
  ModalFooter,
  WriteRating,
} from "../Layout/PublicLayout/HistoryBill/style";
import NoInvoices from "../components/NoInvoices"; 

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;

const HistoryBill = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 50px 50px 0 50px;
`;

const HistoryBillContainer = styled.div`
  padding: 20px;
`;

const Container1 = styled.div`
  margin-bottom: 3rem;
  margin-top: 1.5rem;
`;

const InvoiceText = styled.p`
  color: #7e8d9f;
  font-size: 20px;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  margin-top: 20px;
  border-collapse: collapse;

  thead {
    background-color: #84b0ca;
    color: white;
  }

  td,
  th {
    padding: 16px;
  }
  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody td:hover {
    cursor: pointer;
  }
  .center {
    text-align: center;
  }
`;

const TotalText = styled.p`
  font-size: 20px;
`;

const Infomation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

const Status = styled.span`
  color: white;
  font-weight: bold;
  background-color: #ffc107;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InfomationLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextAreaWrapper = styled.div`
  margin-top: 10px;
  position: relative;
`;

const WordCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  color: #999;
`;

export const BannerSectionTicket = styled.section`
  background-image: url("/img/header/h3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 55vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  user-select: none;
  outline: none;
`;
const HistoryTicketBill = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [tempRating, setTempRating] = useState(0);
  const [tempReview, setTempReview] = useState("");
  const [serviceRatings, setServiceRatings] = useState({});
  const [historyBill, setHistoryBill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [billTicketDetailId, setBillTicketDetailId] = useState(null);

  const fetchHistoryBill = async () => {
    const params = { page: currentPage, size: pageSize };
    const billTicket = await axios.get("/bill-ticket", { params });

    const detailsPromises = billTicket.result.data.map(async (bill) => {
      const detailResponse = await axios.get(
        `/bill-ticket-detail/get-by-bill/${bill.id}`
      );
      const combinedValues = detailResponse.result.flatMap(
        (detail) => detail || []
      );
      return { ...bill, detail: combinedValues || [] };
    });

    const detailsResponses = await Promise.all(detailsPromises);
    console.log("detailsResponses", detailsResponses);
    setHistoryBill((prev) => [...prev, ...detailsResponses]);
    console.log("historyBill", historyBill);
    setTotalElements(billTicket.result.totalElements);
    setTotalPages(Math.ceil(billTicket.result.totalElements / pageSize));
  };

  useEffect(() => {
    fetchHistoryBill();
  }, [currentPage, pageSize]);

  const fetchData = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenModal = (service, billTicketDetailId) => {
    console.log("serviceRatings", serviceRatings);
    setSelectedService(service);
    setBillTicketDetailId(billTicketDetailId);
    setTempRating(serviceRatings[service.key.id] || 0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitRating = async () => {
    if (selectedService && tempRating > 0) {
      console.log("selectedService", selectedService);
      const response = await axios.post("http://localhost:8080/rate-services", {
        serviceId: selectedService.key.id,
        score: tempRating,
        comment: tempReview,
        billTicketDetailId: billTicketDetailId,
      });
      setServiceRatings((prev) => ({
        ...prev,
        [selectedService.value.value[0].id]: selectedService.value.value[0].id,
      }));
      console.log("serviceRatings", serviceRatings);
      handleCloseModal();
    }
  };

  const handlePayment = async (billId) => {
    const bill = historyBill.find((b) => b.id === billId);
    console.log("bill", bill);
    if (!bill || bill.status === "Đã thanh toán") {
      alert("Hóa đơn đã được thanh toán hoặc không tồn tại.");
      return;
    }

    const paymentUrl = await axios.get("/payment/vn-pay", {
      params: {
        amount: bill.total,
        orderInfo: `t${bill.id}`,
      },
    });

    window.location.href = paymentUrl.result;
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={historyBill.length}
        next={fetchData}
        hasMore={currentPage < totalPages}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Không còn hóa đơn nào nữa!</b>
          </p>
        }
      >
        {Array.isArray(historyBill) && historyBill.length > 0 ? (
          historyBill.map((item) => (
            <HistoryBill key={item.id}>
              <HistoryBillContainer>
                <Container1>
                  <div>
                    <InvoiceText>
                      Hoá Đơn: <strong>{item.id}</strong>
                    </InvoiceText>
                  </div>
                  <hr />
                  <Infomation>
                    <InfomationLeft>
                      <span style={{ color: "#5d9fc5" }}>
                        {item.user.username}
                      </span>
                      <Gender>
                        Giới tính:
                        {item.user.gender === "Female" ? (
                          <FemaleIcon
                            style={{ color: "pink", marginLeft: "5px" }}
                          />
                        ) : (
                          <MaleIcon
                            style={{ color: "blue", marginLeft: "5px" }}
                          />
                        )}
                      </Gender>
                      <div>
                        <FaPhone /> {item.user.phoneNumber}
                      </div>
                    </InfomationLeft>
                    <InfoRight>
                      <div>
                        <FaCircle style={{ color: "#84b0ca" }} /> ID: {item.id}
                      </div>
                      <div>
                        <FaCircle style={{ color: "#84b0ca" }} /> Ngày đặt:{" "}
                        {new Date(item.dateCreated).toLocaleString()}
                      </div>
                      <div>
                        <FaCircle style={{ color: "#84b0ca" }} /> Trạng thái:{" "}
                        <Status>{item.status}</Status>
                      </div>
                    </InfoRight>
                  </Infomation>
                  <Table>
                    <thead>
                      <tr>
                        <th className="marginLeft">STT</th>
                        <th>Tên Dịch Vụ</th>
                        <th>Loại Vé</th>
                        <th className="center">Số Lượng</th>
                        <th className="center">Đơn Giá</th>
                        <th className="center">Thành Tiền</th>
                        {item.status === "Đã thanh toán" && (
                          <th className="center">Đánh giá</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {item.detail && item.detail.length > 0 ? (
                        item.detail.map((bill, index) =>
                          bill.value.value.map((ticketdetail, ticketIndex) => (
                            <tr
                              key={`${bill.key.id}-${ticketIndex}`}
                              style={{
                                backgroundColor:
                                  index % 2 === 0 ? "#e0e0e0" : "#f9f9f9",
                              }}
                            >
                              {ticketIndex === 0 && (
                                <>
                                  <td rowSpan={bill.value.value.length}>
                                    {index + 1}
                                  </td>
                                  <td rowSpan={bill.value.value.length}>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <img
                                        src={`/img/service/${bill.key.image}`}
                                        alt={bill.key.name}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "cover",
                                          borderRadius: "10px",
                                          boxShadow:
                                            "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                                          cursor: "pointer",
                                        }}
                                      />
                                      <div>
                                        {bill.key.name}
                                        <div
                                          style={{
                                            fontSize: "13px",
                                            color: "#7e8d9f",
                                          }}
                                        >
                                          {bill.key.serviceType.name}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </>
                              )}
                              <td style={{ textAlign: "left" }}>
                                {ticketdetail.ticket.ticketType.name}
                              </td>
                              <td className="center">
                                <div>{ticketdetail.quantity}</div>
                              </td>
                              <td className="center">
                                <div>
                                  {ticketdetail.ticket.price
                                    ? ticketdetail.ticket.price.toLocaleString()
                                    : 0}{" "}
                                  VNĐ
                                </div>
                              </td>
                              <td className="center">
                                <div>
                                  {(
                                    ticketdetail.quantity *
                                    ticketdetail.ticket.price
                                  ).toLocaleString()}{" "}
                                  VNĐ
                                </div>
                              </td>
                              {ticketIndex === 0 &&
                                item.status === "Đã thanh toán" && (
                                  <td
                                    rowSpan={bill.value.value.length}
                                    className="center"
                                  >
                                    <div
                                      style={{
                                        display: "inline-block",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {item.status === "Đã thanh toán" &&
                                        (serviceRatings[bill.value.value[0].id] ||
                                        bill.value.key === "đã đánh giá" ? (
                                          <span>Đã đánh giá</span>
                                        ) : (
                                          <ButtonCPN
                                            text="Đánh giá"
                                            onClick={() =>
                                              handleOpenModal(
                                                bill,
                                                ticketdetail.id,
                                              )
                                            }
                                            style={{
                                              width: "110px",
                                              height: "30px",
                                              fontSize: "13px",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                            }}
                                          />
                                        ))}
                                    </div>
                                  </td>
                                )}
                            </tr>
                          ))
                        )
                      ) : (
                        <tr>
                          <td colSpan="6" className="center">
                            Không có thông tin chi tiết
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  <hr />
                  <Price>
                    <div>
                      <div>
                        {item.status === "Chưa thanh toán" ? (
                          <div style={{ color: "red" }}>
                            Vui lòng thanh toán để sử dụng dịch vụ
                          </div>
                        ) : (
                          <div style={{ color: "green" }}>
                            Cảm ơn bạn đã thanh toán
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {item.status === "Đã thanh toán" ? (
                        <div style={{ color: "green" }}>
                          <TotalText>
                            Tổng tiền: {item.total.toLocaleString()} VNĐ
                          </TotalText>
                        </div>
                      ) : (
                        <div style={{ color: "red" }}>
                          <TotalText>
                            Tổng tiền: {item.total.toLocaleString()} VNĐ
                          </TotalText>
                        </div>
                      )}
                      {item.status === "Chưa thanh toán" && (
                        <ButtonCPN
                          text="Thanh toán"
                          onClick={() => handlePayment(item.id)}
                        />
                      )}
                    </div>
                  </Price>
                </Container1>
              </HistoryBillContainer>
            </HistoryBill>
          ))
        ) : (
          <NoInvoices />
        )}
      </InfiniteScroll>
      <ModalWrapper show={showModal} onHide={handleCloseModal} centered>
        <ModalHeader closeButton>
          <ModalTitle>Đánh giá dịch vụ</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {selectedService && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  fontSize: "25px",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "20px",
                }}
              >
                <img
                  src={`/img/service/${selectedService.key.image}`}
                  alt={selectedService.key.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                />
                <div>
                  {selectedService.key.name}
                  <div style={{ fontSize: "13px", color: "#7e8d9fc" }}>
                    {selectedService.key.serviceType.name}
                  </div>
                </div>
              </div>
              <WriteRating>
                <ReactRating
                  fractions={2}
                  initialRating={tempRating}
                  onChange={(rate) => setTempRating(rate)}
                  emptySymbol={
                    <FontAwesomeIcon icon={faStar} color="#e4e5e9" />
                  }
                  fullSymbol={<FontAwesomeIcon icon={faStar} color="#ffc107" />}
                  placeholderSymbol={
                    <FontAwesomeIcon icon={faStarHalfAlt} color="#ffc107" />
                  }
                />
              </WriteRating>
              <div>Viết đánh giá</div>
              <TextAreaWrapper>
                <textarea
                  placeholder="Hãy chia sẻ cảm nhận của bạn về dịch vụ này với chúng tôi."
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "5px",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                  value={tempReview}
                  onChange={(e) => setTempReview(e.target.value)}
                ></textarea>
                <WordCount>{tempReview.length}/300</WordCount>
              </TextAreaWrapper>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonCPN text="Huỷ" onClick={handleCloseModal} />
          <ButtonCPN text="Gửi" onClick={handleSubmitRating} />
        </ModalFooter>
      </ModalWrapper>
    </div>
  );
};

export default HistoryTicketBill;
