export function parseObject(
  memberString: string,
  object: { [key: string]: string } = {},
): { [key: string]: string } {
  const [key, value] = memberString.split('=');
  object[key] = value;
  return object;
}
