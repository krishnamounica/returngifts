import 'dotenv/config'; // To use the .env file

export default ({ config }) => ({
  ...config,
  extra: {
    baseUrl: process.env.REACT_APP_BASE_URL || 'https://default-url.com',
  },
  
    "expo": {
      "owner": "krishnasuresh",
      "slug": "first"
    }
  
  
});
