let express = require('express');
app = express();
require('dotenv').config();


app.listen(process.env.PORT, () => {
    console.log("Server is running at port 3000");
})