import Config from 'react-native-config';

const rawConfig =
  (Config && typeof Config === 'object' && 'default' in Config
    ? (Config as any).default
    : Config) || {};

export interface IAppConfig {
  API_BASE_URL: string;
  RAPIDAPI_HOST: string;
  RAPIDAPI_KEY: string;
  IMAGE_BASE_URL: string;
}

export const AppConfig: IAppConfig = {
  API_BASE_URL: rawConfig.API_BASE_URL || process.env.API_BASE_URL || '',
  RAPIDAPI_HOST: rawConfig.RAPIDAPI_HOST || process.env.RAPIDAPI_HOST || '',
  RAPIDAPI_KEY: rawConfig.RAPIDAPI_KEY || process.env.RAPIDAPI_KEY || '',
  IMAGE_BASE_URL: rawConfig.IMAGE_BASE_URL || process.env.IMAGE_BASE_URL || '',
};

export default AppConfig;
