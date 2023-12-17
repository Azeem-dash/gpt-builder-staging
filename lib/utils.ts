export function kebabCase(inputText: string) {
  const textWithoutSparkleEmoji = inputText.replace(' ✨', '');
  return textWithoutSparkleEmoji
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .trim();
}
