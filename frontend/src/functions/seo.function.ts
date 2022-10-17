import { SITE_SETTINGS } from "src/utils/site.setting";

export function generateHeadTitle(title: string) {
  return `${SITE_SETTINGS.APP_NAME} | ${title}`;
}

export function generateDescription(description: string) {
  return `${SITE_SETTINGS.APP_NAME} | ${description}`;
}
