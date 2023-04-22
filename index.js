const app = require('./app');
const config = require('./configs/index');



const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})