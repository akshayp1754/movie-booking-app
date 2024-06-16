import axios from "axios";
import React from "react";
import confirmSeat from "./confirmSeat";
import toast from "react-hot-toast";

const amount = 100;
const currency = "INR";
const receiptId = "1234567890";

const paymentHandler = async (totalPrice, selectedSeats) => {
  console.log(totalPrice);
  try {
    const order = await axios.post("http://localhost:8080/payment/order", {
      amount: totalPrice * 100,
      currency,
      receipt: receiptId,
    });

    console.log(order);

    var options = {
      key: "rzp_test_GePtnxPg44e0v3",
      amount,
      currency,
      name: "Book MY Ticket",
      description: "Test Transaction",
      image:
        "https://securityboat.net/wp-content/uploads/2023/07/SecurityBoat-Logo-e1688233344295.png",
      order_id: order.data.id,
      handler: async (response) => {
        const body = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        console.log(response);
        console.log(response.razorpay_order_id, response.razorpay_payment_id);

        const validateResponse = await axios.post(
          "http://localhost:8080/payment/validate",
          body
        );

        if (validateResponse.status === 200) {
          confirmSeat(selectedSeats);
          toast.success("tickets booked");
        } else {
          console.error("Validation failed:", validateResponse.data);
        }
        console.log("validation: ", validateResponse.data);
      },
      prefill: {
        name: "Akshay Pawar",
        email: "test@example.com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razorpay.open();
  } catch (error) {
    console.log(error.message);
  }
};

export default paymentHandler;
