/**
 * Start express server as promise
 * so we can easily use it in testing and benchmarking
 *
 * Created February 28th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @copyright: Nerdeez Ltd
 */

import express, { Application } from 'express';
import { Server } from 'http';
import autoCannon from 'autocannon';
import { resolve, dirname } from 'path';
import { promises } from 'fs';
import zoneErrors, { ErrorStrategy } from '..';

export async function startServer(app: Application): Promise<Server> {
    return new Promise(resolve => {
        const server = app.listen(3000, function() {
            resolve(server);
        });
    });
}

export class StamStrategy implements ErrorStrategy {
    handleError = async (): Promise<void> => {
        return;
    };
}

export class StamStrategy2 implements ErrorStrategy {
    handleError = async (): Promise<void> => {
        throw new Error('something happened');
    };
}

export function createApp(isZone = true, withStrategy: ErrorStrategy = null): Application {
    const app = express();

    if (isZone) {
        app.use(
            zoneErrors({
                strategy: withStrategy,
            }),
        );
    }

    return app;
}

export default async function runBenchmarkTest(
    app: Application,
    filename = 'benchmark-report.zone.json',
): Promise<void> {
    const server = await startServer(app);
    const result = await autoCannon({
        url: 'http://localhost:3000',
    });
    server.close();
    await promises.writeFile(
        resolve(require.main?.filename ? dirname(require.main?.filename) : __dirname, filename),
        JSON.stringify(result),
    );
}
