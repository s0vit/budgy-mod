import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './app/api/api-schema.json',
  apiFile: './app/api/api.ts',
  apiImport: 'api',
  outputFile: './app/api/budgyApi.ts',
  exportName: 'budgyApi',
  hooks: true,
  tag: true,
  useEnumType: true,
};

export default config;
