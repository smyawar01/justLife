/**
 * Strips HTML tags and decodes standard HTML entities from text strings.
 */
export const stripHtml = (text?: string): string => {
  if (!text) return '';
  return text
    .replace(/<[^>]*>?/gm, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
};
