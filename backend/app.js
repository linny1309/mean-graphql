const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

//const config = require('./config/config.json');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose.set('useFindAndModify', false);

mongoose
  .connect(
    `mongodb://localhost:27017/library?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(3003, console.log('Connected http://localhost:3003/'));
  })
  .catch((err) => console.log(err));
