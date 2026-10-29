const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Smart Task Microservice running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
