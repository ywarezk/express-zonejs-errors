/**
 * This is our app with the zone for catching errors
 *
 * Created February 28th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 */

import express from 'express';

const app = express();

app.get('*', function(req, res) {
    res.send('hello world');
});

export default app;