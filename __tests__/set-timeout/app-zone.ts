/**
 * Simple async error in setTimeout
 * We will wrap our app with the zone middleware and throw an error in an async timeout
 *
 * Created February 21st, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { createApp } from '../test-utils';

const app = createApp();

app.get('*', function() {
    setTimeout(() => {
        throw new Error('async error');
    }, 0);
});

export default app;
