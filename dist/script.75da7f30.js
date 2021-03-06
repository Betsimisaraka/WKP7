// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Create an object that contain 3 arrays of books
var books = [{
  title: 'Harry Porter',
  author: 'Ally',
  genre: 'Romence',
  pages: 200,
  status: true
}, {
  title: 'Twilight',
  author: 'Edward',
  genre: 'Horor',
  pages: 400,
  status: false
}, {
  title: 'Kira-Kira',
  author: 'Nicola',
  genre: 'Thriller',
  pages: 300,
  status: true
}]; //Variables

var formElement = document.querySelector('.book_form');
var listElement = document.querySelector('.book_list');
var addButton = document.querySelector('.addbtn'); // Map through them to access thier value

var handleBookList = function handleBookList(e) {
  var html = books.map(function (book) {
    return "\n            <li class=\"list_items\">\n                <p class=\"title\">".concat(book.title, "</p>\n                <p class=\"author\">").concat(book.author, "</p>\n                <p class=\"genre\">").concat(book.genre, "</p>\n                <p class=\"pages\">").concat(book.pages, "</p>\n                <input type=\"checkbox\" class=\"checkbox\" ").concat(book.status ? 'checked' : '', ">\n                <button class=\"delete\"></button>\n            </li>\n        ");
  }).join('');
  listElement.innerHTML = html;
};

handleBookList(); //Add a new book form the input value

var newBook = [];

var handleAddBtn = function handleAddBtn(e) {
  e.preventDefault();
  var form = e.target;
  var bookTitle = form.title.value;
  var bookAuthor = form.author.value;
  var bookGenre = form.genre.value;
  var bookPages = form.numbers.value;
  var bookStatus = form.status.value;
  var myBook = {
    title: bookTitle,
    author: bookAuthor,
    genre: bookGenre,
    pages: bookPages,
    status: bookStatus,
    id: Date.now()
  };
  newBook.push(myBook);
  console.info("There are now ".concat(newBook.length, " in your state"));
  e.target.reset();
  listElement.dispatchEvent(new CustomEvent('booksUpdated'));
}; //New book list from the value of the form


var displayList = function displayList(e) {
  var myHtml = newBook.map(function (book) {
    return "\n            <li class=\"list_items\">\n                <p class=\"title\">".concat(book.title, "</p>\n                <p class=\"author\">").concat(book.author, "</p>\n                <p class=\"genre\">").concat(book.genre, "</p>\n                <p class=\"pages\">").concat(book.pages, "</p>\n                <input type=\"checkbox\" class=\"checkbox\" ").concat(book.status === 'read' ? 'checked' : '', ">\n                <button value=\"").concat(book.id, "\" class=\"delete\"></button>\n            </li>\n        ");
  }).join('');
  listElement.insertAdjacentHTML('beforeend', myHtml);
}; // 4-a Create a custom event to store the list of books in the Local Storage


var mirrorToLocalStorage = function mirrorToLocalStorage() {
  console.info('Keep the list appear');
  var local = JSON.stringify(newBook);
  localStorage.setItem('books', local);
}; //When a user come back to the app with the same browser, they should see the same book list as it was, before they left the app. Save the current book list to your browser's Local Storage.


var restoreFromLocalStorage = function restoreFromLocalStorage() {
  console.info('restoring from LS');
  var lsBooks = JSON.parse(localStorage.getItem('books')); //check if there is something inside local storage

  if (lsBooks) {
    newBook.push.apply(newBook, _toConsumableArray(lsBooks));
  }

  listElement.dispatchEvent(new CustomEvent('booksUpdated'));
}; //Delete button to delete the array from the list


var deleteBtn = function deleteBtn(event) {
  if (event.target.classList.contains('delete')) {
    var deleteButton = event.target;
    deleteButton.closest('.list_items').remove();
  }
}; //Change the status if the book has been read or not.


var markAsRead = function markAsRead(id) {
  console.log('read', id);
  var bookRef = newBook.find(function (item) {
    return item.id === id;
  });
  bookRef.status = !bookRef.status;
  listElement.dispatchEvent(new CustomEvent('booksUpdated'));
}; // EVENT LISTENERS


formElement.addEventListener('submit', handleAddBtn);
listElement.addEventListener('booksUpdated', displayList);
listElement.addEventListener('booksUpdated', mirrorToLocalStorage); //window.addEventListener('DOMContentLoaded', handleBookList);

listElement.addEventListener('click', deleteBtn); // const deleteBtn = id => {
//     console.log('this deletes', id);
//     newBook = newBook.filter(book => book.id !== id);
//     listElement.dispatchEvent(new CustomEvent('booksUpdated'));
// }

listElement.addEventListener('click', function (e) {
  var id = Number(e.target.value); // if (e.target.matches('button.delete')) {
  //     deleteBtn(id);
  // }

  if (e.target.matches('input[type="checkbox"]')) {
    markAsRead(id);
  }

  console.log(id);
});
restoreFromLocalStorage();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49950" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map