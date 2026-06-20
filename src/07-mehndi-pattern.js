/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  if (typeof char !== 'string' || char === '') return "";
  if (typeof n !== 'number' || isNaN(n) || n <= 0) return "";
  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  const first = arr[0];
  const rest = arr.slice(1);
  let firstVal = 0;
  if (Array.isArray(first)) {
    firstVal = sumNestedArray(first);
  } else if (typeof first === 'number' && !isNaN(first)) {
    firstVal = first;
  }
  return firstVal + sumNestedArray(rest);
}

export function flattenArray(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  if (arr.length === 0) {
    return [];
  }
  const first = arr[0];
  const rest = arr.slice(1);
  let firstFlat = Array.isArray(first) ? flattenArray(first) : [first];
  return firstFlat.concat(flattenArray(rest));
}

export function isPalindrome(str) {
  if (typeof str !== 'string') {
    return false;
  }
  const lower = str.toLowerCase();
  function checkPal(s) {
    if (s.length <= 1) return true;
    if (s.charAt(0) !== s.charAt(s.length - 1)) return false;
    return checkPal(s.slice(1, -1));
  }
  return checkPal(lower);
}

export function generatePattern(n) {
  if (typeof n !== 'number' || isNaN(n) || n <= 0 || !Number.isInteger(n)) {
    return [];
  }
  
  function build(current) {
    if (current > n) return [];
    const line = repeatChar("*", current);
    if (current === n) {
      return [line];
    }
    const rest = build(current + 1);
    return [line, ...rest, line];
  }
  
  return build(1);
}
