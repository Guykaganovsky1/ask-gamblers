export type SocialLink = {
  key: string;
  label: string;
  shortLabel: string;
  href: string;
  ariaLabel: string;
};

const SOCIAL_LINK_CONFIG = [
  {
    key: "facebook",
    label: "Facebook",
    shortLabel: "f",
    envValue: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
  {
    key: "youtube",
    label: "YouTube",
    shortLabel: "YT",
    envValue: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  },
  {
    key: "instagram",
    label: "Instagram",
    shortLabel: "IG",
    envValue: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  },
  {
    key: "x",
    label: "X",
    shortLabel: "X",
    envValue: process.env.NEXT_PUBLIC_X_URL,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    shortLabel: "in",
    envValue: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  },
];

function normalizeHttpsUrl(value?: string) {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export const SOCIAL_LINKS: SocialLink[] = SOCIAL_LINK_CONFIG.flatMap((link) => {
  const href = normalizeHttpsUrl(link.envValue);
  if (!href) return [];

  return [
    {
      key: link.key,
      label: link.label,
      shortLabel: link.shortLabel,
      href,
      ariaLabel: `Ask Gamblers ב-${link.label}`,
    },
  ];
});

export const SOCIAL_PROFILE_URLS = SOCIAL_LINKS.map((link) => link.href);
