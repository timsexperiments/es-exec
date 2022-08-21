import { CliResult, run } from './cli.js';
import { start } from './start.js';
import { setEnv } from './utils/env.js';
import { loadModule, readConfig } from './utils/file.js';

async function main() {
  const cliResult = run();
  // We want to start by overriding the
  setEnv(cliResult.env ?? {});
  // The es-start configuration file in the current directory should be used as
  // the base options.
  const esStartConfig = readConfig<CliResult>('es-start');
  let configModule;
  if (cliResult.config) {
    configModule = loadModule<CliResult>(cliResult.config);
  }
  // The cli result should override all of the other configurations. A specified
  // configuration file is more important than the configuration file in the
  // current working directory.
  const options = {
    ...esStartConfig,
    ...configModule,
    ...cliResult,
    // TODO: Determine if the expected behavior would be to override or to only
    // use the values specified int the cli.
    //
    // Combine the environment variables from the sepcified configurations.
    env: { ...esStartConfig?.env, ...configModule?.env, ...cliResult.env },
  };
  console.error(options);
  // Set process.env based on the combined env value.
  setEnv(options.env);
  await start(options);
}
main().catch((error) => console.error(error));
