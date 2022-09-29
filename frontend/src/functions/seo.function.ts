export function generateHeadTitle(title: string) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return `${appName} | ${title}`;
}

export function generateDescription(description: string) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return `${appName} | ${description}`;
}
