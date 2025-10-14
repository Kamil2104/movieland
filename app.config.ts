import 'dotenv/config';

export default {
  expo: {
    name: "Movieland",
    slug: "movieland",
    version: "1.0.0",
    extra: {
      API_URL: process.env.API_URL
    }
  }
};