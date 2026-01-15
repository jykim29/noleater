export const MAX_FILE_COUNT = {
  FEED: 3,
  BOARD: 3,
};

export const MAX_FILE_SIZE = {
  FEED: 2_097_152,
  BOARD: 2_097_152,
};

export const POST_MAX_TEXT_LENGTH = {
  FEED: { CONTENT: 50 },
  BOARD: { TITLE: 30, CONTENT: 100 },
};

export const ALLOWED_FILE_MIME_TYPE = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
];
