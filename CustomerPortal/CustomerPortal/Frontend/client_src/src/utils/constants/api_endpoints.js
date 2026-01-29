const { NODE_ENV } = process.env;

export const api_endpoints = {
  IGT_API:
    NODE_ENV === 'production'
      ? "https://instantsshowcase.igt.com/api"
      //  'http://is-api-stage.us-east-1.elasticbeanstalk.com/api'
      : 'http://localhost:7000/api',
};
