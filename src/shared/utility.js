/* eslint-disable consistent-return */
export function cutString(string, wordsNumber) {
  const howManyWordsStay = wordsNumber - 1;
  const words = string.split(' ');

  let paragraph = [];
  for (let i = 0; i <= howManyWordsStay; i += 1) {
    paragraph.push(words[i]);
    if (i === howManyWordsStay) {
      paragraph.push('...');
      paragraph = paragraph.join(' ');
      return paragraph;
    }
  }
}
