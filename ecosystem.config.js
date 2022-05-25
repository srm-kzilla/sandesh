module.exports = {
  apps: [
    {
      script: 'yarn start',
      name: 'sandesh-backend',
      watch: false,
    },
    {
      script: 'cd client && yarn start',
      name: 'sandesh-client',
      watch: false,
    },
  ],
};
