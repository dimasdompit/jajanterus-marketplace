export const limitWord = (text = '', limit = 0, maxSize = 0) => {
  return text.length > maxSize ? `${text.substring(0, limit)}...` : text;
}