import axios from "axios";

class PaymentService {
  async initiatePayment(data: {
    amount: number;
    purchaseOrderId: string;
    purchaseOrderName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) {
    const response = await axios.post(
      `${process.env.KHALTI_BASE_URL}/epayment/initiate/`,
      {
        return_url: `${process.env.CLIENT_URL}/payment/success`,
        website_url: process.env.CLIENT_URL,

        amount: data.amount,

        purchase_order_id: data.purchaseOrderId,

        purchase_order_name: data.purchaseOrderName,

        customer_info: {
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
        },
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
  async verifyPayment(pidx: string) {
  const response = await axios.post(
    `${process.env.KHALTI_BASE_URL}/epayment/lookup/`,
    {
      pidx,
    },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
}

export default new PaymentService();