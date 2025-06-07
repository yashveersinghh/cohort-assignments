/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const sortedstr1 = str1.toLowerCase().split('').sort().join('');
  const sortedstr2 = str2.toLowerCase().split('').sort().join('');

  if (sortedstr1==sortedstr2){
    return true;
    
  }
  else{
    return false;
    
  }
}
const a = isAnagram("yash","hsya")
console.log(a);

module.exports = isAnagram;
