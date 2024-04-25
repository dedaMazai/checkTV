import path from 'path';
import { buildWebpack } from '@krap/config-files/dist/index';
import {
  BuildMode, BuildPaths,
  TypeGlobalVars,
} from '@krap/config-files/dist/webpack/types/config';
import webpack from 'webpack';

const Mode = process.env.NODE_ENV;
const pathEnv = path.resolve(__dirname, 'env', `${Mode}`, '.env');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv')
  .config({ path: pathEnv });

const getPort = (currentPort: string | undefined): number => {
  const defaultPort = 3000;
  const parsedPort = Number(currentPort);
  const portIsNan = Number.isNaN(parsedPort);

  return portIsNan
    ? defaultPort
    : parsedPort;
};

export default () => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };
  const mode = Mode
    ? (Mode as BuildMode)
    : 'development';
  const port = getPort(process.env.PORT);
  const isFederated = process.env.IS_FEDERATED === 'true';
  const federationIp = process.env.FEDERATION_IP;
  const baseUrl = process.env.BASE_URL ?? '/';
  const project = 'frontend';

  const isDev = mode === 'development';

  const globalVars: TypeGlobalVars = {
    __API_LOGIN__: JSON.stringify(process.env.API_LOGIN ?? '/login'),
    __API__: JSON.stringify(process.env.API_URL ?? 'http://localhost:3000'),
    __WS__: JSON.stringify(process.env.WS_URL ?? 'ws://10.96.183.101:8010'),
    __IS_DEV__: JSON.stringify(isDev),
    __PROJECT__: JSON.stringify(project),
    __IS_FEDERATED__: JSON.stringify(isFederated),
    __BASE_URL__: JSON.stringify(baseUrl),
  };


  const config: webpack.Configuration = buildWebpack({
    mode,
    paths,
    port,
    project,
    analyzer: false,
    globalVars,
    publicPath: '/',
  });

  return config;
};
