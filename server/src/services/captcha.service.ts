import axios from "axios";

class CaptchaService {
  async verifyCaptcha(token: string) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
      throw new Error("reCAPTCHA secret key is missing.");
    }

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    return response.data.success;
  }
}

export default new CaptchaService();