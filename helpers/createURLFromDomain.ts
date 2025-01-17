export const createURLFromDomain = (domain: string): string => {
  if (domain.startsWith('http://') || domain.startsWith('https://')) {
    return domain;
  }

  const parts = domain.split('.');

  if (parts.length > 2) {
    return `https://${domain}`;
  } else {
    return `https://www.${domain}`;
  }
};
