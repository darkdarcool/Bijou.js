document.head.innerHTML+='<script src="https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.43/polyfill.min.js" integrity="sha512-lvWiOP+aMKHllm4THsjzNleVuGOh0WGniJ3lgu/nvCbex1LlaQSxySUjAu/LTJw9FhnSL/PVYoQcckg1Q03+fQ==" crossorigin="anonymous"><\/script>';let _temp={primesTo:e=>{let t=Array.from({length:e-1}).map(((e,t)=>t+2)),n=Math.floor(Math.sqrt(e));return Array.from({length:n-1}).map(((e,t)=>t+2)).forEach((e=>t=t.filter((t=>t%e!=0||t===e)))),t},async:e=>{const t=new Worker(URL.createObjectURL(new Blob([`postMessage((${e})());`]),{type:"application/javascript; charset=utf-8"}));return new Promise(((e,n)=>{t.onmessage=({data:n})=>{e(n),t.terminate()},t.onerror=e=>{n(e),t.terminate()}}))},formatMilliseconds:e=>{e<0&&(e=-e);const t={day:Math.floor(e/864e5),hour:Math.floor(e/36e5)%24,minute:Math.floor(e/6e4)%60,second:Math.floor(e/1e3)%60,millisecond:Math.floor(e)%1e3};return Object.entries(t).filter((e=>0!==e[1])).map((([e,t])=>`${t} ${e}${1!==t?"s":""}`)).join(", ")},addStyles:(e,t)=>Object.assign(e.style,t),onOutsideClick:(e,t)=>{document.addEventListener("click",(n=>{e.contains(n.target)||t()}))},onScrollStop:e=>{let t;window.addEventListener("scroll",(n=>{clearTimeout(t),t=setTimeout((()=>{e()}),150)}),!1)},copy:e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select(),document.execCommand("copy"),document.body.removeChild(t),n&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n))},throttle:(e,t)=>{let n,r,o;return function(){const a=this,i=arguments;n?(clearTimeout(r),r=setTimeout((function(){Date.now()-o>=t&&(e.apply(a,i),o=Date.now())}),Math.max(t-(Date.now()-o),0))):(e.apply(a,i),o=Date.now(),n=!0)}},createElement:e=>{const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild},browser:()=>{var e=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t="undefined"!=typeof InstallTrigger,n=/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&window.safari.pushNotification).toString(),r=!!document.documentMode,o=!r&&!!window.StyleMedia,a=!(!window.chrome||!window.chrome.webstore&&!window.chrome.runtime),i=a&&-1!=navigator.userAgent.indexOf("Edg"),s=(a||e)&&!!window.CSS;return e?"Opera":t?"Firefox":n?"Safari":o?"Edge":r?"Internet Explorer":a?"Chrome":i?"Edge Chromium":s?"Blink":void 0},notify:(e,t,n)=>{if(window.Notification)if("granted"===Notification.permission)new Notification(e,{body:t,icon:n});else Notification.requestPermission().then((function(r){if("granted"===r)new Notification(e,{body:t,icon:n});else console.log("User blocked notifications.")})).catch((function(e){console.error(e)}));else console.log("Browser does not support notifications.")},dayName:(e,t)=>e.toLocaleDateString(t,{weekday:"long"}),jsonToCsv:(e,t,n=",")=>[t.join(n),...e.map((e=>t.reduce(((t,r)=>`${t}${t.length?n:""}"${e[r]?e[r]:""}"`),"")))].join("\n"),unionArrays:(e,t)=>{for(var n={},r=e.length-1;r>=0;--r)n[e[r]]=e[r];for(r=t.length-1;r>=0;--r)n[t[r]]=t[r];var o=[];for(var a in n)n.hasOwnProperty(a)&&o.push(n[a]);return o},each:(e,t)=>{for(let n=0;n<e.length;n++)t(e[n])},mapObjectKeys:(e,t)=>Array.isArray(e)?e.map((e=>_$.mapObjectKeys(e,t))):"object"==typeof e?Object.keys(e).reduce(((n,r)=>{const o=t(r),a=e[r];return n[o]=null!==a&&"object"==typeof a?_$.mapObjectKeys(a,t):a,n}),{}):e,arrayToCSV:(e,t=",")=>e.map((e=>e.map((e=>isNaN(e)?`"${e.replace(/"/g,'""')}"`:e)).join(t))).join("\n"),averageBy:(e,t)=>e.map("function"==typeof t?t:e=>e[t]).reduce(((e,t)=>e+t),0)/e.length,inView:e=>{for(var t=e.offsetTop,n=e.offsetLeft,r=e.offsetWidth,o=e.offsetHeight;e.offsetParent;)t+=(e=e.offsetParent).offsetTop,n+=e.offsetLeft;return t>=window.pageYOffset&&n>=window.pageXOffset&&t+o<=window.pageYOffset+window.innerHeight&&n+r<=window.pageXOffset+window.innerWidth},inPartialView:e=>{for(var t=e.offsetTop,n=e.offsetLeft,r=e.offsetWidth,o=e.offsetHeight;e.offsetParent;)t+=(e=e.offsetParent).offsetTop,n+=e.offsetLeft;return t<window.pageYOffset+window.innerHeight&&n<window.pageXOffset+window.innerWidth&&t+o>window.pageYOffset&&n+r>window.pageXOffset},serializeForm:e=>Array.from(new FormData(e),(e=>e.map(encodeURIComponent).join("="))).join("&"),formToObject:e=>Array.from(new FormData(e)).reduce(((e,[t,n])=>({...e,[t]:n})),{}),uuid:()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))),escapeHTML:e=>e.replace(/[&<>'"]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[e]||e))),unescapeHTML:e=>e.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g,(e=>({"&amp;":"&","&lt;":"<","&gt;":">","&#39;":"'","&quot;":'"'}[e]||e))),previousPage:()=>document.referrer||window.location.href,replaceText:(e,t)=>{for(var n,r=function(){for(var t,n=e,r=[],o=0;o<n.length;o++)t=n[o].childNodes[0],n[o].hasChildNodes()&&3==t.nodeType&&r.push(t);return r}(),o=0,a=r.length;o<a;o++)n=r[o].nodeValue,r[o].nodeValue=t(n)},timeFunction:(e,t="_ function timer")=>{console.time(t),e(),console.timeEnd(t)},sortObj:e=>Object.keys(e).sort().reduce((function(t,n){return t[n]=e[n],t}),{}),widows:e=>{for(var t=e.split(" "),n="",r=0;r<=t.length-1;r++)n+=t[r],r==t.length-2?n+="&nbsp;":n+=" ";return n},randomColor:()=>"#"+Math.floor(16777215*Math.random()).toString(16),lightenColor:(e,t)=>{var n=!1;"#"==e[0]&&(e=e.slice(1),n=!0);var r=parseInt(e,16),o=(r>>16)+t;o>255?o=255:o<0&&(o=0);var a=(r>>8&255)+t;a>255?a=255:a<0&&(a=0);var i=(255&r)+t;return i>255?i=255:i<0&&(i=0),(n?"#":"")+(i|a<<8|o<<16).toString(16)},lightOrDark:e=>{var t,n,r,o;return e.match(/^rgb/)?(t=(e=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1],n=e[2],r=e[3]):(t=(e=+("0x"+e.slice(1).replace(e.length<5&&/./g,"$&$&")))>>16,n=e>>8&255,r=255&e),(o=Math.sqrt(t*t*.299+n*n*.587+r*r*.114))>127.5?{lightordark:"light",hsp:o}:{lightordark:"dark",hsp:o}},compStyle:(e,t)=>window.getComputedStyle(e).getPropertyValue(t),rgbToHex:e=>{let t=e.indexOf(",")>-1?",":" ",n=(+(e=e.substr(4).split(")")[0].split(t))[0]).toString(16),r=(+e[1]).toString(16),o=(+e[2]).toString(16);return 1==n.length&&(n="0"+n),1==r.length&&(r="0"+r),1==o.length&&(o="0"+o),"#"+n+r+o},hexToRGB:e=>{let t=!1,n=e.slice(e.startsWith("#")?1:0);return 3===n.length?n=[...n].map((e=>e+e)).join(""):8===n.length&&(t=!0),n=parseInt(n,16),"rgb"+(t?"a":"")+"("+(n>>>(t?24:16))+", "+((n&(t?16711680:65280))>>>(t?16:8))+", "+((n&(t?65280:255))>>>(t?8:0))+(t?", "+(255&n):"")+")"},querySelector:e=>{var t="";return function e(n){if(n.getAttribute("id")&&1===document.querySelectorAll(`#${n.getAttribute("id")}`).length)return t=(t=(t=t.replace(/^/," #"+n.getAttribute("id"))).replace(/\s/,"")).replace(/\s/g," > ");if(document.body===n)return t=(t=(t=t.replace(/^/," body")).replace(/\s/,"")).replace(/\s/g," > ");if(n.getAttribute("class")){var r=".";r=(r=(r+=n.getAttribute("class")).replace(/\s/g,".")).replace(/^/g," ");var o="";if((c=n.parentNode.children).length<2)return;for(var a=[],i=0;i<c.length;i++)n.getAttribute("class")==c[i].getAttribute("class")&&a.push(c[i]);if(a.length>1)for(var s=0;s<a.length;s++)if(n===a[s]){o=":nth-of-type("+ ++s+")";break}t=t.replace(/^/,r+o)}else{var l=n.nodeName;l=l.toLowerCase();var c,u="";if((c=n.parentNode.children).length>2){var d=[];for(i=0;i<c.length;i++)n.nodeName==c[i].nodeName&&d.push(c[i]);if(d.length>1)for(s=0;s<d.length;s++)if(n===d[s]){u=":nth-of-type("+ ++s+")";break}}t=t.replace(/^/," "+l+u)}if(!n.parentNode)return t=(t=t.replace(/\s/g," > ")).replace(/\s/,"");e(n.parentNode)}(e),t},removeComments:e=>{e.innerHTML=e.innerHTML.replace(/<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,"")},random:(e,t,n=!0)=>n?Math.floor(Math.random()*(t-e+1)+e):Math.random()*(t-e+1)+e,seedRandom:e=>{var t=e+=1831565813;return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/4294967296},flatten:e=>e.reduce(((e,t)=>e.concat(t)),[]),uniqueArray:e=>[...new Set(e)],formatNumber:e=>e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"),spliceArrayBuffer:(e,t,n,r)=>{var o=(r=r||!1)?-1:1;r&&([t,n]=[n,t]),t=Math.floor(t),n=Math.floor(n)+o;for(var a=t,i=0;a!=n;a+=o)i=256*i+e[a];return i},unCamelCase:function(e){return e.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,(function(e){return e.toUpperCase()}))},parseHTML:(e,t="text/html")=>(new DOMParser).parseFromString(e,t)};_temp=_temp.sortObj(_temp);let desc={addStyles:"Add the styles in an object to a specified element:\n\n \t_$.addStyles(element, {background: 'red'});\n\n(Changes the background color of the element to red!)",arrayToCSV:"Returns a comma separated list from the specified array. \n\n\t_$.arrayToCSV([['a', 'b'], ['c', 'd']]);//'\"a\",\"b\"\n\"c\",\"d\"'\n\nNote that this also escapes characters such as quotes.",averageBy:"This returns the average of an array based on the given function, for example:\n\n\t_$.averageBy([1,2,3,4], (val) => val / 2);//Returns the average of each element after each element has been divided by 2.",async:"Runs the given function in a web worker, returning a promise with the return value. This is useful to prevent the main thread from becoming clogged while trying to compute something.",browser:"Returns the current browser without sniffing the user-agent string. e.g. 'Chrome'",compStyle:"Returns an element of the computed style, e.g. \n\n\t_$.compStyle(document.querySelector('h1'), 'background-color'); //Returns the background-color of the first <h1>",copy:"Copies the text specified to the clipboard, e.g. \n\n\t_$.copy('Hello world');",createElement:"Returns a DOM element who's outerHTML is the string provided: \n\n\t_$.createElement('<div id=`fun`>Hello</div>);//Returns a DOM element whose id is 'fun' and whose innerText is 'Hello'",dayName:"Returns the day of the week from a Date object.",each:"Runs a function with each element of an array: \n\n\t_$.each([1,2,3], (num) => alert(num * 3));//Alerts each number in the array times 3",escapeHTML:"Returns an escaped version of the HTML string provided: \n\n\t_$.escapeHTML('<script>');//'&lt;script&gt;'",formToObject:"Converts a form to a javascript object using each element's 'name' attribute as the key and the 'value' attribute as the value.",formatMilliseconds:"Formats a number of milliseconds into a human-readable duration of time, e.g. \n\n\t_$.formatMilliseconds(600000);//Returns '10 minutes'",hexToRGB:"Converts a hex value into an RGB color.",inPartialView:"Returns whether the specified element is visible at all in the viewport. Usefull for lazy loading images!",inView:"Returns whether the specified element is completely visible in the viewport.",jsonToCsv:"Converts a JSON object to CSV.",lightOrDark:"Returns an object, the key 'lightordark' returns either 'light' or 'dark' and the key 'hsp' returns the value of the color from 0 (completely dark) to 255 (completely bright).",lightenColor:"Lightens or darkens a hex color by a certain amount, on a scale rom 0 (completely dark) to 255 (completely bright): \n\n\t_$.lightenColor('#ffffff', -20);//Returns '#ebebeb'.",mapObjectKeys:"Maps an object's keys recursively: \n\n\t_$.mapObjectKeys({\r\n    key: 'value',\r\n    another: {\r\n        deep: 'thing',\r\n        map: 'another'\r\n    }\r\n}, (key) => key.toUpperCase()); // Transforms every key of the object to uppercase.",notify:"Notifies the user through a desktop notification. Takes 3 arguments: text, body, icon. Text is the title of the notification, body is the message of it, and icon is the icon displayed next to the notification.",onOutsideClick:'Returns the callback when a click is called outside the specified element:\r\n\r\n    _$.onoutsideclick(document.querySelector("h1"), () => {alert("You clicked outside the header")}); // Alerts when the user clicks anywhere that is NOT the h1 in question.',onScrollStop:"Returns the callback when a user stops scrolling the window. ",previousPage:"Returns the url of the previous page that the user visited.",primesTo:"Returns an array of all the prime numbers up to the number given.",querySelector:"Generates a unique querySelector for the given element.",random:"Returns a random number between two numbers:\n\n\t_$.random(-10,10,false);//Return a random number between -10 and 10 and DO NOT round it. (True as the last value would round it.)",randomColor:"Returns a random hex color.",removeComments:"Removes comments from the HTML element specified.",replaceText:'Replaces the text of the specified element by passing the old value through a function:\r\n\r\n    _$.replaceText(document, (oldtext) => oldtext.replace(" ", "-"));//Replace all spaces in the document with a hyphen.',rgbToHex:"Returns the hex code of a given RGB string.",seedRandom:"Gives a random number based on a whole number seed.",serializeForm:"Convert a form to url queries",sortObj:"Returns an alphabetized copy of the object by keys.",throttle:"Runs the function specified, the second input controls at MAX how much wait there is between the next time it runs:\n\n\t_$.throttle(() => alert('hello'), 10000);\n\nRunning this like any other function will simply just run the function, however if you try to run the throttled function in a setInterval loop or before its timeout ends it will not run.",timeFunction:"Use console.time to how long the function inputted takes to execute.",unescapeHTML:"Unescapes the string of HTML specified.",unionArrays:"Merges two arrays using union, meaning that any duplicates between the two arrays will be removed.",uuid:"Generates a unique id, like the uuid npm package.\n\n\tFor example:\n8dfe52e3-7beb-48eb-8282-209ff1c5250f",widows:"Replaces the last space character between words with '&nbsp;', preventing a single word on a newline.",flatten:"This takes a 2d array (an array of arrays) and flattens in into a 1d array (a list of items).",uniqueArray:"Removes duplicates from an array",formatNumber:"Adds commas to large numbers in the right place.",spliceArrayBuffer:"Splices a number as if it's 8 bits long and converts it to a single number:\n\n\t_$.spliceArrayBuffer([5, 8, 255], 0, 2, true);//16713733",unCamelCase:"Un-camelCases a string. Camel case is when a string's case looks like this: camelCase, where the normal version would be Camel Case.",parseHTML:"Parses HTML and returns a document object representing the pa"};_temp.info=e=>desc[e];const _$=_temp,_=_temp,explosion=_temp;