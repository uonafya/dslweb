const express = require('express');
const next = require('next');
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());

    // server.get('/indicators', (req, res) => {
    //     const actualPage = '/indicators';
    //     const queryParams = { search: req.params.search, group: req.params.group };
    //     console.log("queryParams = "+JSON.stringify(queryParams));
    //     app.render(req, res, actualPage, queryParams);
    // });
    server.get('/indicator/:id', (req, res) => {
        const actualPage = '/indicator';
        const queryParams = { id: req.params.id, pe: req.query.pe, ouid: req.query.ouid, level: req.query.level };
        console.log("queryParams = "+JSON.stringify(queryParams));
        app.render(req, res, actualPage, queryParams);
    });
    server.get('/analysis/:id', (req, res) => {
        const actualPage = '/analysis';
        const queryParams = { id: req.params.id, pe: req.query.pe, ouid: req.query.ouid, level: req.query.level };
        console.log("queryParams = "+JSON.stringify(queryParams));
        app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
