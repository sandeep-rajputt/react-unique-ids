/**
 *
 * @returns {string} Unique user id
 */

export default function reactUniqueIds(request) {
  const upperCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
  const lowerCases = "abcdefghijklmnopqrstuvwxyz"; //26
  const numbers = "1234567890"; //10
  const symbols = "@#$%&*"; //6

  function genUpperCase() {
    return upperCases.charAt(Math.random() * 26);
  }

  function genLowerCase() {
    return lowerCases.charAt(Math.random() * 26);
  }

  function genNumber() {
    return numbers.charAt(Math.random() * 10);
  }

  function genSymbol() {
    return symbols.charAt(Math.random() * 6);
  }

  function genBothCase() {
    const letter = upperCases.concat(lowerCases);
    return letter.charAt(Math.random() * 52);
  }

  function genUpperNumber() {
    const letter = upperCases.concat(numbers);
    return letter.charAt(Math.random() * 36);
  }

  function genUpperSymbol() {
    const letter = upperCases.concat(symbols);
    return letter.charAt(Math.random() * 32);
  }

  function genUpperLowerNumber() {
    const letter = upperCases.concat(lowerCases, numbers);
    return letter.charAt(Math.random() * 62);
  }

  function genUpperLowerSymbol() {
    const letter = upperCases.concat(lowerCases, symbols);
    return letter.charAt(Math.random() * 58);
  }

  function genUpperNumberSymbol() {
    const letter = upperCases.concat(numbers, symbols);
    return letter.charAt(Math.random * 42);
  }

  function genLowerNumber() {
    const letter = lowerCases.concat(numbers);
    return letter.charAt(Math.random() * 36);
  }

  function genLowerSymbol() {
    const letter = lowerCases.concat(symbols);
    return letter.charAt(Math.random() * 32);
  }

  function genLowerNumberSymbol() {
    const letter = lowerCases.concat(numbers, symbols);
    return letter.charAt(Math.random() * 42);
  }

  function genNumberSymbol() {
    const letter = numbers.concat(symbols);
    return letter.charAt(Math.random() * 16);
  }

  function genAny() {
    const letter = upperCases.concat(lowerCases, numbers, symbols);
    return letter.charAt(Math.random() * 68);
  }

  function containsLengthKey() {
    for (let key in request) {
      if (key === "length") {
        return true;
      }
    }
    return false;
  }

  let lowerCase = true;
  let upperCase = true;
  let symbol = true;
  let number = true;

  function requestGenerator(val, type) {
    const localId = [];
    for (let i = 0; i < val; i++) {
      if (type === "number") {
        localId.push(genNumber());
      } else if (type === "uppercase") {
        localId.push(genUpperCase());
      } else if (type === "lowercase") {
        localId.push(genLowerCase());
      } else if (type === "symbol") {
        localId.push(genSymbol());
      } else if (type === "any") {
        localId.push(genAny());
      } else if (type === "typecheck") {
        localId.push(requestTypeChecker());
      }
    }
    return localId.join("");
  }

  function requestTypeChecker() {
    if (upperCase && lowerCase && number && symbol) {
      return genAny();
    } else if (!upperCase && lowerCase && number && symbol) {
      return genLowerNumberSymbol();
    } else if (!upperCase && !lowerCase && number && symbol) {
      return genNumberSymbol();
    } else if (!upperCase && lowerCase && !number && symbol) {
      return genLowerSymbol();
    } else if (!upperCase && lowerCase && number && !symbol) {
      return genLowerNumber();
    } else if (!upperCase && !lowerCase && !number && symbol) {
      return genSymbol();
    } else if (!upperCase && lowerCase && !number && !symbol) {
      return genLowerCase();
    } else if (upperCase && !lowerCase && !number && !symbol) {
      return genUpperCase();
    } else if (!upperCase && !lowerCase && number && !symbol) {
      return genNumber();
    } else if (upperCase && !lowerCase && number && symbol) {
      return genUpperNumberSymbol();
    } else if (upperCase && !lowerCase && !number && symbol) {
      return genUpperSymbol();
    } else if (upperCase && !lowerCase && number && !symbol) {
      return genUpperNumber();
    } else if (upperCase && lowerCase && !number && symbol) {
      return genUpperLowerSymbol();
    } else if (upperCase && lowerCase && !number && !symbol) {
      return genBothCase();
    } else if (upperCase && lowerCase && number && !symbol) {
      return genUpperLowerNumber();
    }
  }

  let length = 0;
  if (typeof request === "undefined" || typeof request === "number") {
    length = typeof request === "number" ? request : 20;
    return requestGenerator(length, "any");
  }

  function checkKeys() {
    for (let key in request) {
      if (
        !(
          key === "length" ||
          key === "uppercase" ||
          key === "lowercase" ||
          key === "number" ||
          key === "symbol" ||
          key === "separater"
        )
      ) {
        return true;
      }
    }
    return false;
  }

  function checkLengthArray() {
    request.length.map((item, index) => {
      if (
        typeof item !== "number" &&
        item !== "number" &&
        item !== "uppercase" &&
        item !== "lowercase" &&
        item !== "symbol" &&
        item !== "bothcase"
      ) {
        throw `Length arrar only accept number type or "number", "uppercase", "lowercase", "symbol", "bothcase, `;
      } else if (
        typeof item === "string" &&
        typeof request.length[index + 1] === "string"
      ) {
        throw `Don't provide 2 strings next to another`;
      }
    });
  }

  function checkKeysType() {
    for (let key in request) {
      if (key === "length") {
        if (
          typeof request[key] !== "number" &&
          !Array.isArray(request.length)
        ) {
          console.log("length is not any array or number");
          throw `Length type must array or number`;
        } else if (
          Array.isArray(request.length) &&
          typeof request.length[0] !== "number"
        ) {
          throw `length 1st item must be number type in [${request.length}]`;
        } else {
          if (Array.isArray(request.length)) {
            checkLengthArray();
          }
        }
      } else if (
        key === "uppercase" ||
        key === "lowercase" ||
        key === "number" ||
        key === "symbol"
      ) {
        if (typeof request[key] !== "boolean") {
          throw `Provide ${key} as true or false`;
        }
      } else if (key === "seperator") {
        if (typeof request.key !== "string") {
          throw `Provide seperator as a string; like "-", "*" etc.`;
        } else if (key.length > 1) {
          throw `Provide us Single separater "-", "*" etc.`;
        }
      }
    }
  }

  if (typeof request === "object") {
    if (checkKeys()) {
      throw `object accept "length", "uppercase", "lowercase", "symbol", "number", "separater" perameters only`;
    }
    checkKeysType();

    lowerCase =
      typeof request.lowercase === "undefined" ? true : request.lowercase;

    upperCase =
      typeof request.uppercase === "undefined" ? true : request.uppercase;
    number = typeof request.number === "undefined" ? true : request.number;
    symbol = typeof request.symbol === "undefined" ? true : request.symbol;

    const separater =
      typeof request.separater === "undefined" ? "-" : request.separater;

    if (!lowerCase && !upperCase && !number && !symbol) {
      lowerCase = true;
    }

    if (typeof request.length === "undefined") {
      length = 20;
      return requestGenerator(length, "typecheck");
    } else if (typeof request.length === "number") {
      length = request.length;
      return requestGenerator(length, "typecheck");
    } else if (Array.isArray(request.length)) {
      const localId = [];
      request.length.map((item, index) => {
        if (typeof item === "number") {
          if (typeof request.length[index + 1] === "string") {
            localId.push(requestGenerator(item, request.length[index + 1]));
          } else {
            localId.push(requestGenerator(item, "typecheck"));
          }
          if (index < request.length.length - 2) {
            localId.push(separater);
          }
        }
      });

      return localId.join("");
    }
  } else {
    throw `Type Error: Provide number or object in place of "${request}"\n for more info, visit https://google.com `;
  }
}
