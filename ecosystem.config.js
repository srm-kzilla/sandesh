module.exports = {
  apps: [
    {
      script: 'yarn start',
      name: 'sandesh-backend',
      watch: false,
    },
    {
      script: 'cd client && serve -s build -p 5001',
      name: 'sandesh-client',
      watch: false,
    },
  ],
};
