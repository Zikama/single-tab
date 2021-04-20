"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true,
        didErr = false,
        err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next();
            normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true;
            err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var g = function g(k) {
    return document.querySelector(k);
};

var gA = function gA(k) {
    return document.querySelectorAll(k);
};

var MD = /*#__PURE__*/ function() {
    function MD() {
        _classCallCheck(this, MD);

        this.g = function(k) {
            return document.querySelector(k);
        };

        this.gA = function(k) {
            return document.querySelectorAll(k);
        };

        this.back = localStorage.getItem('md-back') || "";

        this._initializeDefaults();
    }

    _createClass(MD, [{
        key: "_initializeDefaults",
        value: function _initializeDefaults() {
            var _this = this;

            var allDefaults = gA('[md-data]');

            if (allDefaults.length) {
                var _iterator = _createForOfIteratorHelper(allDefaults),
                    _step;

                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var artdefault = _step.value;
                        artdefault.addEventListener('click', function(e) {
                            var target = e.currentTarget;
                            var gobackSector = g('#' + target.getAttribute('md-data'));

                            if (!gobackSector.classList.contains('art-md-show')) {
                                _this.initialShow(gobackSector);
                            }
                        });
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
            }
        }
    }, {
        key: "init",
        value: function init() {
                var thisModal = this.g('.art-md-show');

                if (thisModal) {
                    this.back = thisModal.id;
                    localStorage.setItem('md-back', thisModal.id);
                    thisModal.classList.remove('art-md-show');
                    thisModal.classList.add('art-md-hide');
                    thisModal.classList.add(thisModal.getAttribute('tag-data'));
                }
            }
            /** 
             * Template Function
             * @param id<String> is a string that defines the modal/document's id art-main-modal
             * @param header<String> is a string that defines the modal/document's Title in header section
             * @param content<String/Function> is a string/function[that returns string] that is used as user defined content to be displayed in the 
             * modal/document's content section
             * @param footer<String/Function> is a String/function[that returns the content] data to be put into md-footer
             * @param cb is a function<Function> that is being called after the content are being inserted successfully
             * @param cb [id]<String> is a String of the inserted Modal
             * @returns String: the Modal's content
             **/

    }, {
        key: "defaultTemplate",
        value: function defaultTemplate(id, header, content, footer) {
                var addheader = function addheader() {
                    if (typeof header !== "undefined") {
                        return "<div class=\"art-js-header-content\">".concat(header, "</div>");
                    }

                    return '';
                };

                var addFooter = function addFooter() {
                    if (typeof footer === "function") {
                        return "<div class=\"art-md-footer\"> ".concat(footer(), " </div>");
                    } else if (typeof footer === "string") {
                        return "<div class=\"art-md-footer\"> ".concat(footer, " </div>");
                    }

                    return "";
                };

                var tmp = "<div class=\"art-main-modal art-md-hide right\" id=\"".concat(id, "\" tag-data-back=\"right\" tag-data=\"left\">\n                    <!-- Section md header -->\n                    <div class=\"art-md-header\"> \n                    <button class=\"art-btn-no-mt art-btn waves-effect waves-ripple art-md-back\" id=\"").concat(id, "_back\">Back</button>\n                        ").concat(addheader(), "\n                    </div>\n                    <!-- Main js content  -->\n                    <div class=\"art-md-content\">\n                    ").concat(typeof content === "function" ? this.mlt(content()) : typeof content === "string" ? content : '', "   \n                    </div>\n                    ").concat(addFooter(), "\n                </div>");
                return tmp;
            }
            /** 
             * Write Function
             * @param options<Object> is an Object that contains the modal's data to be put into art-main-section
             * @param options.id<String> is a string that defines the modal/document's id art-main-modal
             * @param options.header<String> is a string that defines the modal/document's Title in header section
             * @param options.content<String/Function> is a string/function[that returns string] that is used as user defined content to be displayed in the 
             * modal/document's content section
             * @param options.footer<String/Function> is a String/function[that returns the content] data to be put into md-footer
             * @param cb is a function<Function> that is being called after the content are being inserted successfully
             * @param cb [id]<String> is a String of the inserted Modal
             * @returns String: the Modal's content
             **/

    }, {
        key: "write",
        value: function write() {
                var _this2 = this;

                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function() {
                    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                };
                var id = options.id,
                    header = options.header,
                    content = options.content,
                    footer = options.footer;
                this.init();
                localStorage.setItem('md-showing', id);
                var mainSection = this.g('.art-main-section');
                var tmp = this.defaultTemplate(id, header, content, footer);

                if (!this.g('#' + options.id)) {
                    mainSection.insertAdjacentHTML('BeforeEnd', tmp);
                    setTimeout(function() {
                        _this2.existSector(id);
                    }, 20);
                } else {
                    this.existSector(id);
                }

                if (cb) {
                    cb(id);
                }

                this.initializeBack(id);
                return tmp;
            }
            /** 
             * Initialize the back functionality after the Modal has successfully been inserted
             * @param currentID is a String of the current inserted Modal 
             **/

    }, {
        key: "initializeBack",
        value: function initializeBack(currentID) {
                var _this3 = this;

                var gobackBtn = this.g('#' + currentID + ' ' + '.art-md-back'); // Get the md back to fallback to

                var current_back = localStorage.getItem('md-back'); // Store the the current md back element for the next use

                localStorage.setItem('md-back', this.back); // Add an event listener to the current showing element's back element/btn

                gobackBtn.addEventListener('click', function(e) {
                    var gobackSector = _this3.g('#' + current_back); // Auto show the md back element when go back btn is clicked


                    _this3.autoShow(gobackSector, currentID);
                });
            }
            /**
             * Initialize the show element when the md elements are already in the DOM
             * @param gobackSector is an element we want to show on main sector
             * @param currentID is an ID of the current showing md element
             **/

    }, {
        key: "initialShow",
        value: function initialShow(gobackSector, currentID) {
                var currentSector = currentID ? this.g('#' + currentID) : this.g('.art-md-show') ? this.gA('.art-md-show') : '';

                function showElemnt(currentSector) {
                    // currentSector = window.event.currentTarget;
                    if (currentSector && currentSector.id) {
                        // Hide the current showing md element to have a room for the one we want to show in the progress
                        currentSector.classList.add('left');
                        currentSector.classList.remove('art-md-show');
                        currentSector.classList.add('art-md-hide'); // Check if the is not null/undefined as we want element with id pre-defined

                        if (currentSector.id) {
                            localStorage.setItem('md-back', currentSector.id);
                        }
                    } else {
                        if (window.event.currentTarget.parentElement.classList.contains('art-main-section')) {
                            currentSector = window.event.currentTarget.parentElement;

                            if (currentSector && !currentSector.classList.contains('art-main-section')) {
                                // Hide the current showing md element to have a room for the one we want to show in the progress
                                currentSector.classList.add('left');
                                currentSector.classList.remove('art-md-show');
                                currentSector.classList.add('art-md-hide'); // Check if the is not null/undefined as we want element with id pre-defined as well

                                if (currentSector.id) {
                                    localStorage.setItem('md-back', currentSector.id);
                                } else {
                                    // Generate a new id for the element
                                    currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_'); // Check if the id is unique and only apply to one one element whcih is ours

                                    if (document.querySelectorAll("#" + currentSector.id).length === 1) {
                                        localStorage.setItem('md-back', currentSector.id);
                                    } else {
                                        // Generate a new id with date time stamp if the first one appeared not to be unique
                                        currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_') + Date.now();
                                        localStorage.setItem('md-back', currentSector.id);
                                    }
                                }
                            } else {
                                currentSector = window.event.currentTarget;

                                if (currentSector) {
                                    // Hide the current showing md element to have a room for the one we want to show in the progress
                                    currentSector.classList.add('left');
                                    currentSector.classList.remove('art-md-show');
                                    currentSector.classList.add('art-md-hide'); // Generate a new id for the element

                                    currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_'); // Check if the id is unique and only apply to one one element whcih is ours

                                    if (document.querySelectorAll("#" + currentSector.id).length === 1) {
                                        localStorage.setItem('md-back', currentSector.id);
                                    } else {
                                        // Generate a new id with date time stamp if the first one appeared not to be unique
                                        currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_') + Date.now();
                                        localStorage.setItem('md-back', currentSector.id);
                                    }
                                }
                            }
                        }
                    }
                } // Store current showing md element's id to the local storage to be used late 


                if (currentSector && _typeof(currentSector) !== "object") {
                    localStorage.setItem('md-back', currentSector.id);
                } else if (currentSector && _typeof(currentSector) === "object" && currentSector.length) {
                    var _iterator2 = _createForOfIteratorHelper(currentSector),
                        _step2;

                    try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                            var _currentSector = _step2.value;
                            currentSector = _currentSector;
                            showElemnt(currentSector);
                        }
                    } catch (err) {
                        _iterator2.e(err);
                    } finally {
                        _iterator2.f();
                    }
                } else {
                    currentSector = window.event.currentTarget;
                    showElemnt(currentSector);
                }

                if (gobackSector) {
                    // Remove all the classes that are hidding the md element that we to show and show it
                    gobackSector.classList.add('art-md-show');
                    gobackSector.classList.remove('art-md-hide');
                    gobackSector.classList.remove(gobackSector.getAttribute('tag-data'));
                    gobackSector.classList.remove(gobackSector.getAttribute('tag-data-back')); // Hide the current showing md element to have a room for the one we want to show in the progress

                    currentSector.classList.remove('art-md-show');
                    currentSector.classList.add('art-md-hide');
                    currentSector.classList.add(currentSector.getAttribute('tag-data')); // Make the back functionalities if applicable

                    this.initializeBack(gobackSector.id);
                }
            }
            /**
             * 
             * @param {*} gobackSector <String> The elemnt's id that will go back to after clicking the initialed back button and actual the extact element that will 
             * be shown
             * @param {*} currentID <?> The current element/element's id that is currently shown. by default is art-md-show.
             * So it looks through the DOM and try to find the element with the specified id or even the specified element, otherwise it looks for the art-md-show 
             * element 
             */

    }, {
        key: "autoShow",
        value: function autoShow(gobackSector, currentID) {
                var currentSector = currentID ? this.g('#' + currentID) : this.g('.art-md-show'); // Store the id to look back for when tring to go back

                localStorage.setItem('md-back', currentSector.id);

                if (gobackSector) {
                    gobackSector.classList.add('art-md-show');
                    gobackSector.classList.remove('art-md-hide');
                    gobackSector.classList.remove(gobackSector.getAttribute('tag-data'));
                    gobackSector.classList.remove(gobackSector.getAttribute('tag-data-back'));
                    currentSector.classList.remove('art-md-show');
                    currentSector.classList.add('art-md-hide');
                    currentSector.classList.add(currentSector.getAttribute('tag-data-back'));
                }
            }
            /** 
             * Existing Sectors.
             * 
             * Detecting the already existing Sectors during send element creation or when you call the write method the second time
             * This takes in the id parameter of the being created element and checks if there's an element already exists with that ID
             * @param id<String> This the element's id that is being created  
             * */

    }, {
        key: "existSector",
        value: function existSector(id) {
            var alreadyThereModal = this.g('#' + id);
            alreadyThereModal.classList.add('art-md-show');
            alreadyThereModal.classList.remove('art-md-hide');
            alreadyThereModal.classList.remove(alreadyThereModal.getAttribute('tag-data'));
            alreadyThereModal.classList.remove(alreadyThereModal.getAttribute('tag-data-back'));
        }
    }, {
        key: "mlt",
        value: function mlt(k) {
            var k_ = "";

            for (var i = 0; i < 100; i++) {
                k_ += k;
            }

            return k_;
        }
    }]);

    return MD;
}();