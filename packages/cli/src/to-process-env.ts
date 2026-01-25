export function toProcessEnv(object: { [key: string]: string }) {
  const processEnv: NodeJS.ProcessEnv = {};
  Object.keys(object).forEach((key) => (processEnv[key] = object[key]));
  return processEnv;
}
