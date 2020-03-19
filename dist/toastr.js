var Toastr =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Toastr = __webpack_require__(/*! ./src/toastr */ \"./src/toastr.js\");\r\n\r\nmodule.exports = new Toastr();\r\n\n\n//# sourceURL=webpack://Toastr/./index.js?");

/***/ }),

/***/ "./src/toastr.js":
/*!***********************!*\
  !*** ./src/toastr.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * @author OsirisFrik\r\n */\r\n\r\n/**\r\n * @typedef { Object } ToastrConfig\r\n * @property { Boolean } [animate=true]\r\n * @property { ('top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' ) } [position=top-right]\r\n * @property { ( 'fade' ) } [animation=fade]\r\n * @property { Number } [timeout=6000] - This is a default timeout to remove toastr, you can change individuali per toastr\r\n */\r\n\r\nlet mainContainer;\r\nlet container = document.getElementById('toastr-container') || document.createElement('div');\r\nlet toastrs = [];\r\n\r\nclass Toastr {\r\n  \r\n  /**\r\n   * @method constructor\r\n   * @param { ToastrConfig } config\r\n   * @param { HTMLElement } appendTo\r\n   */\r\n\r\n  constructor(\r\n    config = {\r\n      position: 'top-right',\r\n      animation: 'fade',\r\n      animate: true,\r\n      timeout: 6000\r\n    },\r\n    appendTo = document.body\r\n  ) {\r\n    if (!container.id) container.id = 'toastr-container';\r\n    mainContainer = appendTo;\r\n\r\n    /**\r\n     * @type { ToastrConfig }\r\n     */\r\n    this.config = config;\r\n\r\n    container.classList.add('toastr-container', config.position);\r\n    mainContainer = appendTo;\r\n\r\n    mainContainer.appendChild(container);\r\n  }\r\n\r\n  toastr(message, type = 'info', timeout = this.config.timeout, customClass = []) {\r\n    let toastr = document.createElement('div');\r\n    let id = Math.floor(Math.random() * 0xFFFFFF).toString(16);\r\n\r\n    toastr.classList.add('toastr', type, ...customClass);\r\n    toastr.id = id;\r\n    toastr.innerHTML = message;\r\n\r\n    if (this.config.animate) {\r\n      toastr.classList.add('animated', `${this.config.animation}In${this.__getAnimationSide(true)}` );\r\n    }\r\n\r\n    toastrs.push(id);\r\n    container.appendChild(toastr);\r\n\r\n    setTimeout(() => this.removeToastr(toastr), timeout);\r\n  };\r\n\r\n  removeToastr(toastr, count = 0) {\r\n    try {\r\n      let toastrIndex = toastrs.findIndex(item => item === toastr.id);\r\n      \r\n      if (this.config.animate) {\r\n        toastr.classList.add(`${this.config.animation}Out${this.__getAnimationSide(false)}`);\r\n        setTimeout(() => {\r\n          container.removeChild(toastr);\r\n          toastrs.splice(toastrIndex, 1);\r\n        }, 1000);\r\n      } else {\r\n        container.removeChild(toastr);\r\n        toastrs.splice(toastrIndex, 1);\r\n      }\r\n    } catch (err) {\r\n      if (count <= 5) {\r\n        toastr = document.getElementById(toastr.id);\r\n        this.removeToastr(toastr, count++);\r\n      } else {\r\n        throw new Error(`Can't remove toastr ${toastr.id}`);\r\n      }\r\n    }\r\n  }\r\n\r\n  success(message, timeout, customClass) {\r\n    return this.toastr(message, 'success', timeout, customClass)\r\n  }\r\n\r\n  error(message, timeout, customClass) {\r\n    return this.toastr(message, 'error', timeout, customClass);\r\n  }\r\n\r\n  warning(message, timeout, customClass) {\r\n    return this.toastr(message, 'warning', timeout, customClass);\r\n  }\r\n\r\n  info(message, timeout, customClass) {\r\n    return this.toastr(message, 'info', timeout, customClass);\r\n  }\r\n\r\n  /**\r\n   * @method updateConfig\r\n   * @param { ToastrConfig } config \r\n   */\r\n  updateConfig(config = {\r\n    position: 'top-right',\r\n    animation: 'fade',\r\n    animate: true\r\n  }) {\r\n    for (const key in this.config) {\r\n      if (config[key] && config[key] !== this.config[key]) {\r\n        if (key === 'position') {\r\n          container.classList.replace(this.config.position, config.position);\r\n        }\r\n        this.config[key] = config[key];\r\n      }\r\n    }\r\n  };\r\n\r\n  /**\r\n   * @method __getAnimationSide\r\n   * @param { Boolean } [In=false]\r\n   */\r\n\r\n  __getAnimationSide(In = false) {\r\n    let position = this.config.position;\r\n\r\n    if (position.includes('top-')) {\r\n      if (position.includes('center')) return In ? 'Down' : 'Up';\r\n      else return position.includes('left') ? 'Left' : 'Right';\r\n    }\r\n\r\n    if (position.includes('bottom-')) {\r\n      if (position.includes('center')) return In ? 'Up' : 'Down';\r\n      else return position.includes('left') ? 'Left' : 'Right';\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = Toastr;\n\n//# sourceURL=webpack://Toastr/./src/toastr.js?");

/***/ })

/******/ });