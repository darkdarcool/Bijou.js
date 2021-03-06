/**
 * @file bijou.js
 * @author Explosion-Scratch, Bijou.js contributors
 * @since v1.0.0
 * @copyright © Explosion-Scratch and GrahamSH, All rights reserved.
 */

/* --------------------------------------------------------------------------|
  ____ ___    _  ___  _   _   _     
 | __ )_ _|  | |/ _ \| | | | (_)___ 
 |  _ \| |_  | | | | | | | | | / __|
 | |_) | | |_| | |_| | |_| | | \__ \
 |____/___\___/ \___/ \___(_)/ |___/
                           |__/     
------------------------------------------------------------------------------|
Bijou.js is copyrighted by Explosion-Scratch and GrahamSH-LLK of GitHub and released under the MIT license.
This software comes with ABSOLUTELY NO WARRANTY and is provided "As is" (with the best intentions of Explosion-Scratch and contributors! =D )

-----------------------------------------------------------------------------|
   ____ ___  _   _ _____ ____  ___ ____  _   _ _____ ___  ____  ____
  / ___/ _ \| \ | |_   _|  _ \|_ _| __ )| | | |_   _/ _ \|  _ \/ ___|
 | |  | | | |  \| | | | | |_) || ||  _ \| | | | | || | | | |_) \___ \
 | |__| |_| | |\  | | | |  _ < | || |_) | |_| | | || |_| |  _ < ___) |
  \____\___/|_| \_| |_| |_| \_\___|____/ \___/  |_| \___/|_| \_\____/
-----------------------------------------------------------------------------|
Contributors to Bijou.js:
╔═══════════════════╦════════════════════════════╗
║ GITHUB USERNAME   ║ CONTRIBUTIONS              ║
╠═══════════════════╬════════════════════════════╣
║ Explosion-Scratch ║ Founder and creator of     ║
║                   ║ Bijou.js, over 1500        ║
║                   ║ commits to the source      ║
║                   ║ repository.                ║
╠═══════════════════╬════════════════════════════╣
║ GrahamSH-LLK      ║ Great guy, contributed     ║
║                   ║ a ton towards the          ║
║                   ║ development of this        ║
║                   ║ project. He fixed glitches ║
║                   ║ suggested new features,    ║
║                   ║ and helped publish this    ║
║                   ║ to NPM and fix the GitHub  ║
║                   ║ actions on the project.    ║
╠═══════════════════╬════════════════════════════╣
║ Touchcreator      ║ Pointed out several bugs   ║
║                   ║ in Bijou.js and suggested  ║
║                   ║ several new features.      ║
╠═══════════════════╬════════════════════════════╣
║ TheColaber        ║ Collaborated?? (lol)       ║
║                   ║ Fixed tons of bugs         ║
╠═══════════════════╬════════════════════════════╣
║ Hans5958          ║ Helped fix glitches in the ║
║                   ║ website and suggested      ║
║                   ║ fixes for GitHub actions   ║
║                   ║ glitches.                  ║
╠═══════════════════╬════════════════════════════╣
║ YOYITsM3M8        ║ Suggested a lot of         ║
║ (AKA retronbv)    ║ features and bug fixes.    ║
╚═══════════════════╩════════════════════════════╝


(c) 2021 Explosion-Scratch, all rights reserved.

 */
/**
 * @description Tests if the user is using Node.js or not and throws an error in specific functions (that require the DOM) if they are.
 */
let isNode = false;
if (typeof window === "undefined" || typeof document === "undefined") {
  isNode = true;
} else {
  isNode = false;
}

if (isNode) {
  console.warn(
    "There is no document element in Node, some functions of bijou.js will not work. If you need these functions consider using a package like jsDom to recreate the document element."
  );
}
/**
 * Bijou.js source object. It contains all the functions of Bijou.
 * @type {Object}
 * @namespace bijou
 * @author Explosion-Scratch, Bijou.js contributors
 */

let _temp = {
  /**
   * Gives an array of prime numbers up to a certain one.
   * @function
   * @memberOf bijou
   * @param {Number} num - The number to give primes to.
   * @example
   * _$.primesTo(100);//Returns an array of prime numbers up to 100.
   * @returns {Array} Returns an array of prime numbers up to the given number.
   */
  primesTo: (num) => {
    let arr = Array.from({
      length: num - 1,
    }).map((x, i) => i + 2),
      sqroot = Math.floor(Math.sqrt(num)),
      numsTillSqroot = Array.from({
        length: sqroot - 1,
      }).map((x, i) => i + 2);
    numsTillSqroot.forEach(
      (x) => (arr = arr.filter((y) => y % x !== 0 || y === x))
    );
    return arr;
  },
  /**
   * Runs a function asynchronously in a web worker.
   * @function
   * @memberOf bijou
   * @param {Function} fn The function to run
   * @example
   * _$.async(() => {console.log("Function!"); return "hello"});//Returns a promise that resolves into "hello".
   * @returns {Promise} A promise that resolves into the return value of the function.
   */
  async: (fn) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
        type: "application/javascript; charset=utf-8",
      })
    );
    return new Promise((res, rej) => {
      worker.onmessage = ({ data }) => {
        res(data), worker.terminate();
      };
      worker.onerror = (err) => {
        rej(err), worker.terminate();
      };
    });
  },
  /**
   * Formats a number of milliseconds
   * @function
   * @memberOf bijou
   * @param {Number} ms The number of milliseconds to format to a string.
   * @example
   * _$.formatMilliseconds(4000);//Returns "4 seconds"
   * @returns {Array}
   */
  formatMilliseconds: (ms) => {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000,
    };
    return Object.entries(time)
      .filter((val) => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
      .join(", ");
  },
  /**
   * Adds the specified styles to the element specified.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to add the styles to.
   * @param {Object} styles An object that represents the styles to be added. (camelCased)
   * @example
   * _$.addStyles(document.documentElement, {backgroundColor: "#101010", color: "white"})
   * @returns {Object} the assigned object.
   */
  addStyles: (el, styles) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    return Object.assign(el.style, styles);
  },
  /**
   * Returns the callback when a a click is registered outside the selected element
   * @function
   * @memberOf bijou
   * @param {Element} element The element to use as the outsideclick element.
   * @param {Function} callback The function to run when a click is registered outside the specified element.
   * @example
   * _$.onOutsideClick(document.querySelector("div"), () => {alert("You clicked outside the DIV!")});
   * @returns {Function} the function that was called.
   */
  onOutsideClick: (element, callback) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    document.addEventListener("click", (e) => {
      if (!element.contains(e.target)) callback();
    });
    return callback;
  },
  /**
   * Returns the callback when the user stops scrolling.
   * @function
   * @memberOf bijou
   * @param {Function} callback The callback to call when the user stops scrolling.
   * @example
   * _$.onScrollStop(() => {alert("You stopped scrolling!")})
   * @returns {undefined} Returns undefined.
   */
  onScrollStop: (callback) => {
    let isScrolling;
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    window.addEventListener(
      "scroll",
      (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback(e);
        }, 150);
      },
      false
    );
  },
  /**
   * Copies the string inputted the clipboard.
   * @function
   * @memberOf bijou
   * @param {String} str The string to copy.
   * @example
   * _$.copy("Hello world")
   * @returns {String} The string copied.
   */
  copy: (str) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    return str;
  },
  /**
  * Only runs the input function at MAX with the delay specified.
  * @function
  * @memberOf bijou
  * @param {Function} fn The function to run.
  * @param {Number} wait The number of milliseconds to wait.
  * @example
  * setInterval(() => {
    _$.throttle(() => {
      alert("Hello")
    }, 500)
  }, 1)
  * @returns {Array}
  */
  throttle: (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function () {
      const context = this,
        args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        lastTime = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFn);
        lastFn = setTimeout(function () {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        }, Math.max(wait - (Date.now() - lastTime), 0));
      }
    };
  },
  /**
   * Creates an HTML element from the specified string.
   * @function
   * @memberOf bijou
   * @param {String} str The string of the HTML element to create.
   * @example
   * //Returns a div with an id of "id_here" and innerText of "Testing!"
   * _$.createElement("<div id='id_here'>Testing!</div>");
   * @returns {Element} The created element.
   */
  createElement: (str) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    const el = document.createElement("div");
    el.innerHTML = str;
    return el.firstElementChild;
  },
  /**
   * Returns the browser that the user is using.
   * @function
   * @memberOf bijou
   * @example
   * _$.browser();//For me this (correctly) returns "Chrome"
   * @returns {String} A string of the browser name that the user is using.
   */
  browser: () => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    var isOpera =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0;
    var isFirefox = typeof InstallTrigger !== "undefined";
    var isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
        (typeof safari !== "undefined" && window["safari"].pushNotification)
      );
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    if (isOpera) {
      return "Opera";
    }
    if (isFirefox) {
      return "Firefox";
    }
    if (isSafari) {
      return "Safari";
    }
    if (isEdge) {
      return "Edge";
    }
    if (isIE) {
      return "Internet Explorer";
    }
    if (isChrome) {
      return "Chrome";
    }
    if (isEdgeChromium) {
      return "Edge Chromium";
    }
    if (isBlink) {
      return "Blink";
    }
  },
  /**
   * Displays a desktop notification with the specified text.
   * @function
   * @memberOf bijou
   * @param {String} text The title of the notification.
   * @param {String} body The body of the notification.
   * @param {String} icon The url to the image for the icon of the notification.
   * @example
   * _$.notify("Hello", "Hi there! This is a notification!");//Returns an array of prime numbers up to 100.
   * @returns undefined
   */
  notify: (text, body, icon) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    if (!window.Notification) {
      console.log("Browser does not support notifications.");
    } else {
      if (Notification.permission === "granted") {
        var notify = new Notification(text, {
          body: body,
          icon: icon,
        });
      } else {
        Notification.requestPermission()
          .then(function (p) {
            if (p === "granted") {
              var notify = new Notification(text, {
                body: body,
                icon: icon,
              });
            } else {
              console.log("User blocked notifications.");
            }
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    }
  },
  /**
   * Returns the name of the weekday from the Date object specified.
   * @function
   * @memberOf bijou
   * @param {Date} date The date object to use.
   * @param {String} [locale=en-US] The locale to use.
   * @example
   * _$.primesTo(100);//Returns an array of prime numbers up to 100.
   * @returns {String} The day name from the date.
   */
  dayName: (date, locale = "en-US") =>
    date.toLocaleDateString(locale, {
      weekday: "long",
    }),
  /**
   * Converts JSON to a CSV string
   * @function
   * @memberOf bijou
   * @param {Array} arr The array of objects to convert to CSV.
   * @param {String} columns The number of columns to use.
   * @param {String} [delimiter=","] The delimiter between cells, by default this is a comma.
   * @example
   * _$.jsonToCsv(
    [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
    ['a', 'b']
  ); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
   * @returns {String} The string of comma separated values (CSV) created from the JSON.
   */
  jsonToCsv: (arr, columns, delimiter = ",") =>
    [
      columns.join(delimiter),
      ...arr.map((obj) =>
        columns.reduce(
          (acc, key) =>
            `${acc}${!acc.length ? "" : delimiter}"${
            !obj[key] ? "" : obj[key]
            }"`,
          ""
        )
      ),
    ].join("\n"),
  /**
   * Joins two arrays together and removes duplicates.
   * @function
   * @memberOf bijou
   * @param {Array} x The first array to join.
   * @param {Array} y The second array to join.
   * @example
   * _$.unionArrays([1,2,3], [4,5,6]);//Returns [1,2,3,4,5,6]
   * @returns {Array} The joined array from the two other arrays.
   */
  unionArrays: (x, y) => {
    var obj = {};
    for (var i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
    for (var i = y.length - 1; i >= 0; --i) obj[y[i]] = y[i];
    var res = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) res.push(obj[k]);
    }
    return res;
  },
  /**
   * For each item in an array, run a callback with it.
   * @function
   * @memberOf bijou
   * @param {Array} array The array of items to run the callback with.
   * @param {Function} callback The callback function to run on the array items.
   * @example
   * _$.each(new Array(40), (i) => console.log(i));//Logs the numbers up to 40.
   * @returns undefined
   */
  each: (array, callback) => {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  },
  /**
   * Maps the keys of an object.
   * @function
   * @memberOf bijou
   * @param {Object} obj The object to map.
   * @param {Function} fn The function to run (passed the current key of the object) which returns the new value from that key.
   * @example
   * _$.mapObjectKeys({something: "A value", anotherThing: "Another value!"}, (key) => key.toUpperCase());
   * //Returns {SOMETHING: "A value", ANOTHERTHING: "Another value!"}
   * @returns {Object} The new Object.
   */
  mapObjectKeys: (obj, fn) =>
    Array.isArray(obj)
      ? obj.map((val) => _$.mapObjectKeys(val, fn))
      : typeof obj === "object"
        ? Object.keys(obj).reduce((acc, current) => {
          const key = fn(current);
          const val = obj[current];
          acc[key] =
            val !== null && typeof val === "object"
              ? _$.mapObjectKeys(val, fn)
              : val;
          return acc;
        }, {})
        : obj,
  /**
   * Converts an array to CSV (Comma separated values) data.
   * @function
   * @memberOf bijou
   * @param {Array} arr The array to convert.
   * @param {String} [delimiter=,] The separator (By default this is a comma.)
   * @example
   * _$.arrayToCSV([1,2,3,4]);//Returns "1,2,3,4"
   * @returns {String} The comma separated array.
   */
  arrayToCSV: (arr, delimiter = ",") =>
    arr
      .map((v) =>
        v
          .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
          .join(delimiter)
      )
      .join("\n"),
  /**
   * averageBy
   * @function
   * @memberOf bijou
   * @param {Array.<number>} arr The array to average
   * @param {Function} fn The function to apply to each item of the array.
   * @example
   * //Averages the array 1,2,3,4 after squaring each number.
   * _$.averageBy([1,2,3,4], (v) => v ** 2);
   * @returns {Number} The average of the array.
   */
  averageBy: (arr, fn) =>
    arr
      .map(typeof fn === "function" ? fn : (val) => val[fn])
      .reduce((acc, val) => acc + val, 0) / arr.length,
  /**
   * Tests whether the specified element is fully in view.
   * @function
   * @memberOf bijou
   * @param {Element} el The DOM element to test.
   * @example
   * //Alerts "In view!" if the first <div> in the document is in view.
   * if (_$.inView(document.querySelector("div"))) alert("In view!");
   * @returns {Boolean} Whether the element is completely in view.
   */
  inView: (el) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      top + height <= window.pageYOffset + window.innerHeight &&
      left + width <= window.pageXOffset + window.innerWidth
    );
  },
  /**
   * Tests if the given DOM element is partially (or fully) in view.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to test.
   * @example
   * //Alerts "In view!" if the first <div> in the document is partially or fully view.
   * if (_$.inPartialView(document.querySelector("div"))) alert("In view!");
   * @returns {Boolean} Whether the DOM element is partially in view.
   */
  inPartialView: (el) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  },
  /**
   * Converts a form to URL queries using the name attribute.
   * @function
   * @memberOf bijou
   * @param {Element} form The form element.
   * @returns {String} The string of url queries (Excluding the hostname and path) of the form data.
   */
  serializeForm: (form) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    return Array.from(new FormData(form), (field) =>
      field.map(encodeURIComponent).join("=")
    ).join("&");
  },
  /**
   * Converts a form to an Object.
   * @function
   * @memberOf bijou
   * @param {Element} form The form element.
   * @example
   * //
   * @returns {Object} The object of form data (The keys are the "name" attributes of the form inputs and the values are the value attributes of the form data.)
   */
  formToObject: (form) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    return Array.from(new FormData(form)).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }));
  },
  /**
   * Generates a unique ID from a seed
   * @function
   * @memberOf bijou
   * @param {Number|String} [seed=Math.random()] The seed to use.
   * @example
   * _$.uuid();//Returns a uuid!
   * @returns {String} The UUID
   */
  uuid: (seed = Math.random()) => {
    if (typeof seed === "string") {
      // Convert string to a number between 0 and 1
      seed = _temp.hashString(seed) / 10000000000000000;
    }
    function _p8(s) {
      var p = (seed.toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  },
  /**
   * Escapes a string of HTML
   * @function
   * @memberOf bijou
   * @param {String} str The string of HTML to escape.
   * @example
   * _$.escapeHTML("<div>"); Returns the escaped HTML: "&lt;div&gt;"
   * @returns {String} The escaped HTML.
   */
  escapeHTML: (str) =>
    str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[tag] || tag)
    ),
  /**
   * Unescapes a string of HTML
   * @function
   * @memberOf bijou
   * @param {String} str The string of HTML to unescape.
   * @example
   * _$.unescapeHTML("&lt;div&gt;");//Returns "<div>"
   * @returns {String} The unescaped HTML.
   */
  unescapeHTML: (str) =>
    str.replace(
      /&amp;|&lt;|&gt;|&#39;|&quot;/g,
      (tag) =>
        ({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&#39;": "'",
          "&quot;": '"',
        }[tag] || tag)
    ),
  /**
   * Returns the previous page that the user visited.
   * @function
   * @memberOf bijou
   * @example
   * _$.previousPage()
   * @returns {String} The url of the previous page the user visited.
   */
  previousPage: () => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    return document.referrer || window.location.href;
  },
  /**
   * Replaces the text in an element by running it through a callback.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to replace the text of.
   * @param {Function} callback The callback to run (Gets passed the element's text).
   * @example
   * _$.replaceText(document.querySelector("div"), (text) => text.toUpperCase());
   * //Converts the text of the first <div> element to upperCase.
   * @returns {String} The element who's text was replaced.
   */
  replaceText: (el, callback) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    for (
      var e,
      t = (function () {
        for (var e, t = el, o = [], a = 0; a < t.length; a++)
          (e = t[a].childNodes[0]),
            t[a].hasChildNodes() && 3 == e.nodeType && o.push(e);
        return o;
      })(),
      o = 0,
      a = t.length;
      o < a;
      o++
    )
      (e = t[o].nodeValue), (t[o].nodeValue = callback(e));
    return el;
  },
  /**
   * Times the function passed.
   * @function
   * @memberOf bijou
   * @param {Function} fn The function to run and time.
   * @param {String} [name=_$ function timer]
   * @example
   * //Times how long it took the user to enter their name.
   * _$.timeFunction(() => prompt("What's your name?"));
   * @returns undefined
   */
  timeFunction: (fn, name = "_$ function timer") => {
    console.time(name);
    fn();
    console.timeEnd(name);
  },
  /**
   * Sorts an object alphabetically by its keys.
   * @function
   * @memberOf bijou
   * @param {Object} obj The object to sort.
   * @example
   * let object = _$.sortObj({testing: "A value", anotherThing: "Another value!"});
   * // The object is now {anotherThing: "Another value!", testing: "A value"}
   * @returns {Object} The sorted object.
   */
  sortObj: (obj) => {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  },
  /**
   * Returns the last space in the string given replaced with "&nbsp;"
   * @function
   * @memberOf bijou
   * @param {String} text The string to replace
   * @example
   * document.querySelector("h1").innerHTML = _$.widows(document.querySelector("h1").innerHTML);
   * //Replaces the last space in the <h1>'s innerText with "&nbsp;"
   * @returns {String} The replaced string.
   */
  widows: (text) => {
    var wordArray = text.split(" ");
    var finalTitle = "";
    for (var i = 0; i <= wordArray.length - 1; i++) {
      finalTitle += wordArray[i];
      if (i == wordArray.length - 2) {
        finalTitle += "&nbsp;";
      } else {
        finalTitle += " ";
      }
    }
    return finalTitle;
  },
  /**
   * Generates a random hex color.
   * @function
   * @memberOf bijou
   * @example
   * document.querySelector("div").style.backgroundColor = _$.randomColor()
   * @returns {String} A random Hex color
   */
  randomColor: () => "#" + Math.floor(Math.random() * 16777215).toString(16),
  /**
   * Lighten or darken a color by a certain amount
   * @function
   * @memberOf bijou
   * @param {String} color The color to lighten/darken
   * @param {Number} amt The amount to lighten the color.
   * @example
   * _$.lightenColor("#000000", 50);//Lightens black by 50 (Out of 255)
   * @returns {String} The color lightened.
   */
  lightenColor: (col, amt) => {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  },
  /**
  * Tests if a color is light or dark and returns an object representation.
  * @function
  * @memberOf bijou
  * @param
  * @example
  * if (_$.lightOrDark("#333333").lightOrDark === 'dark'){
    document.querySelector("DIV").style.color = "white";
  } else {
      document.querySelector("DIV").style.color = "black";
  }
  * @returns {Object} An object that represents if the color is light or dark and how much. The object key "hsp" represents a value out of 255 of how light the color is and the object's key "lightOrDark" is a string (Either "light" or "dark") of whether the color is light or dark.
  */
  lightOrDark: (color) => {
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    if (hsp > 127.5) {
      return { lightOrDark: "light", hsp: hsp };
    } else {
      return { lightOrDark: "dark", hsp: hsp };
    }
  },
  /**
   * Gets a property from the computed style of an element.
   * @function
   * @memberOf bijou
   * @param {Element} el The element whose styles to get.
   * @param {String} prop The css-property value to get of the styles.
   * @example
   * console.log(_$.compStyle(document.documentElement, "background-color"));
   * @returns {String} The computed style property for the element specified.
   */
  compStyle: (el, prop) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    var computedStyles = window.getComputedStyle(el);
    return computedStyles.getPropertyValue(prop);
  },
  rgbToHex: (rgb) => {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
  },
  /**
   * Converts a hex code to a RGB color.
   * @function
   * @memberOf bijou
   * @param {String} hex The hex code to convert.
   * @returns {String} The RGB color converted from the hex code.
   */
  hexToRGB: (hex) => {
    let alpha = false,
      h = hex.slice(hex.startsWith("#") ? 1 : 0);
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
      "rgb" +
      (alpha ? "a" : "") +
      "(" +
      (h >>> (alpha ? 24 : 16)) +
      ", " +
      ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      ", " +
      ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `, ${h & 0x000000ff}` : "") +
      ")"
    );
  },
  /**
   * Generates a querySelector for an element passed in.
   * @function
   * @memberOf bijou
   * @param {Element} elem The element to generate the querySelector for.
   * @example
   * const textarea = document.getElementById('textarea');
   * console.log(_$.querySelector(textarea)); //Logs "#textarea" to the console.
   * @returns {String} The generated querySelector.
   */
  querySelector: (elem) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    var element = elem;
    var str = "";

    function loop(element) {
      if (
        element.getAttribute("id") &&
        document.querySelectorAll(`#${element.getAttribute("id")}`).length === 1
      ) {
        str = str.replace(/^/, " #" + element.getAttribute("id"));
        str = str.replace(/\s/, "");
        str = str.replace(/\s/g, " > ");
        return str;
      }
      if (document.body === element) {
        str = str.replace(/^/, " body");
        str = str.replace(/\s/, "");
        str = str.replace(/\s/g, " > ");
        return str;
      }
      if (element.getAttribute("class")) {
        var elemClasses = ".";
        elemClasses += element.getAttribute("class");
        elemClasses = elemClasses.replace(/\s/g, ".");
        elemClasses = elemClasses.replace(/^/g, " ");
        var classNth = "";
        var childrens = element.parentNode.children;

        if (childrens.length < 2) {
          return;
        }

        var similarClasses = [];

        for (var i = 0; i < childrens.length; i++) {
          if (
            element.getAttribute("class") == childrens[i].getAttribute("class")
          ) {
            similarClasses.push(childrens[i]);
          }
        }

        if (similarClasses.length > 1) {
          for (var j = 0; j < similarClasses.length; j++) {
            if (element === similarClasses[j]) {
              j++;
              classNth = ":nth-of-type(" + j + ")";
              break;
            }
          }
        }

        str = str.replace(/^/, elemClasses + classNth);
      } else {
        var name = element.nodeName;
        name = name.toLowerCase();
        var nodeNth = "";

        var childrens = element.parentNode.children;

        if (childrens.length > 2) {
          var similarNodes = [];

          for (var i = 0; i < childrens.length; i++) {
            if (element.nodeName == childrens[i].nodeName) {
              similarNodes.push(childrens[i]);
            }
          }

          if (similarNodes.length > 1) {
            for (var j = 0; j < similarNodes.length; j++) {
              if (element === similarNodes[j]) {
                j++;
                nodeNth = ":nth-of-type(" + j + ")";
                break;
              }
            }
          }
        }

        str = str.replace(/^/, " " + name + nodeNth);
      }

      if (element.parentNode) {
        loop(element.parentNode);
      } else {
        str = str.replace(/\s/g, " > ");
        str = str.replace(/\s/, "");
        return str;
      }
    }

    loop(element);

    return str;
  },
  /**
   * Removes comments from the element or string of code specified.
   * @function
   * @memberOf bijou
   * @param {Element|String} el The element or string or code to remove comments from.
   * @example
   * _$.removeComments(document.documentElement);//Removes the comments from the document element.
   * @returns {String|Element} The string removed of comments or the element removed of comments.
   */
  removeComments: (el) => {
    if (typeof el === "element") {
      if (isNode) {
        throw new Error(
          "No document element! (You are probably using Node.js)"
        );
      }
      el.innerHTML = el.innerHTML.replace(
        /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,
        ""
      );
      return el;
    } else if (typeof el === "string") {
      return string.replace(
        /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,
        ""
      );
    }
  },
  /**
   * Generates a random number between a minimum and maximum number
   * @function
   * @memberOf bijou
   * @param {Number} min The lowest number that the random value generated can be.
   * @param {Number} max The highest number that the random value generated can be.
   * @param {Number} [round=true] Weather to round the generated number
   * @param {Number} [seed=Math.random()] The seed for the generated number (Between 0 and 1).
   * @returns {Number} The random numebr generated.
   */
  random: (min, max, round = true, seed = Math.random()) => {
    if (round) {
      return Math.floor(seed * (max - min + 1) + min);
    } else {
      return Math.random() * (max - min + 1) + min;
    }
  },
  /**
   * Get a random number from a seed.
   * @function
   * @memberOf bijou
   * @param {Number} seed The seed to use to generate random numbers.
   * @example
   * console.log(_$.seedRandom(13));
   * @returns {Number} The random number from the seed.
   */
  seedRandom: (seed) => {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  },
  /**
  * Removes duplicates from an array
  * @function
  * @memberOf bijou
  * @param {Array} array The array to remove duplicates from.
  * @example
  * let an_array = [1,1,2,3,4,5,5,6]
  an_array = _$.uniqueArray(an_array);
  //Now an_array is [1,2,3,4,5,6]
  * @returns {Array} The array with no duplicates.
  */
  uniqueArray: (array) => [...new Set(array)],
  /**
   * Formats a number by adding commas to it.
   * @function
   * @memberOf bijou
   * @param {Number} n The number to format.
   * @example
   * console.log(_$.formatNumber(100000000)); Logs "100,000,000 to the console."
   * @returns {String} The formatted string representation of the number.
   */
  formatNumber: (n) => n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
  /**
   * Splices an array buffer
   * @function
   * @memberOf bijou
   */
  spliceArrayBuffer: (arr, start, end, endian) => {
    endian = endian || false;
    var direction = endian ? -1 : 1;
    if (endian) [start, end] = [end, start];
    start = Math.floor(start);
    end = Math.floor(end) + direction;
    for (var i = start, value = 0; i != end; i += direction)
      value = 256 * value + arr[i];
    return value;
  },
  /**
   * Undoes camelCase.
   * @function
   * @memberOf bijou
   * @param {String} str The string to camelCase.
   * @example
   * console.log(_$.unCamelCase("helloWorld"));//Logs "Hello World" to the console.
   * @returns {String} The string of unCamelCased code.
   */
  unCamelCase: function (str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      .replace(/^./, function (s) {
        return s.toUpperCase();
      });
  },
  /**
   * Parses the string of HTML specified and returns an HTML element of it.
   * @function
   * @memberOf bijou
   * @param {String} string The HTML string to parse.
   * @param {String} [mimeType=text/html] The mimeType of the string.
   * @example
   * let html = _$.parseHTML("<div id='hello'><textarea></textarea></div>");
   * html.querySelector("textarea");//Returns the textarea!
   * @returns {Element} The HTML document element of the HTML string specified.
   */
  parseHTML: (string, mimeType = "text/html") => {
    const domparser = new DOMParser();
    return domparser.parseFromString(string, mimeType);
  },
  /**
   * Syntax highlights a string of code.
   * @function
   * @memberOf bijou
   * @param {String} string The string of HTML to highlight.
   * @param {String} [mode=html] The mode to use for highlighting. (CSS, JS or HTML).
   * @example
   * _$.syntaxHighlight('alert(\"Hello\")', 'js');//Returns html of the syntax highlighted version.
   * @returns {String} The highlighted string of code as HTML code.
   */
  syntaxHighlight: (string, mode = "html", colors = {}) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    let el = document.createElement("DIV");
    el.innerText = string;
    let highlightel = (elmnt, mode, colors = {}) => {
      if (isNode) {
        throw new Error(
          "No document element! (You are probably using Node.js)"
        );
      }
      // Credit to w3schools for this
      var lang = mode || "html";
      var elmntObj = document.getElementById(elmnt) || elmnt;
      var elmntTxt = elmntObj.innerHTML;
      var tagcolor = colors.tagColor || "mediumblue";
      var tagnamecolor = colors.tagNameColor || "brown";
      var attributecolor = colors.attributeColor || "red";
      var attributevaluecolor = colors.attributeValueColor || "mediumblue";
      var commentcolor = colors.commentColor || "green";
      var cssselectorcolor = colors.cssSelectorColor || "brown";
      var csspropertycolor = colors.cssPropertyColor || "red";
      var csspropertyvaluecolor = colors.cssPropertyValueColor || "mediumblue";
      var cssdelimitercolor = colors.cssLimiterColor || "black";
      var cssimportantcolor = colors.cssImportantColor || "red";
      var jscolor = colors.jsColor || "black";
      var jskeywordcolor = colors.jsKeywordColor || "mediumblue";
      var jsstringcolor = colors.jsStringColor || "brown";
      var jsnumbercolor = colors.jsNumberColor || "red";
      var jspropertycolor = colors.jsPropertyColor || "black";
      elmntObj.style.fontFamily =
        colors.fontFamily || "Consolas,'Courier New', monospace";
      if (!lang) {
        lang = "html";
      }
      if (lang == "html") {
        elmntTxt = htmlMode(elmntTxt);
      }
      if (lang == "css") {
        elmntTxt = cssMode(elmntTxt);
      }
      if (lang == "js") {
        elmntTxt = jsMode(elmntTxt);
      }
      elmntObj.innerHTML = elmntTxt;

      function extract(str, start, end, func, repl) {
        var s,
          e,
          d = "",
          a = [];
        while (str.search(start) > -1) {
          s = str.search(start);
          e = str.indexOf(end, s);
          if (e == -1) {
            e = str.length;
          }
          if (repl) {
            a.push(func(str.substring(s, e + end.length)));
            str = str.substring(0, s) + repl + str.substr(e + end.length);
          } else {
            d += str.substring(0, s);
            d += func(str.substring(s, e + end.length));
            str = str.substr(e + end.length);
          }
        }
        this.rest = d + str;
        this.arr = a;
      }
      function htmlMode(txt) {
        var rest = txt,
          done = "",
          php,
          comment,
          angular,
          startpos,
          endpos,
          note,
          i;
        comment = new extract(
          rest,
          "&lt;!--",
          "--&gt;",
          commentMode,
          "W3HTMLCOMMENTPOS"
        );
        rest = comment.rest;
        while (rest.indexOf("&lt;") > -1) {
          note = "";
          startpos = rest.indexOf("&lt;");
          if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {
            note = "css";
          }
          if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {
            note = "javascript";
          }
          endpos = rest.indexOf("&gt;", startpos);
          if (endpos == -1) {
            endpos = rest.length;
          }
          done += rest.substring(0, startpos);
          done += tagMode(rest.substring(startpos, endpos + 4));
          rest = rest.substr(endpos + 4);
          if (note == "css") {
            endpos = rest.indexOf("&lt;/style&gt;");
            if (endpos > -1) {
              done += cssMode(rest.substring(0, endpos));
              rest = rest.substr(endpos);
            }
          }
          if (note == "javascript") {
            endpos = rest.indexOf("&lt;/script&gt;");
            if (endpos > -1) {
              done += jsMode(rest.substring(0, endpos));
              rest = rest.substr(endpos);
            }
          }
        }
        rest = done + rest;
        for (i = 0; i < comment.arr.length; i++) {
          rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
        }
        return rest;
      }
      function tagMode(txt) {
        var rest = txt,
          done = "",
          startpos,
          endpos,
          result;
        while (rest.search(/(\s|<br>)/) > -1) {
          startpos = rest.search(/(\s|<br>)/);
          endpos = rest.indexOf("&gt;");
          if (endpos == -1) {
            endpos = rest.length;
          }
          done += rest.substring(0, startpos);
          done += attributeMode(rest.substring(startpos, endpos));
          rest = rest.substr(endpos);
        }
        result = done + rest;
        result =
          "<span style=color:" +
          tagcolor +
          ">&lt;</span>" +
          result.substring(4);
        if (result.substr(result.length - 4, 4) == "&gt;") {
          result =
            result.substring(0, result.length - 4) +
            "<span style=color:" +
            tagcolor +
            ">&gt;</span>";
        }
        return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
      }
      function attributeMode(txt) {
        var rest = txt,
          done = "",
          startpos,
          endpos,
          singlefnuttpos,
          doublefnuttpos,
          spacepos;
        while (rest.indexOf("=") > -1) {
          endpos = -1;
          startpos = rest.indexOf("=");
          singlefnuttpos = rest.indexOf("'", startpos);
          doublefnuttpos = rest.indexOf('"', startpos);
          spacepos = rest.indexOf(" ", startpos + 2);
          if (
            spacepos > -1 &&
            (spacepos < singlefnuttpos || singlefnuttpos == -1) &&
            (spacepos < doublefnuttpos || doublefnuttpos == -1)
          ) {
            endpos = rest.indexOf(" ", startpos);
          } else if (
            doublefnuttpos > -1 &&
            (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) &&
            (doublefnuttpos < spacepos || spacepos == -1)
          ) {
            endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
          } else if (
            singlefnuttpos > -1 &&
            (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) &&
            (singlefnuttpos < spacepos || spacepos == -1)
          ) {
            endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
          }
          if (!endpos || endpos == -1 || endpos < startpos) {
            endpos = rest.length;
          }
          done += rest.substring(0, startpos);
          done += attributeValueMode(rest.substring(startpos, endpos + 1));
          rest = rest.substr(endpos + 1);
        }
        return (
          "<span style=color:" + attributecolor + ">" + done + rest + "</span>"
        );
      }
      function attributeValueMode(txt) {
        return (
          "<span style=color:" + attributevaluecolor + ">" + txt + "</span>"
        );
      }
      function commentMode(txt) {
        return "<span style=color:" + commentcolor + ">" + txt + "</span>";
      }
      function cssMode(txt) {
        var rest = txt,
          done = "",
          s,
          e,
          comment,
          i,
          midz,
          c,
          cc;
        comment = new extract(
          rest,
          /\/\*/,
          "*/",
          commentMode,
          "W3CSSCOMMENTPOS"
        );
        rest = comment.rest;
        while (rest.search("{") > -1) {
          s = rest.search("{");
          midz = rest.substr(s + 1);
          cc = 1;
          c = 0;
          for (i = 0; i < midz.length; i++) {
            if (midz.substr(i, 1) == "{") {
              cc++;
              c++;
            }
            if (midz.substr(i, 1) == "}") {
              cc--;
            }
            if (cc == 0) {
              break;
            }
          }
          if (cc != 0) {
            c = 0;
          }
          e = s;
          for (i = 0; i <= c; i++) {
            e = rest.indexOf("}", e + 1);
          }
          if (e == -1) {
            e = rest.length;
          }
          done += rest.substring(0, s + 1);
          done += cssPropertyMode(rest.substring(s + 1, e));
          rest = rest.substr(e);
        }
        rest = done + rest;
        rest = rest.replace(
          /{/g,
          "<span style=color:" + cssdelimitercolor + ">{</span>"
        );
        rest = rest.replace(
          /}/g,
          "<span style=color:" + cssdelimitercolor + ">}</span>"
        );
        for (i = 0; i < comment.arr.length; i++) {
          rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
        }
        return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
      }
      function cssPropertyMode(txt) {
        var rest = txt,
          done = "",
          s,
          e,
          n,
          loop;
        if (rest.indexOf("{") > -1) {
          return cssMode(rest);
        }
        while (rest.search(":") > -1) {
          s = rest.search(":");
          loop = true;
          n = s;
          while (loop == true) {
            loop = false;
            e = rest.indexOf(";", n);
            if (rest.substring(e - 5, e + 1) == "&nbsp;") {
              loop = true;
              n = e + 1;
            }
          }
          if (e == -1) {
            e = rest.length;
          }
          done += rest.substring(0, s);
          done += cssPropertyValueMode(rest.substring(s, e + 1));
          rest = rest.substr(e + 1);
        }
        return (
          "<span style=color:" +
          csspropertycolor +
          ">" +
          done +
          rest +
          "</span>"
        );
      }
      function cssPropertyValueMode(txt) {
        var rest = txt,
          done = "",
          s;
        rest =
          "<span style=color:" +
          cssdelimitercolor +
          ">:</span>" +
          rest.substring(1);
        while (rest.search(/!important/i) > -1) {
          s = rest.search(/!important/i);
          done += rest.substring(0, s);
          done += cssImportantMode(rest.substring(s, s + 10));
          rest = rest.substr(s + 10);
        }
        result = done + rest;
        if (
          result.substr(result.length - 1, 1) == ";" &&
          result.substr(result.length - 6, 6) != "&nbsp;" &&
          result.substr(result.length - 4, 4) != "&lt;" &&
          result.substr(result.length - 4, 4) != "&gt;" &&
          result.substr(result.length - 5, 5) != "&amp;"
        ) {
          result =
            result.substring(0, result.length - 1) +
            "<span style=color:" +
            cssdelimitercolor +
            ">;</span>";
        }
        return (
          "<span style=color:" +
          csspropertyvaluecolor +
          ">" +
          result +
          "</span>"
        );
      }
      function cssImportantMode(txt) {
        return (
          "<span style=color:" +
          cssimportantcolor +
          ";font-weight:bold;>" +
          txt +
          "</span>"
        );
      }
      function jsMode(txt) {
        var rest = txt,
          done = "",
          esc = [],
          i,
          cc,
          tt = "",
          sfnuttpos,
          dfnuttpos,
          compos,
          comlinepos,
          keywordpos,
          numpos,
          mypos,
          dotpos,
          y;
        for (i = 0; i < rest.length; i++) {
          cc = rest.substr(i, 1);
          if (cc == "\\") {
            esc.push(rest.substr(i, 2));
            cc = "W3JSESCAPE";
            i++;
          }
          tt += cc;
        }
        rest = tt;
        y = 1;
        while (y == 1) {
          sfnuttpos = getPos(rest, "'", "'", jsStringMode);
          dfnuttpos = getPos(rest, '"', '"', jsStringMode);
          compos = getPos(rest, /\/\*/, "*/", commentMode);
          comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
          numpos = getNumPos(rest, jsNumberMode);
          keywordpos = getKeywordPos("js", rest, jsKeywordMode);
          dotpos = getDotPos(rest, jsPropertyMode);
          if (
            Math.max(
              numpos[0],
              sfnuttpos[0],
              dfnuttpos[0],
              compos[0],
              comlinepos[0],
              keywordpos[0],
              dotpos[0]
            ) == -1
          ) {
            break;
          }
          mypos = getMinPos(
            numpos,
            sfnuttpos,
            dfnuttpos,
            compos,
            comlinepos,
            keywordpos,
            dotpos
          );
          if (mypos[0] == -1) {
            break;
          }
          if (mypos[0] > -1) {
            done += rest.substring(0, mypos[0]);
            done += mypos[2](rest.substring(mypos[0], mypos[1]));
            rest = rest.substr(mypos[1]);
          }
        }
        rest = done + rest;
        for (i = 0; i < esc.length; i++) {
          rest = rest.replace("W3JSESCAPE", esc[i]);
        }
        return "<span style=color:" + jscolor + ">" + rest + "</span>";
      }
      function jsStringMode(txt) {
        return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
      }
      function jsKeywordMode(txt) {
        return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
      }
      function jsNumberMode(txt) {
        return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
      }
      function jsPropertyMode(txt) {
        return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
      }
      function getDotPos(txt, func) {
        var x,
          i,
          j,
          s,
          e,
          arr = [
            ".",
            "<",
            " ",
            ";",
            "(",
            "+",
            ")",
            "[",
            "]",
            ",",
            "&",
            ":",
            "{",
            "}",
            "/",
            "-",
            "*",
            "|",
            "%",
          ];
        s = txt.indexOf(".");
        if (s > -1) {
          x = txt.substr(s + 1);
          for (j = 0; j < x.length; j++) {
            cc = x[j];
            for (i = 0; i < arr.length; i++) {
              if (cc.indexOf(arr[i]) > -1) {
                e = j;
                return [s + 1, e + s + 1, func];
              }
            }
          }
        }
        return [-1, -1, func];
      }
      function getMinPos() {
        var i,
          arr = [];
        for (i = 0; i < arguments.length; i++) {
          if (arguments[i][0] > -1) {
            if (arr.length == 0 || arguments[i][0] < arr[0]) {
              arr = arguments[i];
            }
          }
        }
        if (arr.length == 0) {
          arr = arguments[i];
        }
        return arr;
      }
      function getKeywordPos(typ, txt, func) {
        var words,
          i,
          pos,
          rpos = -1,
          rpos2 = -1,
          patt;
        if (typ == "js") {
          words = [
            "abstract",
            "arguments",
            "boolean",
            "break",
            "byte",
            "case",
            "catch",
            "char",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "delete",
            "do",
            "double",
            "else",
            "enum",
            "eval",
            "export",
            "extends",
            "false",
            "final",
            "finally",
            "float",
            "for",
            "function",
            "goto",
            "if",
            "implements",
            "import",
            "in",
            "instanceof",
            "int",
            "interface",
            "let",
            "long",
            "NaN",
            "native",
            "new",
            "null",
            "package",
            "private",
            "protected",
            "public",
            "return",
            "short",
            "static",
            "super",
            "switch",
            "synchronized",
            "this",
            "throw",
            "throws",
            "transient",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "volatile",
            "while",
            "with",
            "yield",
          ];
        }
        for (i = 0; i < words.length; i++) {
          pos = txt.indexOf(words[i]);
          if (pos > -1) {
            patt = /\W/g;
            if (
              txt.substr(pos + words[i].length, 1).match(patt) &&
              txt.substr(pos - 1, 1).match(patt)
            ) {
              if (pos > -1 && (rpos == -1 || pos < rpos)) {
                rpos = pos;
                rpos2 = rpos + words[i].length;
              }
            }
          }
        }
        return [rpos, rpos2, func];
      }
      function getPos(txt, start, end, func) {
        var s, e;
        s = txt.search(start);
        e = txt.indexOf(end, s + end.length);
        if (e == -1) {
          e = txt.length;
        }
        return [s, e + end.length, func];
      }
      function getNumPos(txt, func) {
        var arr = [
          "<br>",
          " ",
          ";",
          "(",
          "+",
          ")",
          "[",
          "]",
          ",",
          "&",
          ":",
          "{",
          "}",
          "/",
          "-",
          "*",
          "|",
          "%",
          "=",
        ],
          i,
          j,
          c,
          startpos = 0,
          endpos,
          word;
        for (i = 0; i < txt.length; i++) {
          for (j = 0; j < arr.length; j++) {
            c = txt.substr(i, arr[j].length);
            if (c == arr[j]) {
              if (
                c == "-" &&
                (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")
              ) {
                continue;
              }
              endpos = i;
              if (startpos < endpos) {
                word = txt.substring(startpos, endpos);
                if (!isNaN(word)) {
                  return [startpos, endpos, func];
                }
              }
              i += arr[j].length;
              startpos = i;
              i -= 1;
              break;
            }
          }
        }
        return [-1, -1, func];
      }
    };
    highlightel(el, mode, colors);
    return el.innerHTML;
  },
  /**
   * Composes two functions together. Read more here: https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj
   * @function
   * @memberOf bijou
   * @returns {Function} The composed function.
   */
  composeFunction: (...functions) => (args) =>
    functions.reduceRight((arg, fn) => fn(arg), args),
  /**
   * Returns the curried version of a function. Read more here: https://medium.com/@abitoprakash/implementing-a-curry-function-in-javascript-6a249dbcb1bb
   * @function
   * @memberOf bijou
   * @param
   * @returns {Function} The curried version of the function.
   */
  curryFunction: (fn, arity = fn.length, ...args) =>
    arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args),
  /**
   * Returns either "mobile" or "desktop" depending on which type of device the user is using.
   * @function
   * @memberOf bijou
   * @param
   * @returns {String} Either "mobile" or "desktop" depending on which type of device the user is using.
   */
  mobileOrDesktop: () => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  },
  /**
   * Removes tags from the HTML string specified.
   * @function
   * @memberOf bijou
   * @param {String} html The string of HTML to remove tags from.
   * @example
   * console.log(_$.removeTags("<div>Hello</div>"));//Logs "Hello" to the console.
   * @returns {String} THe string of HTML without the tags.
   */
  removeTags: (html) => html.replace(/<[^>]*>/g, ""),
  /**
   * camelCases a string.
   * @function
   * @memberOf bijou
   * @param {String} str The string of non-camelCased text.
   * @example
   * console.log(_$.camelCase("Hello world"));//Logs "helloWorld" to the console.
   * @returns {String} The camelCased string.
   */
  camelCase: (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  },
  /**
   * Scrambles the order of characters in a string. Thanks to @\Touchcreator for the suggestion for this.
   * @function
   * @memberOf bijou
   * @param {String} str The string to be scrambled
   * @example
   * console.log(_$.scrambleString("Hello world"));//Logs "owllH rdloe" to the console
   * @returns {String} The scrambled text.
   */
  scrambleString: (str) => {
    var a = str.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  },
  /**
   * Allows an element to be dragged and dropped.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to be dragged (And dropped :P ).
   * @example
   * _$.drag(document.querySelector('div'));//Allows the first <div> on the page to be dragged.
   * @returns {Element} The element.
   */
  drag: (el) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    var initX, initY, mousePressX, mousePressY;
    el.addEventListener(
      "mousedown",
      function (event) {
        var style = window.getComputedStyle(el);
        el.style.top = style.getPropertyValue("top");
        el.style.left = style.getPropertyValue("left");
        el.style.right = style.getPropertyValue("right");
        el.style.bottom = style.getPropertyValue("bottom");
        this.style.position = "absolute";
        initX = this.offsetLeft;
        initY = this.offsetTop;
        mousePressX = event.clientX;
        mousePressY = event.clientY;
        this.addEventListener("mousemove", repositionElement, false);

        window.addEventListener(
          "mouseup",
          function () {
            el.removeEventListener("mousemove", repositionElement, false);
          },
          false
        );
      },
      false
    );

    function repositionElement(event) {
      this.style.left = initX + event.clientX - mousePressX + "px";
      this.style.top = initY + event.clientY - mousePressY + "px";
    }
    return el;
  },
  /**
   * Easing functions
   * @Object
   * @memberOf bijou
   * @example
   * _$.ease.easeInOutQuad(.3);//Returns the eased point of about 1/3 along the animation.
   * @returns {Function} The easing function.
   */
  ease: {
    // no easing, no acceleration
    linear: (t) => t,
    // accelerating from zero velocity
    easeInQuad: (t) => t * t,
    // decelerating to zero velocity
    easeOutQuad: (t) => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    // accelerating from zero velocity
    easeInCubic: (t) => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: (t) => --t * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity
    easeInQuart: (t) => t * t * t * t,
    // decelerating to zero velocity
    easeOutQuart: (t) => 1 - --t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    // accelerating from zero velocity
    easeInQuint: (t) => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: (t) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  },
  /**
   * Gets JSON from a URL and performs a callback with it.
   * @function
   * @memberOf bijou
   * @param {String} url The url of the JSON to be fetched.
   * @param {Function} callback The function to be run with the JSON code.
   * @example
   * _$.getJSON("http://date.jsontest.com/", (json) => {alert("The current time is " + json.time)})
   * @returns undefined
   */
  getJSON: (url, callback) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => callback(json));
  },
  /**
   * Gets HTML from a URL and performs a callback with it.
   * @function
   * @memberOf bijou
   * @param {String} url The url of the HTML to be fetched.
   * @param {Function} callback The function to be run with the HTML code.
   * @example
   * //Logs the HTML of wikipedia.org to the console.
   * _$.getHTML("https://wikipedia.org", (html) => console.log(html));
   * @returns undefined
   */
  getHTML: (url, callback) => {
    if (isNode) {
      throw new Error("No document element! (You are probably using Node.js)");
    }
    fetch(url)
      .then((res) => res.text())
      .then((html) => callback(_$.parseHTML(html)));
  },
  /**
   * Shuffles an array
   * @function
   * @memberOf bijou
   * @param {Array} array The array to shuffle.
   * @example
   * let array = [1,2,3,4,5];
   * array = _$.shuffleArray(array);
   * //array is now something like this: [2,4,1,5,3].
   * @returns {Array} The shuffled array.
   */
  shuffleArray: (array) => array.sort(() => Math.random() - 0.5),
  /**
   * Hashes a string to a unique integer (This cannot be decrypted easily).
   * @function
   * @memberOf bijou
   * @param {String} str The String to hash.
   * @param {Number} [seed=0] The seed of the hash.
   * @example
   * console.log(_$.hashString("Hello world"));//Logs 3494146707865688 to the console.
   * @returns {Number} The hashed string.
   */
  hashString: (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
      Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
      Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
      Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
      Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  },
  /**
   * Blends two colors through additive blending by a percentage.
   * @function
   * @memberOf bijou
   * @param {String} color1 The hex code of the first color to be blended
   * @param {String} color2 The hex code of the second color to be blended.
   * @param {Number} percent A number between 0 and 100 of the percentage to blend the two colors, 0 being completely the first color and 100 being completely the second color.
   * @example
   * _$.blendColors("#ffffff", "#000000", 80); Blends white and black together, ending up in a color that is 80% white and 20% black.
   * @returns {String} The blended color (A hex code).
   */
  blendColors: (color1, color2, percent = 50) => {
    const generateHex = (r, g, b) => {
      let R = r.toString(16);
      let G = g.toString(16);
      let B = b.toString(16);

      while (R.length < 2) {
        R = `0${R}`;
      }
      while (G.length < 2) {
        G = `0${G}`;
      }
      while (B.length < 2) {
        B = `0${B}`;
      }

      return `#${R}${G}${B}`;
    };

    const mix = (start, end, percent) =>
      start + (percent / 100) * (end - start);

    const red1 = parseInt(`${color1[1]}${color1[2]}`, 16);
    const green1 = parseInt(`${color1[3]}${color1[4]}`, 16);
    const blue1 = parseInt(`${color1[5]}${color1[6]}`, 16);

    const red2 = parseInt(`${color2[1]}${color2[2]}`, 16);
    const green2 = parseInt(`${color2[3]}${color2[4]}`, 16);
    const blue2 = parseInt(`${color2[5]}${color2[6]}`, 16);

    const red = Math.round(mix(red1, red2, percent));
    const green = Math.round(mix(green1, green2, percent));
    const blue = Math.round(mix(blue1, blue2, percent));

    return generateHex(red, green, blue);
  },
  /**
   * Gets the edit distance between two strings.
   * @function
   * @memberOf bijou
   * @param {String} a The first string
   * @param {String} b The seconds string
   * @example
   * _$.editDistance("hello", "Hello");//Returns 1
   * @returns {Number} The edit distance between two strings
   */
  editDistance: (a, b) => {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
            Math.min(matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  },
};
// Sort the object
_temp = _temp.sortObj(_temp);
// Descriptions:
let desc = {
  addStyles:
    "Add the styles in an object to a specified element:\n\n \t_$.addStyles(element, {background: 'red'});\n\n(Changes the background color of the element to red!)",
  arrayToCSV: `Returns a comma separated list from the specified array. \n\n\t_$.arrayToCSV([['a', 'b'], ['c', 'd']]);//'"a","b"\n"c","d"'\n\nNote that this also escapes characters such as quotes.`,
  averageBy:
    "This returns the average of an array based on the given function, for example:\n\n\t_$.averageBy([1,2,3,4], (val) => val / 2);//Returns the average of each element after each element has been divided by 2.",
  async:
    "Runs the given function in a web worker, returning a promise with the return value. This is useful to prevent the main thread from becoming clogged while trying to compute something.",
  browser:
    "Returns the current browser without sniffing the user-agent string. e.g. 'Chrome'",
  compStyle:
    "Returns an element of the computed style, e.g. \n\n\t_$.compStyle(document.querySelector('h1'), 'background-color'); //Returns the background-color of the first <h1>",
  copy:
    "Copies the text specified to the clipboard, e.g. \n\n\t_$.copy('Hello world');",
  createElement:
    "Returns a DOM element who's outerHTML is the string provided: \n\n\t_$.createElement('<div id=`fun`>Hello</div>);//Returns a DOM element whose id is 'fun' and whose innerText is 'Hello'",
  dayName: "Returns the day of the week from a Date object.",
  each:
    "Runs a function with each element of an array: \n\n\t_$.each([1,2,3], (num) => alert(num * 3));//Alerts each number in the array times 3",
  escapeHTML:
    "Returns an escaped version of the HTML string provided: \n\n\t_$.escapeHTML('<script>');//'&lt;script&gt;'",
  formToObject:
    "Converts a form to a javascript object using each element's 'name' attribute as the key and the 'value' attribute as the value.",
  formatMilliseconds:
    "Formats a number of milliseconds into a human-readable duration of time, e.g. \n\n\t_$.formatMilliseconds(600000);//Returns '10 minutes'",
  hexToRGB: "Converts a hex value into an RGB color.",
  inPartialView:
    "Returns whether the specified element is visible at all in the viewport. Usefull for lazy loading images!",
  inView:
    "Returns whether the specified element is completely visible in the viewport.",
  jsonToCsv: "Converts a JSON object to CSV.",
  lightOrDark:
    "Returns an object, the key 'lightordark' returns either 'light' or 'dark' and the key 'hsp' returns the value of the color from 0 (completely dark) to 255 (completely bright).",
  lightenColor:
    "Lightens or darkens a hex color by a certain amount, on a scale rom 0 (completely dark) to 255 (completely bright): \n\n\t_$.lightenColor('#ffffff', -20);//Returns '#ebebeb'.",
  mapObjectKeys:
    "Maps an object's keys recursively: \n\n\t_$.mapObjectKeys({\r\n    key: 'value',\r\n    another: {\r\n        deep: 'thing',\r\n        map: 'another'\r\n    }\r\n}, (key) => key.toUpperCase()); // Transforms every key of the object to uppercase.",
  notify:
    "Notifies the user through a desktop notification. Takes 3 arguments: text, body, icon. Text is the title of the notification, body is the message of it, and icon is the icon displayed next to the notification.",
  onOutsideClick:
    'Returns the callback when a click is called outside the specified element:\r\n\r\n    _$.onoutsideclick(document.querySelector("h1"), () => {alert("You clicked outside the header")}); // Alerts when the user clicks anywhere that is NOT the h1 in question.',
  onScrollStop: "Returns the callback when a user stops scrolling the window. ",
  previousPage: "Returns the url of the previous page that the user visited.",
  primesTo: "Returns an array of all the prime numbers up to the number given.",
  querySelector: "Generates a unique querySelector for the given element.",
  random:
    "Returns a random number between two numbers:\n\n\t_$.random(-10,10,false);//Return a random number between -10 and 10 and DO NOT round it. (True as the last value would round it.)",
  randomColor: "Returns a random hex color.",
  removeComments: "Removes comments from the HTML element specified.",
  replaceText:
    'Replaces the text of the specified element by passing the old value through a function:\r\n\r\n    _$.replaceText(document, (oldtext) => oldtext.replace(" ", "-"));//Replace all spaces in the document with a hyphen.',
  rgbToHex: "Returns the hex code of a given RGB string.",
  seedRandom: "Gives a random number based on a whole number seed.",
  serializeForm: "Convert a form to url queries",
  sortObj: "Returns an alphabetized copy of the object by keys.",
  throttle:
    "Runs the function specified, the second input controls at MAX how much wait there is between the next time it runs:\n\n\t_$.throttle(() => alert('hello'), 10000);\n\nRunning this like any other function will simply just run the function, however if you try to run the throttled function in a setInterval loop or before its timeout ends it will not run.",
  timeFunction:
    "Use console.time to how long the function inputted takes to execute.",
  unescapeHTML: "Unescapes the string of HTML specified.",
  unionArrays:
    "Merges two arrays using union, meaning that any duplicates between the two arrays will be removed.",
  uuid:
    "Generates a unique id, like the uuid npm package. Also can take a seed as the argument, this can either be a string or a number between 0 and 1. \n\n\tFor example:\n8dfe52e3-7beb-48eb-8282-209ff1c5250f",
  widows:
    "Replaces the last space character between words with '&nbsp;', preventing a single word on a newline.",
  flatten:
    "This takes a 2d array (an array of arrays) and flattens in into a 1d array (a list of items).",
  uniqueArray: "Removes duplicates from an array",
  formatNumber: "Adds commas to large numbers in the right place.",
  spliceArrayBuffer:
    "Splices a number as if it's 8 bits long and converts it to a single number:\n\n\t_$.spliceArrayBuffer([5, 8, 255], 0, 2, true);//16713733",
  unCamelCase:
    "Un-camelCases a string. Camel case is when a string's case looks like this: camelCase, where the normal version would be Camel Case.",
  parseHTML:
    "Parses HTML and returns a document object representing the parsed HTML.",
  syntaxHighlight:
    "Highlight a string of code! \n\n\t_$.syntaxHighlight('alert(\"Hello\")', 'js');//Returns html of the syntax highlighted version. \n\nAlso supports CSS and HTML. Note: This needs <br> tags instead of normal line breaks.",
  composeFunction:
    "Composes two functions together. Read more here: https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj",
  curryFunction:
    "Returns the curried version of a function. Read more here: https://medium.com/@abitoprakash/implementing-a-curry-function-in-javascript-6a249dbcb1bb",
  removeTags: "Returns an html string stripped of tags.",
  desktopOrMobile:
    "Returns whether the user is using a desktop or mobile device. (Uses user-agent sniffing which can be spoofed)",
  camelCase:
    "Takes a string as an input and returns the camelCased version of it.",
  scrambleString: "Scrambles a string's characters and returns the output.",
  drag: "Allows the element provided to be dragged. (Drag and drop.)",
  ease:
    "The only non-function in Bijou.js. This has a variety of easing functions, all of which take a number between 0 and 1, and return a corresponding value for the easing function. For example this code: \n\n\t_$.ease.easeInOutQuad(.3);\n\nWould return the eased value for a point about a third of the way through the animation.",
  getJSON:
    "Runs the callback with the JSON (as an object) from the url specified in the first argument.",
  getHTML:
    "Runs the callback with the HTML (as a parsed html object) from the url specified in the first argument.",
  shuffleArray: "Returns the input array shuffled",
  hashString:
    "Returns the hashed version of a string. This is a very fast method! (So says stackoverflow :P)",
};
desc = _temp.sortObj(desc);
_temp.info = (prop) => {
  return desc[prop];
};

// Imports and exports
const _$ = _temp;
const _ = _temp;
const explosion = _temp;
if (isNode) {
  module.exports = _temp;
}
