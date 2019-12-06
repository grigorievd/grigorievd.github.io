var app = function(exports) {
    "use strict";
    var _isObject = function(t) {
        return "object" == typeof t ? null !== t : "function" == typeof t
    }
      , toString = {}.toString
      , _cof = function(t) {
        return toString.call(t).slice(8, -1)
    }
      , commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function unwrapExports(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }
    function createCommonjsModule(t, e) {
        return t(e = {
            exports: {}
        }, e.exports),
        e.exports
    }
    var _core = createCommonjsModule(function(t) {
        var e = t.exports = {
            version: "2.6.5"
        };
        "number" == typeof __e && (__e = e)
    }), _core_1 = _core.version, _global = createCommonjsModule(function(t) {
        var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = e)
    }), _library = !1, _shared = createCommonjsModule(function(t) {
        var e = "__core-js_shared__"
          , n = _global[e] || (_global[e] = {});
        (t.exports = function(t, e) {
            return n[t] || (n[t] = void 0 !== e ? e : {})
        }
        )("versions", []).push({
            version: _core.version,
            mode: _library ? "pure" : "global",
            copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
        })
    }), id = 0, px = Math.random(), _uid = function(t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++id + px).toString(36))
    }, _wks = createCommonjsModule(function(t) {
        var e = _shared("wks")
          , n = _global.Symbol
          , i = "function" == typeof n;
        (t.exports = function(t) {
            return e[t] || (e[t] = i && n[t] || (i ? n : _uid)("Symbol." + t))
        }
        ).store = e
    }), MATCH = _wks("match"), _isRegexp = function(t) {
        var e;
        return _isObject(t) && (void 0 !== (e = t[MATCH]) ? !!e : "RegExp" == _cof(t))
    }, _anObject = function(t) {
        if (!_isObject(t))
            throw TypeError(t + " is not an object!");
        return t
    }, _aFunction = function(t) {
        if ("function" != typeof t)
            throw TypeError(t + " is not a function!");
        return t
    }, SPECIES = _wks("species"), _speciesConstructor = function(t, e) {
        var n, i = _anObject(t).constructor;
        return void 0 === i || null == (n = _anObject(i)[SPECIES]) ? e : _aFunction(n)
    }, ceil = Math.ceil, floor = Math.floor, _toInteger = function(t) {
        return isNaN(t = +t) ? 0 : (0 < t ? floor : ceil)(t)
    }, _defined = function(t) {
        if (null == t)
            throw TypeError("Can't call method on  " + t);
        return t
    }, _stringAt = function(t) {
        return function(e, n) {
            var i, r, o = String(_defined(e)), s = _toInteger(n), a = o.length;
            return s < 0 || a <= s ? t ? "" : void 0 : (i = o.charCodeAt(s)) < 55296 || 56319 < i || s + 1 === a || (r = o.charCodeAt(s + 1)) < 56320 || 57343 < r ? t ? o.charAt(s) : i : t ? o.slice(s, s + 2) : r - 56320 + (i - 55296 << 10) + 65536
        }
    }, at = _stringAt(!0), _advanceStringIndex = function(t, e, n) {
        return e + (n ? at(t, e).length : 1)
    }, min = Math.min, _toLength = function(t) {
        return 0 < t ? min(_toInteger(t), 9007199254740991) : 0
    }, TAG = _wks("toStringTag"), ARG = "Arguments" == _cof(function() {
        return arguments
    }()), tryGet = function(t, e) {
        try {
            return t[e]
        } catch (t) {}
    }, _classof = function(t) {
        var e, n, i;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = tryGet(e = Object(t), TAG)) ? n : ARG ? _cof(e) : "Object" == (i = _cof(e)) && "function" == typeof e.callee ? "Arguments" : i
    }, builtinExec = RegExp.prototype.exec, _regexpExecAbstract = function(t, e) {
        var n = t.exec;
        if ("function" == typeof n) {
            var i = n.call(t, e);
            if ("object" != typeof i)
                throw new TypeError("RegExp exec method returned something other than an Object or null");
            return i
        }
        if ("RegExp" !== _classof(t))
            throw new TypeError("RegExp#exec called on incompatible receiver");
        return builtinExec.call(t, e)
    }, _flags = function() {
        var t = _anObject(this)
          , e = "";
        return t.global && (e += "g"),
        t.ignoreCase && (e += "i"),
        t.multiline && (e += "m"),
        t.unicode && (e += "u"),
        t.sticky && (e += "y"),
        e
    }, nativeExec = RegExp.prototype.exec, nativeReplace = String.prototype.replace, patchedExec = nativeExec, LAST_INDEX = "lastIndex", UPDATES_LAST_INDEX_WRONG = (ha = /a/,
    ia = /b*/g,
    nativeExec.call(ha, "a"),
    nativeExec.call(ia, "a"),
    0 !== ha[LAST_INDEX] || 0 !== ia[LAST_INDEX]), ha, ia, NPCG_INCLUDED = void 0 !== /()??/.exec("")[1], PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
    PATCH && (patchedExec = function(t) {
        var e, n, i, r, o = this;
        return NPCG_INCLUDED && (n = new RegExp("^" + o.source + "$(?!\\s)",_flags.call(o))),
        UPDATES_LAST_INDEX_WRONG && (e = o[LAST_INDEX]),
        i = nativeExec.call(o, t),
        UPDATES_LAST_INDEX_WRONG && i && (o[LAST_INDEX] = o.global ? i.index + i[0].length : e),
        NPCG_INCLUDED && i && 1 < i.length && nativeReplace.call(i[0], n, function() {
            for (r = 1; r < arguments.length - 2; r++)
                void 0 === arguments[r] && (i[r] = void 0)
        }),
        i
    }
    );
    var _regexpExec = patchedExec
      , _fails = function(t) {
        try {
            return !!t()
        } catch (t) {
            return !0
        }
    }
      , _descriptors = !_fails(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
      , document$1 = _global.document
      , is = _isObject(document$1) && _isObject(document$1.createElement)
      , _domCreate = function(t) {
        return is ? document$1.createElement(t) : {}
    }
      , _ie8DomDefine = !_descriptors && !_fails(function() {
        return 7 != Object.defineProperty(_domCreate("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
      , _toPrimitive = function(t, e) {
        if (!_isObject(t))
            return t;
        var n, i;
        if (e && "function" == typeof (n = t.toString) && !_isObject(i = n.call(t)))
            return i;
        if ("function" == typeof (n = t.valueOf) && !_isObject(i = n.call(t)))
            return i;
        if (!e && "function" == typeof (n = t.toString) && !_isObject(i = n.call(t)))
            return i;
        throw TypeError("Can't convert object to primitive value")
    }
      , dP = Object.defineProperty
      , f = _descriptors ? Object.defineProperty : function(t, e, n) {
        if (_anObject(t),
        e = _toPrimitive(e, !0),
        _anObject(n),
        _ie8DomDefine)
            try {
                return dP(t, e, n)
            } catch (t) {}
        if ("get"in n || "set"in n)
            throw TypeError("Accessors not supported!");
        return "value"in n && (t[e] = n.value),
        t
    }
      , _objectDp = {
        f: f
    }
      , _propertyDesc = function(t, e) {
        return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e
        }
    }
      , _hide = _descriptors ? function(t, e, n) {
        return _objectDp.f(t, e, _propertyDesc(1, n))
    }
    : function(t, e, n) {
        return t[e] = n,
        t
    }
      , hasOwnProperty = {}.hasOwnProperty
      , _has = function(t, e) {
        return hasOwnProperty.call(t, e)
    }
      , _functionToString = _shared("native-function-to-string", Function.toString)
      , _redefine = createCommonjsModule(function(t) {
        var e = _uid("src")
          , n = "toString"
          , i = ("" + _functionToString).split(n);
        _core.inspectSource = function(t) {
            return _functionToString.call(t)
        }
        ,
        (t.exports = function(t, n, r, o) {
            var s = "function" == typeof r;
            s && (_has(r, "name") || _hide(r, "name", n)),
            t[n] !== r && (s && (_has(r, e) || _hide(r, e, t[n] ? "" + t[n] : i.join(String(n)))),
            t === _global ? t[n] = r : o ? t[n] ? t[n] = r : _hide(t, n, r) : (delete t[n],
            _hide(t, n, r)))
        }
        )(Function.prototype, n, function() {
            return "function" == typeof this && this[e] || _functionToString.call(this)
        })
    })
      , _ctx = function(t, e, n) {
        if (_aFunction(t),
        void 0 === e)
            return t;
        switch (n) {
        case 1:
            return function(n) {
                return t.call(e, n)
            }
            ;
        case 2:
            return function(n, i) {
                return t.call(e, n, i)
            }
            ;
        case 3:
            return function(n, i, r) {
                return t.call(e, n, i, r)
            }
        }
        return function() {
            return t.apply(e, arguments)
        }
    }
      , PROTOTYPE = "prototype"
      , $export = function(t, e, n) {
        var i, r, o, s, a = t & $export.F, l = t & $export.G, c = t & $export.S, u = t & $export.P, d = t & $export.B, h = l ? _global : c ? _global[e] || (_global[e] = {}) : (_global[e] || {})[PROTOTYPE], f = l ? _core : _core[e] || (_core[e] = {}), p = f[PROTOTYPE] || (f[PROTOTYPE] = {});
        for (i in l && (n = e),
        n)
            o = ((r = !a && h && void 0 !== h[i]) ? h : n)[i],
            s = d && r ? _ctx(o, _global) : u && "function" == typeof o ? _ctx(Function.call, o) : o,
            h && _redefine(h, i, o, t & $export.U),
            f[i] != o && _hide(f, i, s),
            u && p[i] != o && (p[i] = o)
    };
    _global.core = _core,
    $export.F = 1,
    $export.G = 2,
    $export.S = 4,
    $export.P = 8,
    $export.B = 16,
    $export.W = 32,
    $export.U = 64,
    $export.R = 128;
    var _export = $export;
    _export({
        target: "RegExp",
        proto: !0,
        forced: _regexpExec !== /./.exec
    }, {
        exec: _regexpExec
    });
    var SPECIES$1 = _wks("species")
      , REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function() {
        var t = /./;
        return t.exec = function() {
            var t = [];
            return t.groups = {
                a: "7"
            },
            t
        }
        ,
        "7" !== "".replace(t, "$<a>")
    })
      , SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function() {
        var t = /(?:)/
          , e = t.exec;
        t.exec = function() {
            return e.apply(this, arguments)
        }
        ;
        var n = "ab".split(t);
        return 2 === n.length && "a" === n[0] && "b" === n[1]
    }()
      , _fixReWks = function(t, e, n) {
        var i = _wks(t)
          , r = !_fails(function() {
            var e = {};
            return e[i] = function() {
                return 7
            }
            ,
            7 != ""[t](e)
        })
          , o = r ? !_fails(function() {
            var e = !1
              , n = /a/;
            return n.exec = function() {
                return e = !0,
                null
            }
            ,
            "split" === t && (n.constructor = {},
            n.constructor[SPECIES$1] = function() {
                return n
            }
            ),
            n[i](""),
            !e
        }) : void 0;
        if (!r || !o || "replace" === t && !REPLACE_SUPPORTS_NAMED_GROUPS || "split" === t && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
            var s = /./[i]
              , a = n(_defined, i, ""[t], function(t, e, n, i, o) {
                return e.exec === _regexpExec ? r && !o ? {
                    done: !0,
                    value: s.call(e, n, i)
                } : {
                    done: !0,
                    value: t.call(n, e, i)
                } : {
                    done: !1
                }
            })
              , l = a[0]
              , c = a[1];
            _redefine(String.prototype, t, l),
            _hide(RegExp.prototype, i, 2 == e ? function(t, e) {
                return c.call(t, this, e)
            }
            : function(t) {
                return c.call(t, this)
            }
            )
        }
    }
      , $min = Math.min
      , $push = [].push
      , $SPLIT = "split"
      , LENGTH = "length"
      , LAST_INDEX$1 = "lastIndex"
      , MAX_UINT32 = 4294967295
      , SUPPORTS_Y = !_fails(function() {});
    _fixReWks("split", 2, function(t, e, n, i) {
        var r;
        return r = "c" == "abbc"[$SPLIT](/(b)*/)[1] || 4 != "test"[$SPLIT](/(?:)/, -1)[LENGTH] || 2 != "ab"[$SPLIT](/(?:ab)*/)[LENGTH] || 4 != "."[$SPLIT](/(.?)(.?)/)[LENGTH] || 1 < "."[$SPLIT](/()()/)[LENGTH] || ""[$SPLIT](/.?/)[LENGTH] ? function(t, e) {
            var i = String(this);
            if (void 0 === t && 0 === e)
                return [];
            if (!_isRegexp(t))
                return n.call(i, t, e);
            for (var r, o, s, a = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), c = 0, u = void 0 === e ? MAX_UINT32 : e >>> 0, d = new RegExp(t.source,l + "g"); (r = _regexpExec.call(d, i)) && !(c < (o = d[LAST_INDEX$1]) && (a.push(i.slice(c, r.index)),
            1 < r[LENGTH] && r.index < i[LENGTH] && $push.apply(a, r.slice(1)),
            s = r[0][LENGTH],
            c = o,
            a[LENGTH] >= u)); )
                d[LAST_INDEX$1] === r.index && d[LAST_INDEX$1]++;
            return c === i[LENGTH] ? !s && d.test("") || a.push("") : a.push(i.slice(c)),
            a[LENGTH] > u ? a.slice(0, u) : a
        }
        : "0"[$SPLIT](void 0, 0)[LENGTH] ? function(t, e) {
            return void 0 === t && 0 === e ? [] : n.call(this, t, e)
        }
        : n,
        [function(n, i) {
            var o = t(this)
              , s = null == n ? void 0 : n[e];
            return void 0 !== s ? s.call(n, o, i) : r.call(String(o), n, i)
        }
        , function(t, e) {
            var o = i(r, t, this, e, r !== n);
            if (o.done)
                return o.value;
            var s = _anObject(t)
              , a = String(this)
              , l = _speciesConstructor(s, RegExp)
              , c = s.unicode
              , u = (s.ignoreCase ? "i" : "") + (s.multiline ? "m" : "") + (s.unicode ? "u" : "") + (SUPPORTS_Y ? "y" : "g")
              , d = new l(SUPPORTS_Y ? s : "^(?:" + s.source + ")",u)
              , h = void 0 === e ? MAX_UINT32 : e >>> 0;
            if (0 === h)
                return [];
            if (0 === a.length)
                return null === _regexpExecAbstract(d, a) ? [a] : [];
            for (var f = 0, p = 0, m = []; p < a.length; ) {
                d.lastIndex = SUPPORTS_Y ? p : 0;
                var E, g = _regexpExecAbstract(d, SUPPORTS_Y ? a : a.slice(p));
                if (null === g || (E = $min(_toLength(d.lastIndex + (SUPPORTS_Y ? 0 : p)), a.length)) === f)
                    p = _advanceStringIndex(a, p, c);
                else {
                    if (m.push(a.slice(f, p)),
                    m.length === h)
                        return m;
                    for (var v = 1; v <= g.length - 1; v++)
                        if (m.push(g[v]),
                        m.length === h)
                            return m;
                    p = f = E
                }
            }
            return m.push(a.slice(f)),
            m
        }
        ]
    });
    var _iobject = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
        return "String" == _cof(t) ? t.split("") : Object(t)
    }
      , _toObject = function(t) {
        return Object(_defined(t))
    }
      , _isArray = Array.isArray || function(t) {
        return "Array" == _cof(t)
    }
      , SPECIES$2 = _wks("species")
      , _arraySpeciesConstructor = function(t) {
        var e;
        return _isArray(t) && ("function" != typeof (e = t.constructor) || e !== Array && !_isArray(e.prototype) || (e = void 0),
        _isObject(e) && null === (e = e[SPECIES$2]) && (e = void 0)),
        void 0 === e ? Array : e
    }
      , _arraySpeciesCreate = function(t, e) {
        return new (_arraySpeciesConstructor(t))(e)
    }
      , _arrayMethods = function(t, e) {
        var n = 1 == t
          , i = 2 == t
          , r = 3 == t
          , o = 4 == t
          , s = 6 == t
          , a = 5 == t || s
          , l = e || _arraySpeciesCreate;
        return function(e, c, u) {
            for (var d, h, f = _toObject(e), p = _iobject(f), m = _ctx(c, u, 3), E = _toLength(p.length), g = 0, v = n ? l(e, E) : i ? l(e, 0) : void 0; g < E; g++)
                if ((a || g in p) && (h = m(d = p[g], g, f),
                t))
                    if (n)
                        v[g] = h;
                    else if (h)
                        switch (t) {
                        case 3:
                            return !0;
                        case 5:
                            return d;
                        case 6:
                            return g;
                        case 2:
                            v.push(d)
                        }
                    else if (o)
                        return !1;
            return s ? -1 : r || o ? o : v
        }
    }
      , UNSCOPABLES = _wks("unscopables")
      , ArrayProto = Array.prototype;
    null == ArrayProto[UNSCOPABLES] && _hide(ArrayProto, UNSCOPABLES, {});
    var _addToUnscopables = function(t) {
        ArrayProto[UNSCOPABLES][t] = !0
    }
      , $find = _arrayMethods(5)
      , KEY = "find"
      , forced = !0;
    function _classCallCheck(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function _defineProperties(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i)
        }
    }
    function _createClass(t, e, n) {
        return e && _defineProperties(t.prototype, e),
        n && _defineProperties(t, n),
        t
    }
    function _inherits(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && _setPrototypeOf(t, e)
    }
    function _getPrototypeOf(t) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function _setPrototypeOf(t, e) {
        return (_setPrototypeOf = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function _assertThisInitialized(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function _possibleConstructorReturn(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? _assertThisInitialized(t) : e
    }
    function _superPropBase(t, e) {
        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = _getPrototypeOf(t)); )
            ;
        return t
    }
    function _get(t, e, n) {
        return (_get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, n) {
            var i = _superPropBase(t, e);
            if (i) {
                var r = Object.getOwnPropertyDescriptor(i, e);
                return r.get ? r.get.call(n) : r.value
            }
        }
        )(t, e, n || t)
    }
    KEY in [] && Array(1)[KEY](function() {
        forced = !1
    }),
    _export(_export.P + _export.F * forced, "Array", {
        find: function(t) {
            return $find(this, t, 1 < arguments.length ? arguments[1] : void 0)
        }
    }),
    _addToUnscopables(KEY);
    var APP_NAME = "Boilerplate"
      , $document = $(document)
      , $window = $(window)
      , $html = $(document.documentElement).removeClass("has-no-js").addClass("has-js")
      , $body = $(document.body)
      , $pjaxWrapper = $("#js-pjax-wrapper")
      , isDebug = !!$html.data("debug")
      , html = document.documentElement
      , dP$1 = _objectDp.f
      , FProto = Function.prototype
      , nameRE = /^\s*function ([^ (]*)/
      , NAME = "name";
    NAME in FProto || _descriptors && dP$1(FProto, NAME, {
        configurable: !0,
        get: function() {
            try {
                return ("" + this).match(nameRE)[1]
            } catch (t) {
                return ""
            }
        }
    });
    var quot = /"/g
      , createHTML = function(t, e, n, i) {
        var r = String(_defined(t))
          , o = "<" + e;
        return "" !== n && (o += " " + n + '="' + String(i).replace(quot, "&quot;") + '"'),
        o + ">" + r + "</" + e + ">"
    }
      , _stringHtml = function(t, e) {
        var n = {};
        n[t] = e(createHTML),
        _export(_export.P + _export.F * _fails(function() {
            var e = ""[t]('"');
            return e !== e.toLowerCase() || 3 < e.split('"').length
        }), "String", n)
    };
    _stringHtml("link", function(t) {
        return function(e) {
            return t(this, "a", "href", e)
        }
    });
    var foreachEls = function(t, e, n) {
        return t instanceof HTMLCollection || t instanceof NodeList || t instanceof Array ? Array.prototype.forEach.call(t, e, n) : e.call(n, t)
    }
      , evalScript = function(t) {
        var e = t.text || t.textContent || t.innerHTML || ""
          , n = t.src || ""
          , i = t.parentNode || document.querySelector("head") || document.documentElement
          , r = document.createElement("script");
        if (e.match("document.write"))
            return console && console.log && console.log("Script contains document.write. Can’t be executed correctly. Code skipped ", t),
            !1;
        if (r.type = "text/javascript",
        r.id = t.id,
        "" !== n && (r.src = n,
        r.async = !1),
        "" !== e)
            try {
                r.appendChild(document.createTextNode(e))
            } catch (t) {
                r.text = e
            }
        return i.appendChild(r),
        (i instanceof HTMLHeadElement || i instanceof HTMLBodyElement) && i.contains(r) && i.removeChild(r),
        !0
    }
      , executeScripts = function(t) {
        "script" === t.tagName.toLowerCase() && evalScript(t),
        foreachEls(t.querySelectorAll("script"), function(t) {
            t.type && "text/javascript" !== t.type.toLowerCase() || (t.parentNode && t.parentNode.removeChild(t),
            evalScript(t))
        })
    }
      , on = function(t, e, n, i) {
        (e = "string" == typeof e ? e.split(" ") : e).forEach(function(e) {
            foreachEls(t, function(t) {
                t.addEventListener(e, n, i)
            })
        })
    }
      , switches = {
        outerHTML: function(t, e) {
            t.outerHTML = e.outerHTML,
            this.onSwitch()
        },
        innerHTML: function(t, e) {
            t.innerHTML = e.innerHTML,
            "" === e.className ? t.removeAttribute("class") : t.className = e.className,
            this.onSwitch()
        },
        switchElementsAlt: function(t, e) {
            if (t.innerHTML = e.innerHTML,
            e.hasAttributes())
                for (var n = e.attributes, i = 0; i < n.length; i++)
                    t.attributes.setNamedItem(n[i].cloneNode());
            this.onSwitch()
        },
        replaceNode: function(t, e) {
            t.parentNode.replaceChild(e, t),
            this.onSwitch()
        },
        sideBySide: function(t, e, n, i) {
            var r = Array.prototype.forEach
              , o = []
              , s = []
              , a = document.createDocumentFragment()
              , l = "animationend webkitAnimationEnd MSAnimationEnd oanimationend"
              , c = 0
              , u = function(t) {
                t.target === t.currentTarget && --c <= 0 && o && (o.forEach(function(t) {
                    t.parentNode && t.parentNode.removeChild(t)
                }),
                s.forEach(function(t) {
                    t.className = t.className.replace(t.getAttribute("data-pjax-classes"), ""),
                    t.removeAttribute("data-pjax-classes")
                }),
                o = s = null,
                this.onSwitch())
            }
            .bind(this);
            i = i || {},
            r.call(t.childNodes, function(t) {
                o.push(t),
                t.classList && !t.classList.contains("js-Pjax-remove") && (t.hasAttribute("data-pjax-classes") && (t.className = t.className.replace(t.getAttribute("data-pjax-classes"), ""),
                t.removeAttribute("data-pjax-classes")),
                t.classList.add("js-Pjax-remove"),
                i.callbacks && i.callbacks.removeElement && i.callbacks.removeElement(t),
                i.classNames && (t.className += " " + i.classNames.remove + " " + (n.backward ? i.classNames.backward : i.classNames.forward)),
                c++,
                on(t, l, u, !0))
            }),
            r.call(e.childNodes, function(t) {
                if (t.classList) {
                    var e = "";
                    i.classNames && (e = " js-Pjax-add " + i.classNames.add + " " + (n.backward ? i.classNames.forward : i.classNames.backward)),
                    i.callbacks && i.callbacks.addElement && i.callbacks.addElement(t),
                    t.className += e,
                    t.setAttribute("data-pjax-classes", e),
                    s.push(t),
                    a.appendChild(t),
                    c++,
                    on(t, l, u, !0)
                }
            }),
            t.className = e.className,
            t.appendChild(a)
        }
    }
      , parseOptions = function(t) {
        return (t = t || {}).elements = t.elements || "a[href], form[action]",
        t.selectors = t.selectors || ["title", ".js-Pjax"],
        t.switches = t.switches || {},
        t.switchesOptions = t.switchesOptions || {},
        t.history = void 0 === t.history || t.history,
        t.analytics = "function" == typeof t.analytics || !1 === t.analytics ? t.analytics : defaultAnalytics,
        t.scrollTo = void 0 === t.scrollTo ? 0 : t.scrollTo,
        t.scrollRestoration = void 0 === t.scrollRestoration || t.scrollRestoration,
        t.cacheBust = void 0 === t.cacheBust || t.cacheBust,
        t.debug = t.debug || !1,
        t.timeout = t.timeout || 0,
        t.currentUrlFullReload = void 0 !== t.currentUrlFullReload && t.currentUrlFullReload,
        t.switches.head || (t.switches.head = switches.switchElementsAlt),
        t.switches.body || (t.switches.body = switches.switchElementsAlt),
        t
    };
    function defaultAnalytics() {
        window._gaq && _gaq.push(["_trackPageview"]),
        window.ga && ga("send", "pageview", {
            page: location.pathname,
            title: document.title
        })
    }
    var uniqueid = (Ve = 0,
    function() {
        var t = "pjax" + (new Date).getTime() + "_" + Ve;
        return Ve++,
        t
    }
    ), Ve, trigger = function(t, e, n) {
        (e = "string" == typeof e ? e.split(" ") : e).forEach(function(e) {
            var i;
            (i = document.createEvent("HTMLEvents")).initEvent(e, !0, !0),
            i.eventName = e,
            n && Object.keys(n).forEach(function(t) {
                i[t] = n[t]
            }),
            foreachEls(t, function(t) {
                var e = !1;
                t.parentNode || t === document || t === window || (e = !0,
                document.body.appendChild(t)),
                t.dispatchEvent(i),
                e && t.parentNode.removeChild(t)
            })
        })
    }, clone = function(t) {
        if (null === t || "object" != typeof t)
            return t;
        var e = t.constructor();
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }, contains = function(t, e, n) {
        for (var i = 0; i < e.length; i++)
            for (var r = t.querySelectorAll(e[i]), o = 0; o < r.length; o++)
                if (r[o].contains(n))
                    return !0;
        return !1
    }, extend = function(t) {
        if (null == t)
            return null;
        for (var e = Object(t), n = 1; n < arguments.length; n++) {
            var i = arguments[n];
            if (null != i)
                for (var r in i)
                    Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
        }
        return e
    }, noop = function() {}, log = function() {
        this.options.debug && console && ("function" == typeof console.log ? console.log.apply(console, arguments) : console.log && console.log(arguments))
    }, attrState = "data-pjax-state", parseElement = function(t) {
        switch (t.tagName.toLowerCase()) {
        case "a":
            t.hasAttribute(attrState) || this.attachLink(t);
            break;
        case "form":
            t.hasAttribute(attrState) || this.attachForm(t);
            break;
        default:
            throw "Pjax can only be applied on <a> or <form> submit"
        }
    }, attrState$1 = "data-pjax-state", linkAction = function(t, e) {
        if (!isDefaultPrevented(e)) {
            var n = clone(this.options)
              , i = checkIfShouldAbort(t, e);
            if (i)
                t.setAttribute(attrState$1, i);
            else {
                if (e.preventDefault(),
                this.options.currentUrlFullReload && t.href === window.location.href.split("#")[0])
                    return t.setAttribute(attrState$1, "reload"),
                    void this.reload();
                t.setAttribute(attrState$1, "load"),
                n.triggerElement = t,
                this.loadUrl(t.href, n)
            }
        }
    };
    function checkIfShouldAbort(t, e) {
        return 1 < e.which || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ? "modifier" : t.protocol !== window.location.protocol || t.host !== window.location.host ? "external" : t.hash && t.href.replace(t.hash, "") === window.location.href.replace(location.hash, "") ? "anchor" : t.href === window.location.href.split("#")[0] + "#" ? "anchor-empty" : void 0
    }
    var isDefaultPrevented = function(t) {
        return t.defaultPrevented || !1 === t.returnValue
    }
      , attachLink = function(t) {
        var e = this;
        t.setAttribute(attrState$1, ""),
        on(t, "click", function(n) {
            linkAction.call(e, t, n)
        }),
        on(t, "keyup", function(n) {
            13 === n.keyCode && linkAction.call(e, t, n)
        }
        .bind(this))
    }
      , attrState$2 = "data-pjax-state"
      , formAction = function(t, e) {
        if (!isDefaultPrevented$1(e)) {
            var n = clone(this.options);
            n.requestOptions = {
                requestUrl: t.getAttribute("action") || window.location.href,
                requestMethod: t.getAttribute("method") || "GET"
            };
            var i = document.createElement("a");
            i.setAttribute("href", n.requestOptions.requestUrl);
            var r = checkIfShouldAbort$1(i, n);
            r ? t.setAttribute(attrState$2, r) : (e.preventDefault(),
            "multipart/form-data" === t.enctype ? n.requestOptions.formData = new FormData(t) : n.requestOptions.requestParams = parseFormElements(t),
            t.setAttribute(attrState$2, "submit"),
            n.triggerElement = t,
            this.loadUrl(i.href, n))
        }
    };
    function parseFormElements(t) {
        for (var e = [], n = t.elements, i = 0; i < n.length; i++) {
            var r = n[i]
              , o = r.tagName.toLowerCase();
            if (r.name && void 0 !== r.attributes && "button" !== o) {
                var s = r.attributes.type;
                if (!s || "checkbox" !== s.value && "radio" !== s.value || r.checked) {
                    var a = [];
                    if ("select" === o)
                        for (var l, c = 0; c < r.options.length; c++)
                            (l = r.options[c]).selected && !l.disabled && a.push(l.hasAttribute("value") ? l.value : l.text);
                    else
                        a.push(r.value);
                    for (var u = 0; u < a.length; u++)
                        e.push({
                            name: encodeURIComponent(r.name),
                            value: encodeURIComponent(a[u])
                        })
                }
            }
        }
        return e
    }
    function checkIfShouldAbort$1(t, e) {
        return t.protocol !== window.location.protocol || t.host !== window.location.host ? "external" : t.hash && t.href.replace(t.hash, "") === window.location.href.replace(location.hash, "") ? "anchor" : t.href === window.location.href.split("#")[0] + "#" ? "anchor-empty" : e.currentUrlFullReload && t.href === window.location.href.split("#")[0] ? "reload" : void 0
    }
    var isDefaultPrevented$1 = function(t) {
        return t.defaultPrevented || !1 === t.returnValue
    }
      , attachForm = function(t) {
        var e = this;
        t.setAttribute(attrState$2, ""),
        on(t, "submit", function(n) {
            formAction.call(e, t, n)
        })
    }
      , foreachSelectors = function(t, e, n, i) {
        i = i || document,
        t.forEach(function(t) {
            foreachEls(i.querySelectorAll(t), e, n)
        })
    }
      , switchesSelectors = function(t, e, n, i, r, o) {
        var s = [];
        n.forEach(function(n) {
            var a = i.querySelectorAll(n)
              , l = r.querySelectorAll(n);
            if (this.log && this.log("Pjax switch", n, a, l),
            a.length !== l.length)
                throw "DOM doesn’t look the same on new loaded page: ’" + n + "’ - new " + a.length + ", old " + l.length;
            foreachEls(a, function(i, r) {
                var a = l[r];
                this.log && this.log("newEl", i, "oldEl", a);
                var c = t[n] ? t[n].bind(this, a, i, o, e[n]) : switches.outerHTML.bind(this, a, i, o);
                s.push(c)
            }, this)
        }, this),
        this.state.numPendingSwitches = s.length,
        s.forEach(function(t) {
            t()
        })
    }
      , abortRequest = function(t) {
        t && t.readyState < 4 && (t.onreadystatechange = noop,
        t.abort())
    }
      , updateQueryString = function(t, e, n) {
        var i = new RegExp("([?&])" + e + "=.*?(&|$)","i")
          , r = -1 !== t.indexOf("?") ? "&" : "?";
        return t.match(i) ? t.replace(i, "$1" + e + "=" + n + "$2") : t + r + e + "=" + n
    }
      , sendRequest = function(t, e, n) {
        var i, r = (e = e || {}).requestOptions || {}, o = (r.requestMethod || "GET").toUpperCase(), s = r.requestParams || null, a = r.formData || null, l = null, c = new XMLHttpRequest, u = e.timeout || 0;
        if (c.onreadystatechange = function() {
            4 === c.readyState && (200 === c.status ? n(c.responseText, c, t, e) : 0 !== c.status && n(null, c, t, e))
        }
        ,
        c.onerror = function(i) {
            console.log(i),
            n(null, c, t, e)
        }
        ,
        c.ontimeout = function() {
            n(null, c, t, e)
        }
        ,
        s && s.length)
            switch (i = s.map(function(t) {
                return t.name + "=" + t.value
            }).join("&"),
            o) {
            case "GET":
                t = t.split("?")[0],
                t += "?" + i;
                break;
            case "POST":
                l = i
            }
        else
            a && (l = a);
        return e.cacheBust && (t = updateQueryString(t, "t", Date.now())),
        c.open(o, t, !0),
        c.timeout = u,
        c.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        c.setRequestHeader("X-PJAX", "true"),
        c.setRequestHeader("X-PJAX-Selectors", JSON.stringify(e.selectors)),
        l && "POST" === o && !a && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        c.send(l),
        c
    }
      , handleResponse = function(t, e, n, i) {
        if ((i = clone(i || this.options)).request = e,
        !1 !== t) {
            var r = window.history.state || {};
            window.history.replaceState({
                url: r.url || window.location.href,
                title: r.title || document.title,
                uid: r.uid || uniqueid(),
                scrollPos: [document.documentElement.scrollLeft || document.body.scrollLeft, document.documentElement.scrollTop || document.body.scrollTop]
            }, document.title, window.location.href);
            var o = n;
            e.responseURL ? n !== e.responseURL && (n = e.responseURL) : e.getResponseHeader("X-PJAX-URL") ? n = e.getResponseHeader("X-PJAX-URL") : e.getResponseHeader("X-XHR-Redirected-To") && (n = e.getResponseHeader("X-XHR-Redirected-To"));
            var s = document.createElement("a");
            s.href = o;
            var a = s.hash;
            s.href = n,
            a && !s.hash && (s.hash = a,
            n = s.href),
            this.state.href = n,
            this.state.options = i;
            try {
                this.loadContent(t, i)
            } catch (t) {
                if (trigger(document, "pjax:error", i),
                this.options.debug)
                    throw t;
                return console && console.error && console.error("Pjax switch fail: ", t),
                this.latestChance(n)
            }
        } else
            trigger(document, "pjax:complete pjax:error", i)
    }
      , isSupported = function() {
        return window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
    }
      , pjax = createCommonjsModule(function(t) {
        var e = function(t) {
            this.state = {
                numPendingSwitches: 0,
                href: null,
                options: null
            },
            this.options = parseOptions(t),
            this.log("Pjax options", this.options),
            this.options.scrollRestoration && "scrollRestoration"in history && (history.scrollRestoration = "manual"),
            this.maxUid = this.lastUid = uniqueid(),
            this.parseDOM(document),
            on(window, "popstate", function(t) {
                if (t.state) {
                    var e = clone(this.options);
                    e.url = t.state.url,
                    e.title = t.state.title,
                    e.history = !1,
                    e.scrollPos = t.state.scrollPos,
                    t.state.uid < this.lastUid ? e.backward = !0 : e.forward = !0,
                    this.lastUid = t.state.uid,
                    this.loadUrl(t.state.url, e)
                }
            }
            .bind(this))
        };
        if (e.switches = switches,
        e.prototype = {
            log: log,
            getElements: function(t) {
                return t.querySelectorAll(this.options.elements)
            },
            parseDOM: function(t) {
                var e = parseElement;
                foreachEls(this.getElements(t), e, this)
            },
            refresh: function(t) {
                this.parseDOM(t || document)
            },
            reload: function() {
                window.location.reload()
            },
            attachLink: attachLink,
            attachForm: attachForm,
            forEachSelectors: function(t, e, n) {
                return foreachSelectors.bind(this)(this.options.selectors, t, e, n)
            },
            switchSelectors: function(t, e, n, i) {
                return switchesSelectors.bind(this)(this.options.switches, this.options.switchesOptions, t, e, n, i)
            },
            latestChance: function(t) {
                window.location = t
            },
            onSwitch: function() {
                trigger(window, "resize scroll"),
                this.state.numPendingSwitches--,
                0 === this.state.numPendingSwitches && this.afterAllSwitches()
            },
            loadContent: function(t, e) {
                if ("string" == typeof t) {
                    var n = document.implementation.createHTMLDocument("pjax")
                      , i = t.match(/<html[^>]+>/gi);
                    if (i && i.length && (i = i[0].match(/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi)).length && (i.shift(),
                    i.forEach(function(t) {
                        var e = t.trim().split("=");
                        1 === e.length ? n.documentElement.setAttribute(e[0], !0) : n.documentElement.setAttribute(e[0], e[1].slice(1, -1))
                    })),
                    n.documentElement.innerHTML = t,
                    this.log("load content", n.documentElement.attributes, n.documentElement.innerHTML.length),
                    document.activeElement && contains(document, this.options.selectors, document.activeElement))
                        try {
                            document.activeElement.blur()
                        } catch (t) {}
                    this.switchSelectors(this.options.selectors, n, document, e)
                } else
                    trigger(document, "pjax:complete pjax:error", e)
            },
            abortRequest: abortRequest,
            doRequest: sendRequest,
            handleResponse: handleResponse,
            loadUrl: function(t, e) {
                e = "object" == typeof e ? extend({}, this.options, e) : clone(this.options),
                this.log("load href", t, e),
                this.abortRequest(this.request),
                trigger(document, "pjax:send", e),
                this.request = this.doRequest(t, e, this.handleResponse.bind(this))
            },
            afterAllSwitches: function() {
                var t = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();
                t && document.activeElement !== t && t.focus(),
                this.options.selectors.forEach(function(t) {
                    foreachEls(document.querySelectorAll(t), function(t) {
                        executeScripts(t)
                    })
                });
                var e = this.state;
                if (e.options.history && (window.history.state || (this.lastUid = this.maxUid = uniqueid(),
                window.history.replaceState({
                    url: window.location.href,
                    title: document.title,
                    uid: this.maxUid,
                    scrollPos: [0, 0]
                }, document.title)),
                this.lastUid = this.maxUid = uniqueid(),
                window.history.pushState({
                    url: e.href,
                    title: e.options.title,
                    uid: this.maxUid,
                    scrollPos: [0, 0]
                }, e.options.title, e.href)),
                this.forEachSelectors(function(t) {
                    this.parseDOM(t)
                }, this),
                trigger(document, "pjax:complete pjax:success", e.options),
                "function" == typeof e.options.analytics && e.options.analytics(),
                e.options.history) {
                    var n = document.createElement("a");
                    if (n.href = this.state.href,
                    n.hash) {
                        var i = n.hash.slice(1);
                        i = decodeURIComponent(i);
                        var r = 0
                          , o = document.getElementById(i) || document.getElementsByName(i)[0];
                        if (o && o.offsetParent)
                            for (; r += o.offsetTop,
                            o = o.offsetParent; )
                                ;
                        window.scrollTo(0, r)
                    } else
                        !1 !== e.options.scrollTo && (1 < e.options.scrollTo.length ? window.scrollTo(e.options.scrollTo[0], e.options.scrollTo[1]) : window.scrollTo(0, e.options.scrollTo))
                } else
                    e.options.scrollRestoration && e.options.scrollPos && window.scrollTo(e.options.scrollPos[0], e.options.scrollPos[1]);
                this.state = {
                    numPendingSwitches: 0,
                    href: null,
                    options: null
                }
            }
        },
        e.isSupported = isSupported,
        e.isSupported())
            t.exports = e;
        else {
            var n = noop;
            for (var i in e.prototype)
                e.prototype.hasOwnProperty(i) && "function" == typeof e.prototype[i] && (n[i] = noop);
            t.exports = n
        }
    })
      , _default = function() {
        function t(e) {
            _classCallCheck(this, t),
            this.options = e,
            this.wrapper = e.wrapper,
            this.overrideClass = e.overrideClass ? e.overrideClass : "",
            this.clickedLink = e.clickedLink
        }
        return _createClass(t, [{
            key: "launch",
            value: function() {
                isDebug && console.log("---- Launch transition 👊 -----"),
                $html.removeClass("has-dom-loaded has-dom-animated has-nav-sticky has-nav-open").addClass("has-dom-loading ".concat(this.overrideClass))
            }
        }, {
            key: "hideView",
            value: function(t, e) {
                isDebug && console.log("----- ❌ [VIEW]:hide - ", t.getAttribute("data-template")),
                setTimeout(function() {
                    $document.triggerHandler({
                        type: EVENT.READYTOAPPEND,
                        oldView: t,
                        newView: e
                    })
                }, 800)
            }
        }, {
            key: "displayView",
            value: function(t) {
                var e = this;
                isDebug && console.log("----- ✅ [VIEW]:display :", t.getAttribute("data-template")),
                $html.attr("data-template", t.getAttribute("data-template")),
                $html.addClass("has-dom-loaded").removeClass("has-dom-loading"),
                setTimeout(function() {
                    $html.removeClass(e.overrideClass).addClass("has-dom-animated")
                }, 1e3),
                $document.triggerHandler({
                    type: EVENT.READYTODESTROY
                })
            }
        }, {
            key: "destroy",
            value: function() {
                isDebug && console.log("---- ❌ [transition]:destroy -----")
            }
        }]),
        t
    }()
      , _default$1 = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).overrideClass = "-custom-transition",
            n
        }
        return _inherits(e, _default),
        e
    }()
      , transitions = Object.freeze({
        BaseTransition: _default,
        CustomTransition: _default$1
    })
      , MODULE_NAME = "Transition"
      , EVENT_NAMESPACE = "".concat(APP_NAME, ".").concat(MODULE_NAME)
      , EVENT = {
        CLICK: "click.".concat(EVENT_NAMESPACE),
        READYTOAPPEND: "readyToAppend.".concat(EVENT_NAMESPACE),
        READYTODESTROY: "readyToDestroy.".concat(EVENT_NAMESPACE),
        GOTO: "goto.".concat(EVENT_NAMESPACE)
    }
      , _default$2 = function() {
        function _default$1() {
            var t = this;
            _classCallCheck(this, _default$1),
            $html.addClass("has-dom-first-load"),
            setTimeout(function() {
                t.load()
            }, 600),
            this.transition = new _default({
                wrapper: this.wrapper
            }),
            this.containerClass = ".js-pjax-container",
            this.wrapperId = "js-pjax-wrapper",
            this.noPjaxRequestClass = "no-transition",
            this.wrapper = document.getElementById(this.wrapperId),
            this.options = {
                debug: !1,
                cacheBust: !1,
                elements: ["a:not(.".concat(this.noPjaxRequestClass, ")"), "form[action]"],
                selectors: ["title", "".concat(this.containerClass)],
                switches: {},
                requestOptions: {
                    timeout: 2e3
                }
            },
            this.options.switches[this.containerClass] = function(e, n, i) {
                return t.switch(e, n, i)
            }
            ,
            this.pjax = new pjax(this.options),
            document.addEventListener("pjax:send", function(e) {
                return t.send(e)
            }),
            $document.on(EVENT.READYTOAPPEND, function(e) {
                t.append(e.oldView, e.newView)
            }),
            $document.on(EVENT.READYTODESTROY, function(e) {
                t.reinit()
            }),
            $document.on(EVENT.GOTO, function(e) {
                null != e.options.el && (t.autoEl = e.options.el.get(0)),
                t.pjax.loadUrl(e.options.link, $.extend({}, t.pjax.options))
            })
        }
        return _createClass(_default$1, [{
            key: "send",
            value: function(t) {
                var e, n;
                isDebug && console.log("---- Launch request 🙌 -----"),
                null != t.triggerElement ? (n = (e = t.triggerElement).getAttribute("data-transition") ? e.getAttribute("data-transition") : "BaseTransition",
                $html.attr("data-transition", n)) : (e = null != this.autoEl ? this.autoEl : document,
                n = "BaseTransition"),
                this.transition = new transitions[n]({
                    wrapper: this.wrapper,
                    clickedLink: e
                }),
                this.transition.launch()
            }
        }, {
            key: "switch",
            value: function(t, e, n) {
                isDebug && console.log("---- Next view loaded 👌 -----"),
                this.transition.hideView(t, e)
            }
        }, {
            key: "append",
            value: function(t, e) {
                e.style.opacity = 0,
                this.wrapper.appendChild(e),
                e.style.opacity = 1,
                this.change(t, e)
            }
        }, {
            key: "change",
            value: function change(oldView, newView) {
                $document.triggerHandler({
                    type: EVENT$d.DELETE_SCOPED_MODULES,
                    $scope: $pjaxWrapper
                }),
                this.wrapper.innerHTML = newView.outerHTML,
                oldView.remove();
                var scripts = newView.querySelectorAll("script.js-inline");
                if (scripts instanceof window.NodeList)
                    for (var i = 0, len = scripts.length; i < len; i++)
                        eval(scripts[i].innerHTML);
                $document.triggerHandler({
                    type: EVENT$d.INIT_SCOPED_MODULES,
                    isPjax: !0
                }),
                this.pjax.onSwitch(),
                this.transition.displayView(newView),
                window.fbq && fbq("track", "PageView"),
                window.gtag && gtag("config", "CODE", {
                    page_path: location.pathname,
                    page_title: document.title
                }),
                void 0 !== _qevents && _qevents.push({
                    qacct: "p-7Xj1yJDCw1_Y5"
                })
            }
        }, {
            key: "reinit",
            value: function() {
                this.transition.destroy(),
                $html.attr("data-transition", ""),
                this.transition = new _default({
                    wrapper: this.wrapper
                })
            }
        }, {
            key: "load",
            value: function() {
                $html.addClass("has-dom-loaded has-dom-first-load"),
                $html.removeClass("has-dom-loading"),
                setTimeout(function() {
                    $html.addClass("has-dom-animated"),
                    setTimeout(function() {
                        $html.removeClass("has-dom-first-load")
                    }, 1200)
                }, 1e3)
            }
        }]),
        _default$1
    }()
      , es5 = createCommonjsModule(function(t, e) {
        t.exports = function(t) {
            var e = {};
            function n(i) {
                if (e[i])
                    return e[i].exports;
                var r = e[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(r.exports, r, r.exports, n),
                r.l = !0,
                r.exports
            }
            return n.m = t,
            n.c = e,
            n.d = function(t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: i
                })
            }
            ,
            n.r = function(t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }
            ,
            n.t = function(t, e) {
                if (1 & e && (t = n(t)),
                8 & e)
                    return t;
                if (4 & e && "object" == typeof t && t && t.__esModule)
                    return t;
                var i = Object.create(null);
                if (n.r(i),
                Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }),
                2 & e && "string" != typeof t)
                    for (var r in t)
                        n.d(i, r, function(e) {
                            return t[e]
                        }
                        .bind(null, r));
                return i
            }
            ,
            n.n = function(t) {
                var e = t && t.__esModule ? function() {
                    return t.default
                }
                : function() {
                    return t
                }
                ;
                return n.d(e, "a", e),
                e
            }
            ,
            n.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            ,
            n.p = "",
            n(n.s = 86)
        }({
            17: function(t, e, n) {
                var i, r;
                void 0 === (r = "function" == typeof (i = function(n) {
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0;
                    var i = function() {
                        function t() {
                            !function(e, n) {
                                if (!(e instanceof t))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this)
                        }
                        return function(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value"in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                            }
                        }(t, [{
                            key: "getFirstMatch",
                            value: function(t, e) {
                                var n = e.match(t);
                                return n && 0 < n.length && n[1] || ""
                            }
                        }, {
                            key: "getSecondMatch",
                            value: function(t, e) {
                                var n = e.match(t);
                                return n && 1 < n.length && n[2] || ""
                            }
                        }, {
                            key: "matchAndReturnConst",
                            value: function(t, e, n) {
                                if (t.test(e))
                                    return n
                            }
                        }, {
                            key: "getWindowsVersionName",
                            value: function(t) {
                                switch (t) {
                                case "NT":
                                    return "NT";
                                case "XP":
                                    return "XP";
                                case "NT 5.0":
                                    return "2000";
                                case "NT 5.1":
                                    return "XP";
                                case "NT 5.2":
                                    return "2003";
                                case "NT 6.0":
                                    return "Vista";
                                case "NT 6.1":
                                    return "7";
                                case "NT 6.2":
                                    return "8";
                                case "NT 6.3":
                                    return "8.1";
                                case "NT 10.0":
                                    return "10";
                                default:
                                    return
                                }
                            }
                        }, {
                            key: "getAndroidVersionName",
                            value: function(t) {
                                var e = t.split(".").splice(0, 2).map(function(t) {
                                    return parseInt(t, 10) || 0
                                });
                                if (e.push(0),
                                !(1 === e[0] && e[1] < 5))
                                    return 1 === e[0] && e[1] < 6 ? "Cupcake" : 1 === e[0] && 6 <= e[1] ? "Donut" : 2 === e[0] && e[1] < 2 ? "Eclair" : 2 === e[0] && 2 === e[1] ? "Froyo" : 2 === e[0] && 2 < e[1] ? "Gingerbread" : 3 === e[0] ? "Honeycomb" : 4 === e[0] && e[1] < 1 ? "Ice Cream Sandwich" : 4 === e[0] && e[1] < 4 ? "Jelly Bean" : 4 === e[0] && 4 <= e[1] ? "KitKat" : 5 === e[0] ? "Lollipop" : 6 === e[0] ? "Marshmallow" : 7 === e[0] ? "Nougat" : 8 === e[0] ? "Oreo" : void 0
                            }
                        }, {
                            key: "getVersionPrecision",
                            value: function(t) {
                                return t.split(".").length
                            }
                        }, {
                            key: "compareVersions",
                            value: function(e, n) {
                                var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
                                  , r = t.getVersionPrecision(e)
                                  , o = t.getVersionPrecision(n)
                                  , s = Math.max(r, o)
                                  , a = 0
                                  , l = t.map([e, n], function(e) {
                                    var n = s - t.getVersionPrecision(e)
                                      , i = e + new Array(n + 1).join(".0");
                                    return t.map(i.split("."), function(t) {
                                        return new Array(20 - t.length).join("0") + t
                                    }).reverse()
                                });
                                for (i && (a = s - Math.min(r, o)),
                                s -= 1; a <= s; ) {
                                    if (l[0][s] > l[1][s])
                                        return 1;
                                    if (l[0][s] === l[1][s]) {
                                        if (s === a)
                                            return 0;
                                        s -= 1
                                    } else if (l[0][s] < l[1][s])
                                        return -1
                                }
                            }
                        }, {
                            key: "map",
                            value: function(t, e) {
                                var n, i = [];
                                if (Array.prototype.map)
                                    return Array.prototype.map.call(t, e);
                                for (n = 0; n < t.length; n += 1)
                                    i.push(e(t[n]));
                                return i
                            }
                        }]),
                        t
                    }();
                    n.default = i,
                    t.exports = e.default
                }
                ) ? i.apply(e, [e]) : i) || (t.exports = r)
            },
            86: function(t, e, n) {
                var i, r, o;
                r = [e, n(87)],
                void 0 === (o = "function" == typeof (i = function(n, i) {
                    var r;
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0,
                    i = (r = i) && r.__esModule ? r : {
                        default: r
                    };
                    var o = function() {
                        function t() {
                            !function(t, e) {
                                if (!(t instanceof e))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this, t)
                        }
                        return function(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value"in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                            }
                        }(t, [{
                            key: "getParser",
                            value: function(t) {
                                var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                                if ("string" != typeof t)
                                    throw new Error("UserAgent should be a string");
                                return new i.default(t,e)
                            }
                        }, {
                            key: "parse",
                            value: function(t) {
                                return new i.default(t).getResult()
                            }
                        }]),
                        t
                    }();
                    n.default = o,
                    t.exports = e.default
                }
                ) ? i.apply(e, r) : i) || (t.exports = o)
            },
            87: function(t, e, n) {
                var i, r, o;
                r = [e, n(88), n(89), n(90), n(91), n(17)],
                void 0 === (o = "function" == typeof (i = function(n, i, r, o, s, a) {
                    function l(t) {
                        return t && t.__esModule ? t : {
                            default: t
                        }
                    }
                    function c(t) {
                        return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                            return typeof t
                        }
                        : function(t) {
                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                        }
                        )(t)
                    }
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0,
                    i = l(i),
                    r = l(r),
                    o = l(o),
                    s = l(s),
                    a = l(a);
                    var u = function() {
                        function t(e) {
                            var n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                            if (function(e, n) {
                                if (!(e instanceof t))
                                    throw new TypeError("Cannot call a class as a function")
                            }(this),
                            null == e || "" === e)
                                throw new Error("UserAgent parameter can't be empty");
                            this._ua = e,
                            this.parsedResult = {},
                            !0 !== n && this.parse()
                        }
                        return function(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value"in i && (i.writable = !0),
                                Object.defineProperty(t, i.key, i)
                            }
                        }(t.prototype, [{
                            key: "getUA",
                            value: function() {
                                return this._ua
                            }
                        }, {
                            key: "test",
                            value: function(t) {
                                return t.test(this._ua)
                            }
                        }, {
                            key: "parseBrowser",
                            value: function() {
                                var t = this;
                                this.parsedResult.browser = {};
                                var e = i.default.find(function(e) {
                                    if ("function" == typeof e.test)
                                        return e.test(t);
                                    if (e.test instanceof Array)
                                        return e.test.some(function(e) {
                                            return t.test(e)
                                        });
                                    throw new Error("Browser's test function is not valid")
                                });
                                return e && (this.parsedResult.browser = e.describe(this.getUA())),
                                this.parsedResult.browser
                            }
                        }, {
                            key: "getBrowser",
                            value: function() {
                                return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
                            }
                        }, {
                            key: "getBrowserName",
                            value: function(t) {
                                return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
                            }
                        }, {
                            key: "getBrowserVersion",
                            value: function() {
                                return this.getBrowser().version
                            }
                        }, {
                            key: "getOS",
                            value: function() {
                                return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
                            }
                        }, {
                            key: "parseOS",
                            value: function() {
                                var t = this;
                                this.parsedResult.os = {};
                                var e = r.default.find(function(e) {
                                    if ("function" == typeof e.test)
                                        return e.test(t);
                                    if (e.test instanceof Array)
                                        return e.test.some(function(e) {
                                            return t.test(e)
                                        });
                                    throw new Error("Browser's test function is not valid")
                                });
                                return e && (this.parsedResult.os = e.describe(this.getUA())),
                                this.parsedResult.os
                            }
                        }, {
                            key: "getOSName",
                            value: function(t) {
                                var e = this.getOS().name;
                                return t ? String(e).toLowerCase() || "" : e || ""
                            }
                        }, {
                            key: "getOSVersion",
                            value: function() {
                                return this.getOS().version
                            }
                        }, {
                            key: "getPlatform",
                            value: function() {
                                return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
                            }
                        }, {
                            key: "getPlatformType",
                            value: function() {
                                var t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0]
                                  , e = this.getPlatform().type;
                                return t ? String(e).toLowerCase() || "" : e || ""
                            }
                        }, {
                            key: "parsePlatform",
                            value: function() {
                                var t = this;
                                this.parsedResult.platform = {};
                                var e = o.default.find(function(e) {
                                    if ("function" == typeof e.test)
                                        return e.test(t);
                                    if (e.test instanceof Array)
                                        return e.test.some(function(e) {
                                            return t.test(e)
                                        });
                                    throw new Error("Browser's test function is not valid")
                                });
                                return e && (this.parsedResult.platform = e.describe(this.getUA())),
                                this.parsedResult.platform
                            }
                        }, {
                            key: "getEngine",
                            value: function() {
                                return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
                            }
                        }, {
                            key: "getEngineName",
                            value: function(t) {
                                return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
                            }
                        }, {
                            key: "parseEngine",
                            value: function() {
                                var t = this;
                                this.parsedResult.engine = {};
                                var e = s.default.find(function(e) {
                                    if ("function" == typeof e.test)
                                        return e.test(t);
                                    if (e.test instanceof Array)
                                        return e.test.some(function(e) {
                                            return t.test(e)
                                        });
                                    throw new Error("Browser's test function is not valid")
                                });
                                return e && (this.parsedResult.engine = e.describe(this.getUA())),
                                this.parsedResult.engine
                            }
                        }, {
                            key: "parse",
                            value: function() {
                                return this.parseBrowser(),
                                this.parseOS(),
                                this.parsePlatform(),
                                this.parseEngine(),
                                this
                            }
                        }, {
                            key: "getResult",
                            value: function() {
                                return Object.assign({}, this.parsedResult)
                            }
                        }, {
                            key: "satisfies",
                            value: function(t) {
                                var e = this
                                  , n = {}
                                  , i = 0
                                  , r = {}
                                  , o = 0;
                                if (Object.keys(t).forEach(function(e) {
                                    var s = t[e];
                                    "string" == typeof s ? (r[e] = s,
                                    o += 1) : "object" === c(s) && (n[e] = s,
                                    i += 1)
                                }),
                                0 < i) {
                                    var s = Object.keys(n)
                                      , a = s.find(function(t) {
                                        return e.isOS(t)
                                    });
                                    if (a) {
                                        var l = this.satisfies(n[a]);
                                        if (void 0 !== l)
                                            return l
                                    }
                                    var u = s.find(function(t) {
                                        return e.isPlatform(t)
                                    });
                                    if (u) {
                                        var d = this.satisfies(n[u]);
                                        if (void 0 !== d)
                                            return d
                                    }
                                }
                                if (0 < o) {
                                    var h = Object.keys(r).find(function(t) {
                                        return e.isBrowser(t)
                                    });
                                    if (void 0 !== h)
                                        return this.compareVersion(r[h])
                                }
                            }
                        }, {
                            key: "isBrowser",
                            value: function(t) {
                                return this.getBrowserName(!0) === String(t).toLowerCase()
                            }
                        }, {
                            key: "compareVersion",
                            value: function(t) {
                                var e = [0]
                                  , n = t
                                  , i = !1
                                  , r = this.getBrowserVersion();
                                if ("string" == typeof r)
                                    return ">" === t[0] || "<" === t[0] ? (n = t.substr(1),
                                    "=" === t[1] ? (i = !0,
                                    n = t.substr(2)) : e = [],
                                    ">" === t[0] ? e.push(1) : e.push(-1)) : "=" === t[0] ? n = t.substr(1) : "~" === t[0] && (i = !0,
                                    n = t.substr(1)),
                                    -1 < e.indexOf(a.default.compareVersions(r, n, i))
                            }
                        }, {
                            key: "isOS",
                            value: function(t) {
                                return this.getOSName(!0) === String(t).toLowerCase()
                            }
                        }, {
                            key: "isPlatform",
                            value: function(t) {
                                return this.getPlatformType(!0) === String(t).toLowerCase()
                            }
                        }, {
                            key: "isEngine",
                            value: function(t) {
                                return this.getEngineName(!0) === String(t).toLowerCase()
                            }
                        }, {
                            key: "is",
                            value: function(t) {
                                return this.isBrowser(t) || this.isOS(t) || this.isPlatform(t)
                            }
                        }, {
                            key: "some",
                            value: function() {
                                var t = this;
                                return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).some(function(e) {
                                    return t.is(e)
                                })
                            }
                        }]),
                        t
                    }();
                    n.default = u,
                    t.exports = e.default
                }
                ) ? i.apply(e, r) : i) || (t.exports = o)
            },
            88: function(t, e, n) {
                var i, r, o;
                r = [e, n(17)],
                void 0 === (o = "function" == typeof (i = function(n, i) {
                    var r;
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0,
                    i = (r = i) && r.__esModule ? r : {
                        default: r
                    };
                    var o = /version\/(\d+(\.?_?\d+)+)/i
                      , s = [{
                        test: [/googlebot/i],
                        describe: function(t) {
                            var e = {
                                name: "Googlebot"
                            }
                              , n = i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/opera/i],
                        describe: function(t) {
                            var e = {
                                name: "Opera"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/opr\/|opios/i],
                        describe: function(t) {
                            var e = {
                                name: "Opera"
                            }
                              , n = i.default.getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/SamsungBrowser/i],
                        describe: function(t) {
                            var e = {
                                name: "Samsung Internet for Android"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/Whale/i],
                        describe: function(t) {
                            var e = {
                                name: "NAVER Whale Browser"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/MZBrowser/i],
                        describe: function(t) {
                            var e = {
                                name: "MZ Browser"
                            }
                              , n = i.default.getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/focus/i],
                        describe: function(t) {
                            var e = {
                                name: "Focus"
                            }
                              , n = i.default.getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/swing/i],
                        describe: function(t) {
                            var e = {
                                name: "Swing"
                            }
                              , n = i.default.getFirstMatch(/(?:swing)[\s\/](\d+(?:\.\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/coast/i],
                        describe: function(t) {
                            var e = {
                                name: "Opera Coast"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/yabrowser/i],
                        describe: function(t) {
                            var e = {
                                name: "Yandex Browser"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/ucbrowser/i],
                        describe: function(t) {
                            var e = {
                                name: "UC Browser"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/Maxthon|mxios/i],
                        describe: function(t) {
                            var e = {
                                name: "Maxthon"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:Maxthon|mxios)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/epiphany/i],
                        describe: function(t) {
                            var e = {
                                name: "Epiphany"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/puffin/i],
                        describe: function(t) {
                            var e = {
                                name: "Puffin"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/sleipnir/i],
                        describe: function(t) {
                            var e = {
                                name: "Sleipnir"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/k-meleon/i],
                        describe: function(t) {
                            var e = {
                                name: "K-Meleon"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/micromessenger/i],
                        describe: function(t) {
                            var e = {
                                name: "WeChat"
                            }
                              , n = i.default.getFirstMatch(/(?:micromessenger)[\s\/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/msie|trident/i],
                        describe: function(t) {
                            var e = {
                                name: "Internet Explorer"
                            }
                              , n = i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/edg([ea]|ios)/i],
                        describe: function(t) {
                            var e = {
                                name: "Microsoft Edge"
                            }
                              , n = i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/vivaldi/i],
                        describe: function(t) {
                            var e = {
                                name: "Vivaldi"
                            }
                              , n = i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/seamonkey/i],
                        describe: function(t) {
                            var e = {
                                name: "SeaMonkey"
                            }
                              , n = i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/sailfish/i],
                        describe: function(t) {
                            var e = {
                                name: "Sailfish"
                            }
                              , n = i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/silk/i],
                        describe: function(t) {
                            var e = {
                                name: "Amazon Silk"
                            }
                              , n = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/phantom/i],
                        describe: function(t) {
                            var e = {
                                name: "PhantomJS"
                            }
                              , n = i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/slimerjs/i],
                        describe: function(t) {
                            var e = {
                                name: "SlimerJS"
                            }
                              , n = i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                        describe: function(t) {
                            var e = {
                                name: "BlackBerry"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/(web|hpw)[o0]s/i],
                        describe: function(t) {
                            var e = {
                                name: "WebOS Browser"
                            }
                              , n = i.default.getFirstMatch(o, t) || i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/bada/i],
                        describe: function(t) {
                            var e = {
                                name: "Bada"
                            }
                              , n = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/tizen/i],
                        describe: function(t) {
                            var e = {
                                name: "Tizen"
                            }
                              , n = i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/qupzilla/i],
                        describe: function(t) {
                            var e = {
                                name: "QupZilla"
                            }
                              , n = i.default.getFirstMatch(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/firefox|iceweasel|fxios/i],
                        describe: function(t) {
                            var e = {
                                name: "Firefox"
                            }
                              , n = i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s\/](\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/chromium/i],
                        describe: function(t) {
                            var e = {
                                name: "Chromium"
                            }
                              , n = i.default.getFirstMatch(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i, t) || i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/chrome|crios|crmo/i],
                        describe: function(t) {
                            var e = {
                                name: "Chrome"
                            }
                              , n = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: function(t) {
                            var e = !t.test(/like android/i)
                              , n = t.test(/android/i);
                            return e && n
                        },
                        describe: function(t) {
                            var e = {
                                name: "Android Browser"
                            }
                              , n = i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/playstation 4/i],
                        describe: function(t) {
                            var e = {
                                name: "PlayStation 4"
                            }
                              , n = i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/safari|applewebkit/i],
                        describe: function(t) {
                            var e = {
                                name: "Safari"
                            }
                              , n = i.default.getFirstMatch(o, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/.*/i],
                        describe: function(t) {
                            return {
                                name: i.default.getFirstMatch(/^(.*)\/(.*) /, t),
                                version: i.default.getSecondMatch(/^(.*)\/(.*) /, t)
                            }
                        }
                    }];
                    n.default = s,
                    t.exports = e.default
                }
                ) ? i.apply(e, r) : i) || (t.exports = o)
            },
            89: function(t, e, n) {
                var i, r, o;
                r = [e, n(17)],
                void 0 === (o = "function" == typeof (i = function(n, i) {
                    var r;
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0,
                    i = (r = i) && r.__esModule ? r : {
                        default: r
                    };
                    var o = [{
                        test: [/windows phone/i],
                        describe: function(t) {
                            return {
                                name: "Windows Phone",
                                version: i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, t)
                            }
                        }
                    }, {
                        test: [/windows/i],
                        describe: function(t) {
                            var e = i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, t);
                            return {
                                name: "Windows",
                                version: e,
                                versionName: i.default.getWindowsVersionName(e)
                            }
                        }
                    }, {
                        test: [/macintosh/i],
                        describe: function(t) {
                            return {
                                name: "macOS",
                                version: i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, t).replace(/[_\s]/g, ".")
                            }
                        }
                    }, {
                        test: [/(ipod|iphone|ipad)/i],
                        describe: function(t) {
                            return {
                                name: "iOS",
                                version: i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, t).replace(/[_\s]/g, ".")
                            }
                        }
                    }, {
                        test: function(t) {
                            var e = !t.test(/like android/i)
                              , n = t.test(/android/i);
                            return e && n
                        },
                        describe: function(t) {
                            var e = i.default.getFirstMatch(/android[\s\/-](\d+(\.\d+)*)/i, t)
                              , n = i.default.getAndroidVersionName(e)
                              , r = {
                                name: "Android",
                                version: e
                            };
                            return n && (r.versionName = n),
                            r
                        }
                    }, {
                        test: [/(web|hpw)[o0]s/i],
                        describe: function(t) {
                            var e = i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, t)
                              , n = {
                                name: "WebOS"
                            };
                            return e && e.length && (n.version = e),
                            n
                        }
                    }, {
                        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                        describe: function(t) {
                            return {
                                name: "BlackBerry",
                                version: i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, t) || i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, t) || i.default.getFirstMatch(/\bbb(\d+)/i, t)
                            }
                        }
                    }, {
                        test: [/bada/i],
                        describe: function(t) {
                            return {
                                name: "Bada",
                                version: i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, t)
                            }
                        }
                    }, {
                        test: [/tizen/i],
                        describe: function(t) {
                            return {
                                name: "Tizen",
                                version: i.default.getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i, t)
                            }
                        }
                    }, {
                        test: [/linux/i],
                        describe: function() {
                            return {
                                name: "Linux"
                            }
                        }
                    }, {
                        test: [/CrOS/],
                        describe: function() {
                            return {
                                name: "Chrome OS"
                            }
                        }
                    }, {
                        test: [/PlayStation 4/],
                        describe: function(t) {
                            return {
                                name: "PlayStation 4",
                                version: i.default.getFirstMatch(/PlayStation 4[\/\s](\d+(\.\d+)*)/i, t)
                            }
                        }
                    }];
                    n.default = o,
                    t.exports = e.default
                }
                ) ? i.apply(e, r) : i) || (t.exports = o)
            },
            90: function(t, e, n) {
                var i, r, o;
                r = [e, n(17)],
                void 0 === (o = "function" == typeof (i = function(n, i) {
                    var r;
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0,
                    i = (r = i) && r.__esModule ? r : {
                        default: r
                    };
                    var o = "tablet"
                      , s = "mobile"
                      , a = "desktop"
                      , l = "tv"
                      , c = [{
                        test: [/googlebot/i],
                        describe: function() {
                            return {
                                type: "bot",
                                vendor: "Google"
                            }
                        }
                    }, {
                        test: [/huawei/i],
                        describe: function(t) {
                            var e = i.default.getFirstMatch(/(can-l01)/i, t) && "Nova"
                              , n = {
                                type: s,
                                vendor: "Huawei"
                            };
                            return e && (n.model = e),
                            n
                        }
                    }, {
                        test: [/nexus\s*(?:7|8|9|10).*/i],
                        describe: function() {
                            return {
                                type: o,
                                vendor: "Nexus"
                            }
                        }
                    }, {
                        test: [/ipad/i],
                        describe: function() {
                            return {
                                type: o,
                                vendor: "Apple",
                                model: "iPad"
                            }
                        }
                    }, {
                        test: [/kftt build/i],
                        describe: function() {
                            return {
                                type: o,
                                vendor: "Amazon",
                                model: "Kindle Fire HD 7"
                            }
                        }
                    }, {
                        test: [/silk/i],
                        describe: function() {
                            return {
                                type: o,
                                vendor: "Amazon"
                            }
                        }
                    }, {
                        test: [/tablet/i],
                        describe: function() {
                            return {
                                type: o
                            }
                        }
                    }, {
                        test: function(t) {
                            var e = t.test(/ipod|iphone/i)
                              , n = t.test(/like (ipod|iphone)/i);
                            return e && !n
                        },
                        describe: function(t) {
                            var e = i.default.getFirstMatch(/(ipod|iphone)/i, t);
                            return {
                                type: s,
                                vendor: "Apple",
                                model: e
                            }
                        }
                    }, {
                        test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                        describe: function() {
                            return {
                                type: s,
                                vendor: "Nexus"
                            }
                        }
                    }, {
                        test: [/[^-]mobi/i],
                        describe: function() {
                            return {
                                type: s
                            }
                        }
                    }, {
                        test: function(t) {
                            return "blackberry" === t.getBrowserName(!0)
                        },
                        describe: function() {
                            return {
                                type: s,
                                vendor: "BlackBerry"
                            }
                        }
                    }, {
                        test: function(t) {
                            return "bada" === t.getBrowserName(!0)
                        },
                        describe: function() {
                            return {
                                type: s
                            }
                        }
                    }, {
                        test: function(t) {
                            return "windows phone" === t.getBrowserName()
                        },
                        describe: function() {
                            return {
                                type: s,
                                vendor: "Microsoft"
                            }
                        }
                    }, {
                        test: function(t) {
                            var e = Number(String(t.getOSVersion()).split(".")[0]);
                            return "android" === t.getOSName(!0) && 3 <= e
                        },
                        describe: function() {
                            return {
                                type: o
                            }
                        }
                    }, {
                        test: function(t) {
                            return "android" === t.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: s
                            }
                        }
                    }, {
                        test: function(t) {
                            return "macos" === t.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: a,
                                vendor: "Apple"
                            }
                        }
                    }, {
                        test: function(t) {
                            return "windows" === t.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: a
                            }
                        }
                    }, {
                        test: function(t) {
                            return "linux" === t.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: a
                            }
                        }
                    }, {
                        test: function(t) {
                            return "playstation 4" === t.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: l
                            }
                        }
                    }];
                    n.default = c,
                    t.exports = e.default
                }
                ) ? i.apply(e, r) : i) || (t.exports = o)
            },
            91: function(t, e, n) {
                var i, r, o;
                r = [e, n(17)],
                void 0 === (o = "function" == typeof (i = function(n, i) {
                    var r;
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }),
                    n.default = void 0,
                    i = (r = i) && r.__esModule ? r : {
                        default: r
                    };
                    var o = [{
                        test: function(t) {
                            return "microsoft edge" === t.getBrowserName(!0)
                        },
                        describe: function(t) {
                            return {
                                name: "EdgeHTML",
                                version: i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, t)
                            }
                        }
                    }, {
                        test: [/trident/i],
                        describe: function(t) {
                            var e = {
                                name: "Trident"
                            }
                              , n = i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: function(t) {
                            return t.test(/presto/i)
                        },
                        describe: function(t) {
                            var e = {
                                name: "Presto"
                            }
                              , n = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: function(t) {
                            var e = t.test(/gecko/i)
                              , n = t.test(/like gecko/i);
                            return e && !n
                        },
                        describe: function(t) {
                            var e = {
                                name: "Gecko"
                            }
                              , n = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }, {
                        test: [/(apple)?webkit\/537\.36/i],
                        describe: function() {
                            return {
                                name: "Blink"
                            }
                        }
                    }, {
                        test: [/(apple)?webkit/i],
                        describe: function(t) {
                            var e = {
                                name: "WebKit"
                            }
                              , n = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, t);
                            return n && (e.version = n),
                            e
                        }
                    }];
                    n.default = o,
                    t.exports = e.default
                }
                ) ? i.apply(e, r) : i) || (t.exports = o)
            }
        })
    })
      , Bowser = unwrapExports(es5)
      , es5_1 = es5.bowser;
    function globals(t) {
        svg4everybody();
        for (var e = $("img[data-src]"), n = 0; n < e.length; n++)
            e[n].src = e[n].getAttribute("data-src");
        var i = $(".js-lazy-background");
        for (n = 0; n < i.length; n++)
            i[n].style = i[n].getAttribute("data-style");
        var r = Bowser.getParser(window.navigator.userAgent)
          , o = "mobile" === r.parsedResult.platform.type || "tablet" === r.parsedResult.platform.type || !1;
          window.isTouch = (('ontouchstart' in window)
          || (navigator.MaxTouchPoints > 0)
          || (navigator.msMaxTouchPoints > 0));
        (window.isMobile = o) && $html.addClass("is-mobile"),
        "iPad" === r.parsedResult.platform.model && $html.addClass("is-iPad"),
        "iPhone" === r.parsedResult.platform.model && $html.addClass("is-iPhone");
        var s = "Microsoft Edge" === r.parsedResult.browser.name;
        (window.isEdge = s) && $html.addClass("is-edge");
        var a = "Firefox" === r.parsedResult.browser.name;
        (window.isFirefox = a) && $html.addClass("is-firefox"),
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && $html.addClass("is-ios");
        var l = "Internet Explorer" === r.parsedResult.browser.name;
        (window.isIE = l) && $html.addClass("is-ie");
        var c = "Windows" === r.parsedResult.os.name;
        (window.isWindows = c) && $html.addClass("is-windows"),
        window.sessionIntro = sessionStorage.getItem("intro"),
        "disable" != window.sessionIntro && sessionStorage.setItem("intro", "disable"),
        t && new _default$2
    }
    _descriptors && "g" != /./g.flags && _objectDp.f(RegExp.prototype, "flags", {
        configurable: !0,
        get: _flags
    });
    var TO_STRING = "toString"
      , $toString = /./[TO_STRING]
      , define = function(t) {
        _redefine(RegExp.prototype, TO_STRING, t, !0)
    };
    function isNumeric(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }
    function arrayContains(t, e) {
        for (var n = 0, i = t.length; n < i; n++)
            if (t[n] == e)
                return !0;
        return !1
    }
    function removeFromArray(t, e) {
        if (t) {
            var n = t.indexOf(e);
            -1 !== n && t.splice(n, 1)
        }
    }
    _fails(function() {
        return "/a/b" != $toString.call({
            source: "a",
            flags: "b"
        })
    }) ? define(function() {
        var t = _anObject(this);
        return "/".concat(t.source, "/", "flags"in t ? t.flags : !_descriptors && t instanceof RegExp ? _flags.call(t) : void 0)
    }) : $toString.name != TO_STRING && define(function() {
        return $toString.call(this)
    }),
    _fixReWks("match", 1, function(t, e, n, i) {
        return [function(n) {
            var i = t(this)
              , r = null == n ? void 0 : n[e];
            return void 0 !== r ? r.call(n, i) : new RegExp(n)[e](String(i))
        }
        , function(t) {
            var e = i(n, t, this);
            if (e.done)
                return e.value;
            var r = _anObject(t)
              , o = String(this);
            if (!r.global)
                return _regexpExecAbstract(r, o);
            for (var s, a = r.unicode, l = [], c = r.lastIndex = 0; null !== (s = _regexpExecAbstract(r, o)); ) {
                var u = String(s[0]);
                "" === (l[c] = u) && (r.lastIndex = _advanceStringIndex(o, _toLength(r.lastIndex), a)),
                c++
            }
            return 0 === c ? null : l
        }
        ]
    });
    var max = Math.max
      , min$1 = Math.min
      , floor$1 = Math.floor
      , SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g
      , SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g
      , maybeToString = function(t) {
        return void 0 === t ? t : String(t)
    };
    function getNodeData(t) {
        var e = t.attributes
          , n = /^data\-(.+)$/
          , i = {};
        for (var r in e)
            if (e[r]) {
                var o = e[r].name;
                if (o) {
                    var s = o.match(n);
                    s && (i[s[1]] = getData(t.getAttribute(o)))
                }
            }
        return i
    }
    _fixReWks("replace", 2, function(t, e, n, i) {
        return [function(i, r) {
            var o = t(this)
              , s = null == i ? void 0 : i[e];
            return void 0 !== s ? s.call(i, o, r) : n.call(String(o), i, r)
        }
        , function(t, e) {
            var o = i(n, t, this, e);
            if (o.done)
                return o.value;
            var s = _anObject(t)
              , a = String(this)
              , l = "function" == typeof e;
            l || (e = String(e));
            var c = s.global;
            if (c) {
                var u = s.unicode;
                s.lastIndex = 0
            }
            for (var d = []; ; ) {
                var h = _regexpExecAbstract(s, a);
                if (null === h)
                    break;
                if (d.push(h),
                !c)
                    break;
                "" === String(h[0]) && (s.lastIndex = _advanceStringIndex(a, _toLength(s.lastIndex), u))
            }
            for (var f = "", p = 0, m = 0; m < d.length; m++) {
                h = d[m];
                for (var E = String(h[0]), g = max(min$1(_toInteger(h.index), a.length), 0), v = [], y = 1; y < h.length; y++)
                    v.push(maybeToString(h[y]));
                var _ = h.groups;
                if (l) {
                    var w = [E].concat(v, g, a);
                    void 0 !== _ && w.push(_);
                    var $ = String(e.apply(void 0, w))
                } else
                    $ = r(E, a, g, v, _, e);
                p <= g && (f += a.slice(p, g) + $,
                p = g + E.length)
            }
            return f + a.slice(p)
        }
        ];
        function r(t, e, i, r, o, s) {
            var a = i + t.length
              , l = r.length
              , c = SUBSTITUTION_SYMBOLS_NO_NAMED;
            return void 0 !== o && (o = _toObject(o),
            c = SUBSTITUTION_SYMBOLS),
            n.call(s, c, function(n, s) {
                var c;
                switch (s.charAt(0)) {
                case "$":
                    return "$";
                case "&":
                    return t;
                case "`":
                    return e.slice(0, i);
                case "'":
                    return e.slice(a);
                case "<":
                    c = o[s.slice(1, -1)];
                    break;
                default:
                    var u = +s;
                    if (0 === u)
                        return n;
                    if (l < u) {
                        var d = floor$1(u / 10);
                        return 0 === d ? n : d <= l ? void 0 === r[d - 1] ? s.charAt(1) : r[d - 1] + s.charAt(1) : n
                    }
                    c = r[u - 1]
                }
                return void 0 === c ? "" : c
            })
        }
    });
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
    function getData(t) {
        return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : rbrace.test(t) ? JSON.parse(t) : t)
    }
    var uid = 0
      , _default$3 = function() {
        function t(e) {
            _classCallCheck(this, t),
            this.$el = e.$el || null,
            this.el = e.el || null,
            this.uid = "m-" + uid++,
            this.$el.data("uid", this.uid)
        }
        return _createClass(t, [{
            key: "init",
            value: function() {}
        }, {
            key: "destroy",
            value: function() {
                this.$el && this.$el.removeData("uid")
            }
        }]),
        t
    }()
      , _stringRepeat = function(t) {
        var e = String(_defined(this))
          , n = ""
          , i = _toInteger(t);
        if (i < 0 || i == 1 / 0)
            throw RangeError("Count can't be negative");
        for (; 0 < i; (i >>>= 1) && (e += e))
            1 & i && (n += e);
        return n
    };
    _export(_export.P, "String", {
        repeat: _stringRepeat
    });
    var _toIobject = function(t) {
        return _iobject(_defined(t))
    }
      , max$1 = Math.max
      , min$2 = Math.min
      , _toAbsoluteIndex = function(t, e) {
        return (t = _toInteger(t)) < 0 ? max$1(t + e, 0) : min$2(t, e)
    }
      , _arrayIncludes = function(t) {
        return function(e, n, i) {
            var r, o = _toIobject(e), s = _toLength(o.length), a = _toAbsoluteIndex(i, s);
            if (t && n != n) {
                for (; a < s; )
                    if ((r = o[a++]) != r)
                        return !0
            } else
                for (; a < s; a++)
                    if ((t || a in o) && o[a] === n)
                        return t || a || 0;
            return !t && -1
        }
    }
      , shared = _shared("keys")
      , _sharedKey = function(t) {
        return shared[t] || (shared[t] = _uid(t))
    }
      , arrayIndexOf = _arrayIncludes(!1)
      , IE_PROTO = _sharedKey("IE_PROTO")
      , _objectKeysInternal = function(t, e) {
        var n, i = _toIobject(t), r = 0, o = [];
        for (n in i)
            n != IE_PROTO && _has(i, n) && o.push(n);
        for (; e.length > r; )
            _has(i, n = e[r++]) && (~arrayIndexOf(o, n) || o.push(n));
        return o
    }
      , _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
      , _objectKeys = Object.keys || function(t) {
        return _objectKeysInternal(t, _enumBugKeys)
    }
      , f$1 = Object.getOwnPropertySymbols
      , _objectGops = {
        f: f$1
    }
      , f$2 = {}.propertyIsEnumerable
      , _objectPie = {
        f: f$2
    }
      , $assign = Object.assign
      , _objectAssign = !$assign || _fails(function() {
        var t = {}
          , e = {}
          , n = Symbol()
          , i = "abcdefghijklmnopqrst";
        return t[n] = 7,
        i.split("").forEach(function(t) {
            e[t] = t
        }),
        7 != $assign({}, t)[n] || Object.keys($assign({}, e)).join("") != i
    }) ? function(t, e) {
        for (var n = _toObject(t), i = arguments.length, r = 1, o = _objectGops.f, s = _objectPie.f; r < i; )
            for (var a, l = _iobject(arguments[r++]), c = o ? _objectKeys(l).concat(o(l)) : _objectKeys(l), u = c.length, d = 0; d < u; )
                s.call(l, a = c[d++]) && (n[a] = l[a]);
        return n
    }
    : $assign;
    function debounce(t, e, n) {
        var i;
        return function() {
            var r = this
              , o = arguments
              , s = n && !i;
            clearTimeout(i),
            i = setTimeout(function() {
                i = null,
                n || t.apply(r, o)
            }, e),
            s && t.apply(r, o)
        }
    }
    _export(_export.S + _export.F, "Object", {
        assign: _objectAssign
    });
    var EVENT_KEY = "LocomotiveScroll"
      , EVENT$1 = {
        CLICK: "click.".concat(EVENT_KEY),
        ISREADY: "isReady.".concat(EVENT_KEY),
        REBUILD: "rebuild.".concat(EVENT_KEY),
        RENDER: "render.".concat(EVENT_KEY),
        RESIZE: "resize.".concat(EVENT_KEY),
        SCROLL: "scroll.".concat(EVENT_KEY),
        SCROLLTO: "scrollTo.".concat(EVENT_KEY),
        UPDATE: "update.".concat(EVENT_KEY),
        STOP: "stop.".concat(EVENT_KEY),
        START: "start.".concat(EVENT_KEY)
    }
      , DEFAULTS = {
        container: $document,
        mobileContainer: $document,
        onScroll: function() {},
        selector: ".js-animate",
        smooth: !1,
        smoothMobile: !1,
        reversed: !1,
        getDirection: !1,
        getSpeed: !1,
        scrollBarClassName: "o-scrollbar",
        isScrollingClassName: "is-scrolling"
    }
      , _default$4 = function() {
        function t(e) {
            _classCallCheck(this, t),
            this.$container = e.container ? e.container : DEFAULTS.container,
            this.selector = e.selector ? e.selector : DEFAULTS.selector,
            this.callbacks = {
                onScroll: "function" == typeof e.onScroll ? e.onScroll : DEFAULTS.onScroll
            },
            this.instance = {
                scroll: {
                    x: 0,
                    y: 0,
                    direction: ""
                }
            },
            this.windowHeight = $window.height(),
            this.windowMiddle = this.windowHeight / 2,
            this.animatedElements = [],
            this.requestId = void 0
        }
        return _createClass(t, [{
            key: "init",
            value: function() {
                var t = this;
                this.addElements(),
                this.render(),
                this.$container.on(EVENT$1.SCROLL, function() {
                    t.render()
                }),
                this.$container.on(EVENT$1.REBUILD, function() {
                    t.scrollTo({
                        targetOffset: 0
                    }),
                    t.update()
                }),
                this.$container.on(EVENT$1.UPDATE, function(e, n) {
                    return t.update(n)
                }),
                this.$container.on(EVENT$1.RENDER, function() {
                    return t.render()
                }),
                this.$container.on(EVENT$1.CLICK, ".js-scrollto", function(e) {
                    e.preventDefault();
                    var n = $(e.currentTarget)
                      , i = n.data("offset");
                    t.scrollTo({
                        sourceElem: n,
                        offsetElem: i
                    })
                }),
                this.$container.on(EVENT$1.SCROLLTO, function(e) {
                    return t.scrollTo(e.options)
                }),
                $document.triggerHandler({
                    type: EVENT$1.ISREADY
                }),
                $window.on(EVENT$1.RESIZE, debounce(function() {
                    t.update()
                }, 20))
            }
        }, {
            key: "addElements",
            value: function() {
                // console.log(11);
                this.animatedElements = [];
                for (var t = $(this.selector), e = t.length, n = 0; n < e; n++) {
                    var i = t.eq(n)
                      , r = i.attr("data-target")
                      , o = i.attr("data-position")
                      , s = r && $(r).length ? $(r) : i
                      , a = s.offset().top
                      , l = a + s.outerHeight()
                      , c = "string" == typeof i.attr("data-sticky")
                      , u = i.attr("data-sticky-target")
                      , d = null;
                    "string" == typeof i.attr("data-viewport-offset") && (d = i.attr("data-viewport-offset").split(","));
                    var h = "string" == typeof i.attr("data-callback") ? i.attr("data-callback") : null
                      , f = null;
                    if (null != h) {
                        for (var p = h.substr(0, h.indexOf("(")), m = h.substr(h.indexOf("("), h.length - p.length), E = (m = (m = m.replace("(", "")).replace(")", "")).split("|"), g = {}, v = 0; v < E.length; v++) {
                            var y = E[v].split(":");
                            y[0] = y[0].replace(" ", "");
                            var _;
                            _ = "true" === y[1] || "false" !== y[1] && (/^\d+$/.test(y[1]) ? parseInt(y[1]) : y[1]),
                            g[y[0]] = _
                        }
                        f = {
                            event: p,
                            options: g
                        }
                    }
                    var w = "string" == typeof i.attr("data-repeat")
                      , b = i.attr("data-inview-class");
                    void 0 === b && (b = "is-show"),
                    c && (l = void 0 === u ? this.$container.height() : $(u).offset().top - i.height(),
                    i.removeClass(b),
                    i.removeClass("is-unstuck"),
                    i.css({
                        "-webkit-transform": "translate3d(0, 0, 0)",
                        "-ms-transform": "translate3d(0, 0, 0)",
                        transform: "translate3d(0, 0, 0)"
                    })),
                    !w && i.hasClass(b) || (this.animatedElements[n] = {
                        $element: i,
                        offset: Math.round(a),
                        repeat: w,
                        position: o,
                        limit: l,
                        inViewClass: b,
                        sticky: c,
                        callback: f,
                        viewportOffset: d
                    })
                }
            }
        }, {
            key: "animateElements",
            value: function() {
                for (var t = this.animatedElements.length, e = [], n = 0; n < t; n++) {
                    var i = this.animatedElements[n];
                    this.toggleElement(i, n) && e.push(n)
                }
                for (n = e.length; n--; )
                    this.animatedElements.splice(e[n], 1)
            }
        }, {
            key: "render",
            value: function() {
                this.instance.scroll.y !== window.pageYOffset && (this.instance.scroll.y = window.pageYOffset),
                this.instance.scroll.x !== window.pageXOffset && (this.instance.scroll.x = window.pageXOffset),
                this.callbacks.onScroll(this.scroll),
                this.animateElements()
            }
        }, {
            key: "toggleElement",
            value: function(t, e) {
                var n = !1;
                if (void 0 !== t) {
                    var i = this.instance.scroll.y
                      , r = i + this.windowHeight
                      , o = !1;
                    if ("top" === t.position)
                        o = i >= t.offset && i <= t.limit;
                    else if ("below" === t.position)
                        o = i > t.limit;
                    else if (t.sticky)
                        o = i >= t.offset && i <= t.limit;
                    else if (null != t.viewportOffset)
                        if (1 < t.viewportOffset.length) {
                            var s = i + this.windowHeight * t.viewportOffset[1];
                            o = r - this.windowHeight * t.viewportOffset[0] > t.offset && s < t.limit
                        } else {
                            var a = r - this.windowHeight * t.viewportOffset[0];
                            o = a > t.offset && a < t.limit
                        }
                    else
                        o = r >= t.offset && i <= t.limit;
                    if (t.sticky && (i > t.limit ? t.$element.addClass("is-unstuck") : t.$element.removeClass("is-unstuck"),
                    i < t.offset && t.$element.removeClass(t.inViewClass)),
                    o) {
                        if (t.$element.hasClass(t.inViewClass) || (t.$element.addClass(t.inViewClass),
                        this.triggerCallback(t, "enter")),
                        t.repeat || t.sticky || (n = !0),
                        t.sticky) {
                            var l = this.instance.scroll.y - t.offset;
                            t.$element.css({
                                "-webkit-transform": "translate3d(0, ".concat(l, "px, 0)"),
                                "-ms-transform": "translate3d(0, ".concat(l, "px, 0)"),
                                transform: "translate3d(0, ".concat(l, "px, 0)")
                            })
                        }
                    } else
                        t.repeat && t.$element.hasClass(t.inViewClass) && (t.$element.removeClass(t.inViewClass),
                        this.triggerCallback(t, "leave"))
                }
                return n
            }
        }, {
            key: "triggerCallback",
            value: function(t, e) {
                null != t.callback && t.$element.trigger({
                    type: t.callback.event,
                    options: t.callback.options,
                    way: e
                })
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                var e = t.targetElem
                  , n = t.sourceElem
                  , i = t.offsetElem
                  , r = isNumeric(t.targetOffset) ? parseInt(t.targetOffset) : 0
                  , o = isNumeric(t.speed) ? parseInt(t.speed) : 800
                  , s = isNumeric(t.delay) ? parseInt(t.delay) : 0
                  , a = t.toTop
                  , l = t.toBottom
                  , c = 0;
                if (void 0 === e && void 0 === n && void 0 === r)
                    return console.warn("You must specify at least one parameter."),
                    !1;
                if (void 0 !== e && e instanceof jQuery && 0 < e.length && (r = e.offset().top + r),
                void 0 !== n && n instanceof jQuery && 0 < n.length) {
                    var u;
                    u = n.attr("data-target") ? n.attr("data-target") : n.attr("href"),
                    r = $(u).offset().top + r
                }
                void 0 !== i && (c = $(i).outerHeight(),
                r -= c),
                !0 === a ? r = 0 : !0 === l && (r = $document.height()),
                setTimeout(function() {
                    $("html, body").animate({
                        scrollTop: r
                    }, o)
                }, s)
            }
        }, {
            key: "update",
            value: function() {
                this.addElements(),
                this.animateElements(),
                this.windowHeight = $window.height(),
                this.windowMiddle = this.windowHeight / 2
            }
        }, {
            key: "destroy",
            value: function() {
                $window.off(".".concat(EVENT_KEY)),
                this.$container.off(".".concat(EVENT_KEY)),
                window.cancelAnimationFrame(this.requestId),
                this.requestId = void 0,
                this.animatedElements = void 0
            }
        }]),
        t
    }()
      , EVENT$2 = Object.assign(EVENT$1, {})
      , DEFAULTS$1 = Object.assign(DEFAULTS, {})
      , _default$5 = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).$container = t.container ? t.container : DEFAULTS$1.container,
            n.selector = t.selector ? t.selector : DEFAULTS$1.selector,
            n.isReversed = !1,
            n.callbacks = {
                onScroll: "function" == typeof t.onScroll ? t.onScroll : DEFAULTS$1.onScroll
            },
            n.instance = {},
            n.instance.scroll = {
                x: 0,
                y: 0,
                direction: ""
            },
            n.windowHeight = $window.height(),
            n.windowWidth = $window.height(),
            n.windowMiddleY = n.windowHeight / 2,
            n.windowMiddleX = n.windowWidth / 2,
            n.animatedElements = [],
            n.requestId = void 0,
            n
        }
        return _inherits(e, _default$4),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.addElements(),
                this.render(),
                this.$container.on(EVENT$2.SCROLL, function() {
                    t.render()
                }),
                this.$container.on(EVENT$2.REBUILD, function() {
                    t.scrollTo({
                        targetOffset: 0
                    }),
                    t.update()
                }),
                this.$container.on(EVENT$2.UPDATE, function(e, n) {
                    return t.update(n)
                }),
                this.$container.on(EVENT$2.RENDER, function() {
                    return t.render()
                }),
                this.$container.on(EVENT$2.CLICK, ".js-scrollto", function(e) {
                    e.preventDefault();
                    var n = $(e.currentTarget)
                      , i = n.attr("data-offset-element")
                      , r = parseInt(n.attr("data-offset"));
                    $(".js-header").removeClass("is-open"),
                    t.scrollTo({
                        sourceElem: n,
                        offsetElem: i,
                        offset: r
                    })
                }),
                this.$container.on(EVENT$2.SCROLLTO, function(e) {
                    return t.scrollTo(e.options)
                }),
                $document.triggerHandler({
                    type: EVENT$2.ISREADY
                }),
                $window.on(EVENT$2.RESIZE, debounce(function() {
                    t.update()
                }, 20))
            }
        }, {
            key: "render",
            value: function() {
                this.instance.scroll.y !== window.pageYOffset && (this.instance.scroll.y = window.pageYOffset),
                this.instance.scroll.x !== window.pageXOffset && (this.instance.scroll.x = window.pageXOffset),
                window.scroll = this.instance.scroll,
                this.callbacks.onScroll(this.instance),
                this.animateElements()
            }
        }, {
            key: "toggleElement",
            value: function(t, e) {
                var n = !1;
                if (void 0 !== t) {
                    var i = this.instance.scroll.y
                      , r = this.instance.scroll.x
                      , o = i + this.windowHeight
                      , s = r + this.windowWidth
                      , a = !1;
                    if (this.isReversed)
                        a = "top" === t.position ? r >= t.offsetX && r <= t.limitX : "below" === t.position ? r > t.limitX : t.sticky ? r >= t.offsetX && r <= t.limitX : s > t.offsetX && r < t.limitX;
                    else if ("top" === t.position)
                        a = i >= t.offset && i <= t.limit;
                    else if ("below" === t.position)
                        a = i > t.limit;
                    else if (t.sticky)
                        a = i >= t.offset && i <= t.limit;
                    else if (null != t.viewportOffset)
                        if (1 < t.viewportOffset.length) {
                            var l = i + this.windowHeight * t.viewportOffset[1];
                            a = o - this.windowHeight * t.viewportOffset[0] > t.offset && l < t.limit
                        } else {
                            var c = o - this.windowHeight * t.viewportOffset[0];
                            a = c > t.offset && c < t.limit
                        }
                    else
                        a = o >= t.offset && i <= t.limit;
                    if (t.sticky && (i > t.limitY ? t.$element.addClass("-after") : t.$element.removeClass("-after"),
                    i < t.offsetY && t.$element.removeClass(t.inViewClass)),
                    a) {
                        if (t.$element.hasClass(t.inViewClass) || (t.$element.addClass(t.inViewClass),
                        this.triggerCallback(t, "enter")),
                        t.repeat || t.sticky || (n = !0),
                        t.sticky) {
                            var u = this.scroll.y - t.offsetY;
                            t.$element.css({
                                "-webkit-transform": "translate3d(0, ".concat(u, "px, 0)"),
                                "-ms-transform": "translate3d(0, ".concat(u, "px, 0)"),
                                transform: "translate3d(0, ".concat(u, "px, 0)")
                            })
                        }
                    } else
                        t.repeat && t.$element.hasClass(t.inViewClass) && (t.$element.removeClass(t.inViewClass),
                        this.triggerCallback(t, "leave"))
                }
                return n
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                var e = t.targetElem
                  , n = t.sourceElem
                  , i = t.offsetElem
                  , r = isNumeric(t.targetOffset) ? parseInt(t.targetOffset) : 0
                  , o = isNumeric(t.speed) ? parseInt(t.speed) : 800
                  , s = isNumeric(t.delay) ? parseInt(t.delay) : 0
                  , a = t.toTop
                  , l = t.toBottom
                  , c = 0
                  , u = t.offset;
                if (void 0 === e && void 0 === n && void 0 === r)
                    return console.warn("You must specify at least one parameter."),
                    !1;
                if (void 0 !== e && e instanceof jQuery && 0 < e.length && (r = e.offset().top + r),
                void 0 !== n && n instanceof jQuery && 0 < n.length) {
                    var d;
                    d = n.attr("data-target") ? n.attr("data-target") : n.attr("href"),
                    r = $(d).offset().top + r
                }
                void 0 !== i && (c = $(i).outerHeight(),
                r -= c),
                void 0 !== u && (r -= u),
                !0 === a ? r = 0 : !0 === l && (r = $document.height()),
                setTimeout(function() {
                    $("html, body").animate({
                        scrollTop: r
                    }, o)
                }, s)
            }
        }]),
        e
    }()
      , _iterStep = function(t, e) {
        return {
            value: e,
            done: !!t
        }
    }
      , _iterators = {}
      , _objectDps = _descriptors ? Object.defineProperties : function(t, e) {
        _anObject(t);
        for (var n, i = _objectKeys(e), r = i.length, o = 0; o < r; )
            _objectDp.f(t, n = i[o++], e[n]);
        return t
    }
      , document$2 = _global.document
      , _html = document$2 && document$2.documentElement
      , IE_PROTO$1 = _sharedKey("IE_PROTO")
      , Empty = function() {}
      , PROTOTYPE$1 = "prototype"
      , createDict = function() {
        var t, e = _domCreate("iframe"), n = _enumBugKeys.length;
        for (e.style.display = "none",
        _html.appendChild(e),
        e.src = "javascript:",
        (t = e.contentWindow.document).open(),
        t.write("<script>document.F=Object<\/script>"),
        t.close(),
        createDict = t.F; n--; )
            delete createDict[PROTOTYPE$1][_enumBugKeys[n]];
        return createDict()
    }
      , _objectCreate = Object.create || function(t, e) {
        var n;
        return null !== t ? (Empty[PROTOTYPE$1] = _anObject(t),
        n = new Empty,
        Empty[PROTOTYPE$1] = null,
        n[IE_PROTO$1] = t) : n = createDict(),
        void 0 === e ? n : _objectDps(n, e)
    }
      , def = _objectDp.f
      , TAG$1 = _wks("toStringTag")
      , _setToStringTag = function(t, e, n) {
        t && !_has(t = n ? t : t.prototype, TAG$1) && def(t, TAG$1, {
            configurable: !0,
            value: e
        })
    }
      , IteratorPrototype = {};
    _hide(IteratorPrototype, _wks("iterator"), function() {
        return this
    });
    var _iterCreate = function(t, e, n) {
        t.prototype = _objectCreate(IteratorPrototype, {
            next: _propertyDesc(1, n)
        }),
        _setToStringTag(t, e + " Iterator")
    }
      , IE_PROTO$2 = _sharedKey("IE_PROTO")
      , ObjectProto = Object.prototype
      , _objectGpo = Object.getPrototypeOf || function(t) {
        return t = _toObject(t),
        _has(t, IE_PROTO$2) ? t[IE_PROTO$2] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? ObjectProto : null
    }
      , ITERATOR = _wks("iterator")
      , BUGGY = !([].keys && "next"in [].keys())
      , FF_ITERATOR = "@@iterator"
      , KEYS = "keys"
      , VALUES = "values"
      , returnThis = function() {
        return this
    }
      , _iterDefine = function(t, e, n, i, r, o, s) {
        _iterCreate(n, e, i);
        var a, l, c, u = function(t) {
            if (!BUGGY && t in p)
                return p[t];
            switch (t) {
            case KEYS:
            case VALUES:
                return function() {
                    return new n(this,t)
                }
            }
            return function() {
                return new n(this,t)
            }
        }, d = e + " Iterator", h = r == VALUES, f = !1, p = t.prototype, m = p[ITERATOR] || p[FF_ITERATOR] || r && p[r], E = m || u(r), g = r ? h ? u("entries") : E : void 0, v = "Array" == e && p.entries || m;
        if (v && (c = _objectGpo(v.call(new t))) !== Object.prototype && c.next && (_setToStringTag(c, d, !0),
        "function" != typeof c[ITERATOR] && _hide(c, ITERATOR, returnThis)),
        h && m && m.name !== VALUES && (f = !0,
        E = function() {
            return m.call(this)
        }
        ),
        (BUGGY || f || !p[ITERATOR]) && _hide(p, ITERATOR, E),
        _iterators[e] = E,
        _iterators[d] = returnThis,
        r)
            if (a = {
                values: h ? E : u(VALUES),
                keys: o ? E : u(KEYS),
                entries: g
            },
            s)
                for (l in a)
                    l in p || _redefine(p, l, a[l]);
            else
                _export(_export.P + _export.F * (BUGGY || f), e, a);
        return a
    }
      , es6_array_iterator = _iterDefine(Array, "Array", function(t, e) {
        this._t = _toIobject(t),
        this._i = 0,
        this._k = e
    }, function() {
        var t = this._t
          , e = this._k
          , n = this._i++;
        return !t || n >= t.length ? (this._t = void 0,
        _iterStep(1)) : _iterStep(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]])
    }, "values");
    _iterators.Arguments = _iterators.Array,
    _addToUnscopables("keys"),
    _addToUnscopables("values"),
    _addToUnscopables("entries");
    for (var ITERATOR$1 = _wks("iterator"), TO_STRING_TAG = _wks("toStringTag"), ArrayValues = _iterators.Array, DOMIterables = {
        CSSRuleList: !0,
        CSSStyleDeclaration: !1,
        CSSValueList: !1,
        ClientRectList: !1,
        DOMRectList: !1,
        DOMStringList: !1,
        DOMTokenList: !0,
        DataTransferItemList: !1,
        FileList: !1,
        HTMLAllCollection: !1,
        HTMLCollection: !1,
        HTMLFormElement: !1,
        HTMLSelectElement: !1,
        MediaList: !0,
        MimeTypeArray: !1,
        NamedNodeMap: !1,
        NodeList: !0,
        PaintRequestList: !1,
        Plugin: !1,
        PluginArray: !1,
        SVGLengthList: !1,
        SVGNumberList: !1,
        SVGPathSegList: !1,
        SVGPointList: !1,
        SVGStringList: !1,
        SVGTransformList: !1,
        SourceBufferList: !1,
        StyleSheetList: !0,
        TextTrackCueList: !1,
        TextTrackList: !1,
        TouchList: !1
    }, collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
        var NAME$1 = collections[i], explicit = DOMIterables[NAME$1], Collection = _global[NAME$1], proto = Collection && Collection.prototype, key;
        if (proto && (proto[ITERATOR$1] || _hide(proto, ITERATOR$1, ArrayValues),
        proto[TO_STRING_TAG] || _hide(proto, TO_STRING_TAG, NAME$1),
        _iterators[NAME$1] = ArrayValues,
        explicit))
            for (key in es6_array_iterator)
                proto[key] || _redefine(proto, key, es6_array_iterator[key], !0)
    }
    var $at = _stringAt(!0);
    _iterDefine(String, "String", function(t) {
        this._t = String(t),
        this._i = 0
    }, function() {
        var t, e = this._t, n = this._i;
        return n >= e.length ? {
            value: void 0,
            done: !0
        } : (t = $at(e, n),
        this._i += t.length,
        {
            value: t,
            done: !1
        })
    });
    var _iterCall = function(t, e, n, i) {
        try {
            return i ? e(_anObject(n)[0], n[1]) : e(n)
        } catch (e) {
            var r = t.return;
            throw void 0 !== r && _anObject(r.call(t)),
            e
        }
    }
      , ITERATOR$2 = _wks("iterator")
      , ArrayProto$1 = Array.prototype
      , _isArrayIter = function(t) {
        return void 0 !== t && (_iterators.Array === t || ArrayProto$1[ITERATOR$2] === t)
    }
      , _createProperty = function(t, e, n) {
        e in t ? _objectDp.f(t, e, _propertyDesc(0, n)) : t[e] = n
    }
      , ITERATOR$3 = _wks("iterator")
      , core_getIteratorMethod = _core.getIteratorMethod = function(t) {
        if (null != t)
            return t[ITERATOR$3] || t["@@iterator"] || _iterators[_classof(t)]
    }
      , ITERATOR$4 = _wks("iterator")
      , SAFE_CLOSING = !1;
    try {
        var riter = [7][ITERATOR$4]();
        riter.return = function() {
            SAFE_CLOSING = !0
        }
    } catch (t) {}
    var _iterDetect = function(t, e) {
        if (!e && !SAFE_CLOSING)
            return !1;
        var n = !1;
        try {
            var i = [7]
              , r = i[ITERATOR$4]();
            r.next = function() {
                return {
                    done: n = !0
                }
            }
            ,
            i[ITERATOR$4] = function() {
                return r
            }
            ,
            t(i)
        } catch (t) {}
        return n
    };
    _export(_export.S + _export.F * !_iterDetect(function(t) {}), "Array", {
        from: function(t) {
            var e, n, i, r, o = _toObject(t), s = "function" == typeof this ? this : Array, a = arguments.length, l = 1 < a ? arguments[1] : void 0, c = void 0 !== l, u = 0, d = core_getIteratorMethod(o);
            if (c && (l = _ctx(l, 2 < a ? arguments[2] : void 0, 2)),
            null == d || s == Array && _isArrayIter(d))
                for (n = new s(e = _toLength(o.length)); u < e; u++)
                    _createProperty(n, u, c ? l(o[u], u) : o[u]);
            else
                for (r = d.call(o),
                n = new s; !(i = r.next()).done; u++)
                    _createProperty(n, u, c ? _iterCall(r, l, [i.value, u], !0) : i.value);
            return n.length = u,
            n
        }
    });
    var getOwnPropertySymbols = Object.getOwnPropertySymbols
      , hasOwnProperty$1 = Object.prototype.hasOwnProperty
      , propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(t) {
        if (null == t)
            throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t)
    }
    function shouldUseNative() {
        try {
            if (!Object.assign)
                return !1;
            var t = new String("abc");
            if (t[5] = "de",
            "5" === Object.getOwnPropertyNames(t)[0])
                return !1;
            for (var e = {}, n = 0; n < 10; n++)
                e["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                return e[t]
            }).join(""))
                return !1;
            var i = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                i[t] = t
            }),
            "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
        } catch (t) {
            return !1
        }
    }
    var objectAssign = shouldUseNative() ? Object.assign : function(t, e) {
        for (var n, i, r = toObject(t), o = 1; o < arguments.length; o++) {
            for (var s in n = Object(arguments[o]))
                hasOwnProperty$1.call(n, s) && (r[s] = n[s]);
            if (getOwnPropertySymbols) {
                i = getOwnPropertySymbols(n);
                for (var a = 0; a < i.length; a++)
                    propIsEnumerable.call(n, i[a]) && (r[i[a]] = n[i[a]])
            }
        }
        return r
    }
    ;
    function E() {}
    E.prototype = {
        on: function(t, e, n) {
            var i = this.e || (this.e = {});
            return (i[t] || (i[t] = [])).push({
                fn: e,
                ctx: n
            }),
            this
        },
        once: function(t, e, n) {
            var i = this;
            function r() {
                i.off(t, r),
                e.apply(n, arguments)
            }
            return r._ = e,
            this.on(t, r, n)
        },
        emit: function(t) {
            for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, r = n.length; i < r; i++)
                n[i].fn.apply(n[i].ctx, e);
            return this
        },
        off: function(t, e) {
            var n = this.e || (this.e = {})
              , i = n[t]
              , r = [];
            if (i && e)
                for (var o = 0, s = i.length; o < s; o++)
                    i[o].fn !== e && i[o].fn._ !== e && r.push(i[o]);
            return r.length ? n[t] = r : delete n[t],
            this
        }
    };
    var tinyEmitter = E
      , lethargy = createCommonjsModule(function(t, e) {
        (function() {
            (null !== e ? e : this).Lethargy = function() {
                function t(t, e, n, i) {
                    this.stability = null != t ? Math.abs(t) : 8,
                    this.sensitivity = null != e ? 1 + Math.abs(e) : 100,
                    this.tolerance = null != n ? 1 + Math.abs(n) : 1.1,
                    this.delay = null != i ? i : 150,
                    this.lastUpDeltas = function() {
                        var t, e, n;
                        for (n = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--)
                            n.push(null);
                        return n
                    }
                    .call(this),
                    this.lastDownDeltas = function() {
                        var t, e, n;
                        for (n = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--)
                            n.push(null);
                        return n
                    }
                    .call(this),
                    this.deltasTimestamp = function() {
                        var t, e, n;
                        for (n = [],
                        t = 1,
                        e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--)
                            n.push(null);
                        return n
                    }
                    .call(this)
                }
                return t.prototype.check = function(t) {
                    var e;
                    return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail),
                    this.deltasTimestamp.push(Date.now()),
                    this.deltasTimestamp.shift(),
                    0 < e ? (this.lastUpDeltas.push(e),
                    this.lastUpDeltas.shift(),
                    this.isInertia(1)) : (this.lastDownDeltas.push(e),
                    this.lastDownDeltas.shift(),
                    this.isInertia(-1))
                }
                ,
                t.prototype.isInertia = function(t) {
                    var e, n, i, r, o, s, a;
                    return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (i = e.slice(0, this.stability),
                    n = e.slice(this.stability, 2 * this.stability),
                    a = i.reduce(function(t, e) {
                        return t + e
                    }),
                    o = n.reduce(function(t, e) {
                        return t + e
                    }),
                    s = a / i.length,
                    r = o / n.length,
                    Math.abs(s) < Math.abs(r * this.tolerance) && this.sensitivity < Math.abs(r) && t)
                }
                ,
                t.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }
                ,
                t.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }
                ,
                t
            }()
        }
        ).call(commonjsGlobal)
    })
      , support = {
        hasWheelEvent: "onwheel"in document,
        hasMouseWheelEvent: "onmousewheel"in document,
        hasTouch: "ontouchstart"in document || navigator.maxTouchPoints > 0,
        hasTouchWin: navigator.msMaxTouchPoints && 1 < navigator.msMaxTouchPoints,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: "onkeydown"in document,
        isFirefox: -1 < navigator.userAgent.indexOf("Firefox")
    }
      , toString$1 = Object.prototype.toString
      , hasOwnProperty$2 = Object.prototype.hasOwnProperty
      , bindallStandalone = function(t) {
        if (!t)
            return console.warn("bindAll requires at least one argument.");
        var e = Array.prototype.slice.call(arguments, 1);
        if (0 === e.length)
            for (var n in t)
                hasOwnProperty$2.call(t, n) && "function" == typeof t[n] && "[object Function]" == toString$1.call(t[n]) && e.push(n);
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            t[r] = bind(t[r], t)
        }
    };
    function bind(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    var Lethargy = lethargy.Lethargy
      , EVT_ID = "virtualscroll"
      , src = VirtualScroll
      , keyCodes = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32
    };
    function VirtualScroll(t) {
        bindallStandalone(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown","_dragDealer","_onMouseStart","_onMouseMove","_onMouseUp"),
        this.el = window,
        t && t.el && (this.el = t.el,
        delete t.el),
        this.options = objectAssign({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: !1,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: !1,
            useKeyboard: !0
        }, t),
        this.options.limitInertia && (this._lethargy = new Lethargy),
        this._emitter = new tinyEmitter,
        this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        },
        this.touchStartX = null,
        this.touchStartY = null,
        this.bodyTouchAction = null,
        void 0 !== this.options.passive && (this.listenerOptions = {
            passive: this.options.passive
        })
    }
    VirtualScroll.prototype._notify = function(t) {
        var e = this._event;
        e.x += e.deltaX,
        e.y += e.deltaY,
        this._emitter.emit(EVT_ID, {
            x: e.x,
            y: e.y,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            originalEvent: t
        })
    }
    ,
    VirtualScroll.prototype._onWheel = function(t) {
        var e = this.options;
        if (!this._lethargy || !1 !== this._lethargy.check(t)) {
            var n = this._event;
            n.deltaX = t.wheelDeltaX || -1 * t.deltaX,
            n.deltaY = t.wheelDeltaY || -1 * t.deltaY,
            support.isFirefox && 1 == t.deltaMode && (n.deltaX *= e.firefoxMultiplier,
            n.deltaY *= e.firefoxMultiplier),
            n.deltaX *= e.mouseMultiplier,
            n.deltaY *= e.mouseMultiplier,
            this._notify(t)
        }
    }
    ,
    VirtualScroll.prototype._onMouseWheel = function(t) {
        if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
            var e = this._event;
            e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0,
            e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta,
            this._notify(t)
        }
    }
    ,
    VirtualScroll.prototype._onTouchStart = function(t) {
        var e = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStartX = e.pageX,
        this.touchStartY = e.pageY
    }
    ,
    VirtualScroll.prototype._onTouchMove = function(t) {
        var e = this.options;
        e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
        var n = this._event
          , i = t.targetTouches ? t.targetTouches[0] : t;
        if(window.isTouch && !window.isMobile) {
            n.deltaY = (i.pageX - this.touchStartX) * e.touchMultiplier;
            n.deltaX = (i.pageY - this.touchStartY) * e.touchMultiplier;
        } else {
            n.deltaX = (i.pageX - this.touchStartX) * e.touchMultiplier;
            n.deltaY = (i.pageY - this.touchStartY) * e.touchMultiplier;
        }
        
        this.touchStartX = i.pageX,
        this.touchStartY = i.pageY,
        // console.log('X: ', n.deltaX),
        // console.log('Y: ', n.deltaY),
        this._notify(t)
    },
    VirtualScroll.prototype._onMouseStart = function(t) {
        // console.log(t)
        var e = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStartX = e.pageX,
        this.touchStartY = e.pageY;

        document.addEventListener('mousemove', this._onMouseMove,this.listenerOptions);
        document.addEventListener('mouseup', this._onMouseUp,this.listenerOptions);
    },
    VirtualScroll.prototype._onMouseMove = function(t) {
        // console.log(124);
        var e = this.options;
        e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
        var n = this._event
          , i = t.targetTouches ? t.targetTouches[0] : t;

          var totalHeight = $('.o-scroll')[0].scrollWidth,
            ownHeight = $('.o-scroll')[0].clientWidth;
        var scrollRatio = ownHeight / totalHeight;
        // console.log(scrollRatio);

        n.deltaY = (i.pageX - this.touchStartX) * e.touchMultiplier * -9,
        n.deltaX = (i.pageY - this.touchStartY) * e.touchMultiplier,
        this.touchStartX = i.pageX,
        this.touchStartY = i.pageY;

        // console.log(n.deltaY);
        this._notify(t)
    },
    VirtualScroll.prototype._onMouseUp = function(t) {
        document.removeEventListener('mousemove', this._onMouseMove,this.listenerOptions);
        document.removeEventListener('mouseup', this._onMouseUp,this.listenerOptions);
    },
    VirtualScroll.prototype._dragDealer = function(t) {
        

      /*var lastPageY;
      var totalHeight = $('.o-scroll')[0].scrollWidth,
            ownHeight = $('.o-scroll')[0].clientWidth;
        var scrollRatio = ownHeight / totalHeight;

        console.log(instance);*/

        var tt = this;

      document.querySelector('.o-scrollbar_thumb').addEventListener('mousedown', function() {
        var e = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStartX = e.pageX,
        this.touchStartY = e.pageY

        // lastPageY = e.pageX;
        // document.querySelector('.o-scrollbar_thumb').classList.add('sfta-ss-grabbed');

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stop);

        return false;
      });

      function drag(e) {
        // var delta = e.pageX - lastPageY;
        // lastPageY = e.pageX;

        // window.requestAnimationFrame(function() {
        //    // += delta / scrollRatio;
        // });
      }

      function stop() {
        // document.querySelector('.o-scrollbar_thumb').classList.remove('sfta-ss-grabbed');
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stop);
      }
    }
    ,
    VirtualScroll.prototype._onKeyDown = function(t) {
        var e = this._event;
        e.deltaX = e.deltaY = 0;
        var n = window.innerHeight - 40;
        switch (t.keyCode) {
        case keyCodes.LEFT:
        case keyCodes.UP:
            e.deltaY = this.options.keyStep;
            break;
        case keyCodes.RIGHT:
        case keyCodes.DOWN:
            e.deltaY = -this.options.keyStep;
            break;
        case t.shiftKey:
            e.deltaY = n;
            break;
        case keyCodes.SPACE:
            e.deltaY = -n;
            break;
        default:
            return
        }
        this._notify(t)
    }
    ,
    VirtualScroll.prototype._bind = function() {
        document.querySelector('.o-scrollbar_thumb').addEventListener("mousedown", this._onMouseStart, this.listenerOptions);
        // document.addEventListener("mousemove", this._onMouseMove, this.listenerOptions);
        support.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions),
        support.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
        support.hasTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions),
        this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
        support.hasPointer && support.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction,
        document.body.style.msTouchAction = "none",
        this.el.addEventListener("MSPointerDown", this._onTouchStart, !0),
        this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
        support.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown);
    }
    ,
    VirtualScroll.prototype._unbind = function() {
        support.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
        support.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel),
        support.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart),
        this.el.removeEventListener("touchmove", this._onTouchMove)),
        support.hasPointer && support.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction,
        this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0),
        this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
        support.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
    }
    ,
    VirtualScroll.prototype.on = function(t, e) {
        this._emitter.on(EVT_ID, t, e);
        var n = this._emitter.e;
        n && n[EVT_ID] && 1 === n[EVT_ID].length && this._bind()
    }
    ,
    VirtualScroll.prototype.off = function(t, e) {
        this._emitter.off(EVT_ID, t, e);
        var n = this._emitter.e;
        (!n[EVT_ID] || n[EVT_ID].length <= 0) && this._unbind()
    }
    ,
    VirtualScroll.prototype.reset = function() {
        var t = this._event;
        t.x = 0,
        t.y = 0
    }
    ,
    VirtualScroll.prototype.destroy = function() {
        this._emitter.off(),
        this._unbind()
    }
    ;
    var _default$6 = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).isReversed = t.reversed || DEFAULTS$1.reversed,
            n.getDirection = t.getDirection || DEFAULTS$1.getDirection,
            n.getSpeed = t.getSpeed || DEFAULTS$1.getSpeed,
            n.inertia = t.inertia || DEFAULTS$1.inertia,
            n.scrollBarClassName = t.scrollBarClassName || DEFAULTS$1.scrollBarClassName,
            n.isScrollingClassName = t.isScrollingClassName || DEFAULTS$1.isScrollingClassName,
            n.parallaxElements = [],
            n.isDraggingScrollBar = !1,
            n.isTicking = !1,
            n.hasScrollTicking = !1,
            n.isScrolling = !1,
            n
        }
        return _inherits(e, _default$5),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                $html.addClass("has-smooth-scroll"),
                this.instance = new src({
                    mouseMultiplier: -1 < navigator.platform.indexOf("Win") ? 1 : .4,
                    touchMultiplier: 4,
                    firefoxMultiplier: 30
                }),
                this.inertia = .1 * this.inertia,
                this.instance.scroll = {
                    x: 0,
                    y: 0,
                    direction: null
                },
                this.instance.delta = {
                    x: 0,
                    y: 0
                },
                this.getSpeed && (this.instance.scroll.speed = 0),
                this.instance.on(function(e) {
                    t.stop || (t.isTicking || t.isDraggingScrollBar || (requestAnimationFrame(function() {
                        t.isScrolling || (t.isScrolling = !0,
                        t.checkScroll(),
                        html.classList.add(t.isScrollingClassName)),
                        t.instance.delta.y -= e.deltaY,
                        t.instance.delta.y < 0 && (t.instance.delta.y = 0),
                        t.instance.delta.y > t.instance.limit && (t.instance.delta.y = t.instance.limit)
                    }),
                    t.isTicking = !0),
                    t.isTicking = !1)
                }),
                this.setScrollLimit(),
                this.initScrollBar(),
                this.addElements(),
                this.events(),
                this.preloadImages(),
                this.timestamp = Date.now(),
                this.render()
            }
        }, {
            key: "events",
            value: function() {
                var t = this;
                this.$container.on(EVENT$2.REBUILD, function() {
                    t.update()
                }),
                this.$container.on(EVENT$2.UPDATE, function(e, n) {
                    return t.update(n)
                }),
                this.$container.on(EVENT$2.CLICK, ".js-scrollto", function(e) {
                    e.preventDefault();
                    var n = $(e.currentTarget)
                      , i = n.data("offset");
                    t.scrollTo({
                        sourceElem: n,
                        offsetElem: i
                    })
                }),
                this.$container.on(EVENT$2.SCROLLTO, function(e) {
                    return t.scrollTo(e.options)
                }),
                $document.triggerHandler({
                    type: EVENT$2.ISREADY
                }),
                $window.on(EVENT$2.RESIZE, function() {
                    t.update()
                }),
                this.$container.on(EVENT$2.STOP, function() {
                    t.stop = !0
                }),
                this.$container.on(EVENT$2.START, function() {
                    t.stop = !1
                })
            }
        }, {
            key: "initScrollBar",
            value: function() {
                var t = this;
                this.scrollbarWrapper = document.createElement("span"),
                this.scrollbar = document.createElement("span"),
                this.scrollbarWrapper.classList.add("".concat(this.scrollBarClassName, "_wrapper")),
                this.scrollbar.classList.add("".concat(this.scrollBarClassName)),
                this.scrollbarWrapper.append(this.scrollbar),
                document.body.append(this.scrollbarWrapper),
                this.scrollbar.style.height = "".concat(window.innerHeight * window.innerHeight / this.instance.limit, "px"),
                this.scrollBarLimit = window.innerHeight - this.scrollbar.getBoundingClientRect().height,
                this.scrollbar.addEventListener("mousedown", function(e) {
                    return t.getScrollBar(e)
                }),
                window.addEventListener("mouseup", function(e) {
                    return t.releaseScrollBar(e)
                }),
                window.addEventListener("mousemove", function(e) {
                    return t.moveScrollBar(e)
                })
            }
        }, {
            key: "reinitScrollBar",
            value: function() {
                this.scrollbar.style.height = "".concat(window.innerHeight * window.innerHeight / this.instance.limit, "px"),
                this.scrollBarLimit = window.innerHeight - this.scrollbar.getBoundingClientRect().height
            }
        }, {
            key: "destroyScrollBar",
            value: function() {
                var t = this;
                this.scrollbar.removeEventListener("mousedown", function(e) {
                    return t.getScrollBar(e)
                }),
                window.removeEventListener("mouseup", function(e) {
                    return t.releaseScrollBar(e)
                }),
                window.removeEventListener("mousemove", function(e) {
                    return t.moveScrollBar(e)
                })
            }
        }, {
            key: "getScrollBar",
            value: function(t) {
                this.isDraggingScrollBar = !0,
                this.checkScroll(),
                html.classList.add(this.isScrollingClassName)
            }
        }, {
            key: "releaseScrollBar",
            value: function(t) {
                this.isDraggingScrollBar = !1,
                html.classList.remove(this.isScrollingClassName)
            }
        }, {
            key: "moveScrollBar",
            value: function(t) {
                var e = this;
                !this.isTicking && this.isDraggingScrollBar && (requestAnimationFrame(function() {
                    var n = 100 * t.pageY / window.innerHeight * e.instance.limit / 100;
                    0 < n && n < e.instance.limit && (e.instance.delta.y = n)
                }),
                this.isTicking = !0),
                this.isTicking = !1
            }
        }, {
            key: "addElements",
            value: function() {

                this.animatedElements = [],
                this.parallaxElements = [];
                for (var t = $(this.selector), e = t.length, n = 0; n < e; n++) {
                    var i = t.eq(n)
                      , r = !!i.attr("data-speed") && i.attr("data-speed") / 10
                      , o = (i.attr("data-position"),
                    i.attr("data-target"))
                      , s = (i.attr("data-horizontal"),
                    "string" == typeof i.attr("data-sticky"))
                      , a = i.attr("data-sticky-target")
                      , l = o && $(o).length ? $(o) : i
                      , c = l.offset().top + this.instance.scroll.y
                      , u = c + l.outerHeight()
                      , d = null;
                    "string" == typeof i.attr("data-viewport-offset") && (d = i.attr("data-viewport-offset").split(","));
                    var h = "string" == typeof i.attr("data-callback") ? i.attr("data-callback") : null
                      , f = null;
                    if (null != h) {
                        for (var p = h.substr(0, h.indexOf("(")), m = h.substr(h.indexOf("("), h.length - p.length), E = (m = (m = m.replace("(", "")).replace(")", "")).split("|"), g = {}, v = 0; v < E.length; v++) {
                            var y = E[v].split(":");
                            y[0] = y[0].replace(" ", "");
                            var _;
                            _ = "true" === y[1] || "false" !== y[1] && (/^\d+$/.test(y[1]) ? parseInt(y[1]) : y[1]),
                            g[y[0]] = _
                        }
                        f = {
                            event: p,
                            options: g
                        }
                    }
                    var w = "string" == typeof i.attr("data-repeat")
                      , b = i.attr("data-inview-class");
                    void 0 === b && (b = "is-show"),
                    !o && i.attr("data-transform") && (u = (c -= parseFloat(i.attr("data-transform").y)) + l.outerHeight()),
                    s && (u = void 0 === a ? 1 / 0 : $(a).offset().top - i.height() + this.instance.scroll.y);
                    var S = {
                        $element: i,
                        inViewClass: b,
                        limit: u,
                        offset: Math.round(c),
                        repeat: w,
                        callback: f,
                        viewportOffset: d
                    };
                    if (!1 !== r) {
                        var T = i.attr("data-position")
                          , C = "string" == typeof i.attr("data-horizontal")
                          , A = (u - c) / 2 + c
                          , O = i.attr("data-delay");
                        S.horizontal = C,
                        S.middle = A,
                        S.offset = c,
                        S.position = T,
                        S.speed = r,
                        S.delay = O,
                        this.parallaxElements.push(S)
                    } else
                        S.sticky = s,
                        this.animatedElements.push(S),
                        s && this.toggleElement(S)
                }
            }
        }, {
            key: "checkScroll",
            value: function() {
                var t = this;
                if (this.isScrolling || this.isDraggingScrollBar) {
                    this.hasScrollTicking || (requestAnimationFrame(function() {
                        return t.checkScroll()
                    }),
                    this.hasScrollTicking = !0);
                    var e = Math.abs(this.instance.delta.y - this.instance.scroll.y);
                    (e < 1 && 0 != this.instance.delta.y || e < .5 && 0 == this.instance.delta.y) && (this.isScrolling = !1,
                    this.instance.scroll.y = Math.round(this.instance.scroll.y),
                    html.classList.remove(this.isScrollingClassName)),
                    this.render()
                }
            }
        }, {
            key: "render",
            value: function(t, e) {
                this.isScrolling ? this.instance.scroll.y = this.lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia) : this.isDraggingScrollBar && (this.instance.scroll.y = this.lerp(this.instance.scroll.y, this.instance.delta.y, .2)),
                this.$container.css({
                    "-webkit-transform": "translate3d(0, ".concat(-this.instance.scroll.y, "px, 0)"),
                    "-ms-transform": "translate3d(0, ".concat(-this.instance.scroll.y, "px, 0)"),
                    transform: "translate3d(0, ".concat(-this.instance.scroll.y, "px, 0)")
                }),
                this.getDirection && (this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.scroll.direction && (this.instance.scroll.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.scroll.direction && (this.instance.scroll.direction = "up")),
                this.getSpeed && (this.instance.delta.y !== this.instance.scroll.y ? (this.instance.scroll.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp),
                this.instance.delta.y = this.instance.delta.y) : this.instance.scroll.speed = 0),
                this.transformElements(t),
                this.animateElements(),
                this.callbacks.onScroll(this.instance),
                this.timestamp = Date.now();
                var n = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
                this.scrollbar.style.transform = "translate3d(0,".concat(n, "px,0)"),
                this.hasScrollTicking = !1
            }
        }, {
            key: "lerp",
            value: function(t, e, n) {
                return (1 - n) * t + n * e
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                var e = this
                  , n = t.targetElem
                  , i = t.sourceElem
                  , r = t.offsetElem
                  , o = isNumeric(t.targetOffset) ? parseInt(t.targetOffset) : 0
                  , s = isNumeric(t.delay) ? parseInt(t.delay) : 0
                  , a = (isNumeric(t.speed) && parseInt(t.speed),
                t.toTop)
                  , l = t.toBottom
                  , c = 0;
                if (void 0 === n && void 0 === i && void 0 === o)
                    return console.warn("You must specify at least one parameter."),
                    !1;
                if (void 0 !== n && n instanceof jQuery && 0 < n.length && (o = n.offset().top + this.instance.scroll.y + o),
                void 0 !== i && i instanceof jQuery && 0 < i.length) {
                    var u;
                    u = i.attr("data-target") ? i.attr("data-target") : i.attr("href"),
                    o = $(u).offset().top + this.instance.scroll.y + o
                }
                void 0 !== r && (c = $(r).outerHeight(),
                o -= c),
                !0 === a ? o = 0 : !0 === l && (o = this.instance.limit),
                setTimeout(function() {
                    e.isScrolling = !1,
                    e.instance.delta.y = o,
                    html.classList.remove(e.isScrollingClassName)
                }, s)
            }
        }, {
            key: "setScrollLimit",
            value: function() {
                this.instance.limit = this.$container[0].offsetHeight - this.windowHeight
            }
        }, {
            key: "transformElement",
            value: function(t, e, n, i, r) {
                if (e = e || 0,
                n = n || 0,
                i = i || 0,
                r) {
                    var o = this.getTranslate(t[0])
                      , s = this.lerp(o.y, n, r)
                      , a = this.lerp(o.x, e, r);
                    t.css({
                        "-webkit-transform": "translate3d(".concat(a, "px, ").concat(s, "px, ").concat(i, "px)"),
                        "-ms-transform": "translate3d(".concat(a, "px, ").concat(s, "px, ").concat(i, "px)"),
                        transform: "translate3d(".concat(a, "px, ").concat(s, "px, ").concat(i, "px)")
                    }).data("transform", {
                        x: a,
                        y: s,
                        z: i
                    })
                } else
                    t.css({
                        "-webkit-transform": "translate3d(".concat(e, "px, ").concat(n, "px, ").concat(i, "px)"),
                        "-ms-transform": "translate3d(".concat(e, "px, ").concat(n, "px, ").concat(i, "px)"),
                        transform: "translate3d(".concat(e, "px, ").concat(n, "px, ").concat(i, "px)")
                    }).data("transform", {
                        x: e,
                        y: n,
                        z: i
                    })
            }
        }, {
            key: "getTranslate",
            value: function(t) {
                var e = {};
                if (window.getComputedStyle) {
                    var n = getComputedStyle(t)
                      , i = n.transform || n.webkitTransform || n.mozTransform
                      , r = i.match(/^matrix3d\((.+)\)$/);
                    return r ? parseFloat(r[1].split(", ")[13]) : (r = i.match(/^matrix\((.+)\)$/),
                    e.x = r ? parseFloat(r[1].split(", ")[4]) : 0,
                    e.y = r ? parseFloat(r[1].split(", ")[5]) : 0,
                    e)
                }
            }
        }, {
            key: "transformElements",
            value: function(t) {
                if (0 < this.parallaxElements.length)
                    for (var e = this.instance.scroll.y + this.windowHeight, n = this.instance.scroll.y + this.windowMiddle, i = 0, r = this.parallaxElements.length; i < r; i++) {
                        var o = this.parallaxElements[i]
                          , s = !1
                          , a = e + this.windowHeight >= o.offset && this.instance.scroll.y <= o.limit;
                        if (this.toggleElement(o, i),
                        t && !a && o.speed && "top" !== o.position && (s = (o.offset - this.windowMiddle - o.middle) * -o.speed),
                        a && o.speed)
                            switch (o.position) {
                            case "top":
                                s = this.instance.scroll.y * -o.speed;
                                break;
                            case "bottom":
                                s = (this.instance.limit - e + this.windowHeight) * o.speed;
                                break;
                            default:
                                s = (n - o.middle) * -o.speed
                            }
                        isNumeric(s) && (o.horizontal ? this.transformElement(o.$element, s, 0, 0, o.delay) : this.transformElement(o.$element, 0, s, 0, o.delay))
                    }
            }
        }, {
            key: "update",
            value: function(t) {
                t = t || {},
                this.windowHeight = $window.height(),
                this.windowMiddle = this.windowHeight / 2,
                this.setScrollLimit(),
                this.addElements(),
                this.transformElements(!0),
                this.reinitScrollBar()
            }
        }, {
            key: "setWheelDirection",
            value: function(t) {
                this.scrollbar.reverseWheel(t)
            }
        }, {
            key: "preloadImages",
            value: function() {
                var t = this
                  , e = Array.from(document.querySelectorAll("img"));
                e.forEach(function(n) {
                    var i = document.createElement("img");
                    i.addEventListener("load", function() {
                        e.splice(e.indexOf(n), 1),
                        0 === e.length && t.update()
                    }),
                    i.src = n.getAttribute("src")
                })
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                $html.removeClass("has-smooth-scroll"),
                this.parallaxElements = [],
                this.instance.destroy(),
                cancelAnimationFrame(this.raf)
            }
        }]),
        e
    }()
      , _default$7 = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$6),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.isPortrait = !1,
                window.innerWidth < 768 && (this.isPortrait = !0),
                $html.addClass("has-smooth-scroll"),
                this.instance = new src({
                    mouseMultiplier: -1 < navigator.platform.indexOf("Win") ? 1 : .4,
                    touchMultiplier: window.innerWidth < 768 ? 3 : 2,
                    firefoxMultiplier: 30,
                    el: window.isMobile ? window : this.$container[0],
                    useKeyboard: !1
                }),
                this.inertia = .1 * this.inertia,
                this.instance.scroll = {
                    x: 0,
                    y: 0,
                    direction: null
                },
                this.instance.delta = {
                    x: 0,
                    y: 0
                },
                this.getSpeed && (this.instance.scroll.speed = 0),
                this.windowHeight = $window.height(),
                this.windowMiddleY = this.windowHeight / 2,
                this.windowWidth = $window.width(),
                this.windowMiddleX = this.windowWidth / 2,
                this.instance.on(function(e) {
                    if (window.innerWidth < 768)
                        return !1;
                    window.isMobile ? !t.isReversed || t.isPortrait ? t.instance.delta.y -= e.deltaY : t.instance.delta.x -= e.deltaX : !t.isReversed || t.isPortrait ? t.instance.delta.y -= e.deltaY : t.instance.delta.x -= e.deltaY,
                    t.isScrolling = !0,
                    !t.isReversed || t.isPortrait ? (t.instance.delta.y < 0 && (t.instance.delta.y = 0),
                    t.instance.delta.y > t.instance.limit && (t.instance.delta.y = t.instance.limit)) : (t.instance.delta.x < 0 && (t.instance.delta.x = 0),
                    t.instance.delta.x > t.instance.limit && (t.instance.delta.x = t.instance.limit))
                }),
                this.setScrollLimit(),
                this.addElements(),
                this.$container.on(EVENT$2.REBUILD, function() {
                    t.update()
                }),
                this.$container.on(EVENT$2.UPDATE, function(e, n) {
                    return t.update(n)
                }),
                $document.on(EVENT$2.CLICK, ".js-scrollto", function(e) {
                    e.preventDefault();
                    var n = $(e.currentTarget)
                      , i = n.attr("data-offset-element")
                      , r = parseInt(n.attr("data-offset"));
                    t.scrollTo({
                        sourceElem: n,
                        offsetElem: i,
                        offset: r
                    })
                }),
                $document.on(EVENT$2.SCROLLTO, function(e) {
                    return t.scrollTo(e.options)
                }),
                $document.triggerHandler({
                    type: EVENT$2.ISREADY
                }),
                $window.on(EVENT$2.RESIZE, function() {
                    t.update()
                }),
                this.timestamp = Date.now(),
                this.preloadImages(),
                this.render()
            }
        }, {
            key: "addElements",
            value: function() {

                this.animatedElements = [],
                this.parallaxElements = [];
                for (var t = $(this.selector), e = t.length, n = 0; n < e; n++) {
                    var i = t.eq(n)
                      , r = !!i.attr("data-speed") && i.attr("data-speed") / 10
                      , o = (i.attr("data-position"),
                    i.attr("data-target"))
                      , s = (i.attr("data-horizontal"),
                    "string" == typeof i.attr("data-sticky"))
                      , a = i.attr("data-sticky-target")
                      , l = o && $(o).length ? $(o) : i
                      , c = l.offset().top + this.instance.scroll.y
                      , u = l.offset().left + this.instance.scroll.x
                      , d = c + l.outerHeight()
                      , h = u + l.outerWidth()
                      , f = null;
                    "string" == typeof i.attr("data-viewport-offset") && (f = i.attr("data-viewport-offset").split(","));
                    var p = "string" == typeof i.attr("data-callback") ? i.attr("data-callback") : null
                      , m = null;
                    if (null != p) {
                        for (var E = p.substr(0, p.indexOf("(")), g = p.substr(p.indexOf("("), p.length - E.length), v = (g = (g = g.replace("(", "")).replace(")", "")).split("|"), y = {}, _ = 0; _ < v.length; _++) {
                            var w = v[_].split(":");
                            w[0] = w[0].replace(" ", "");
                            var b;
                            b = "true" === w[1] || "false" !== w[1] && (/^\d+$/.test(w[1]) ? parseInt(w[1]) : w[1]),
                            y[w[0]] = b
                        }
                        m = {
                            event: E,
                            options: y
                        }
                    }
                    var S = "string" == typeof i.attr("data-repeat")
                      , T = i.attr("data-inview-class");
                    void 0 === T && (T = "is-show"),
                    !o && i.attr("data-transform") && (elementOffset -= parseFloat(i.attr("data-transform").y),
                    d = elementOffset + l.outerHeight()),
                    s && (d = void 0 === a ? 1 / 0 : $(a).offset().top - i.height() + this.instance.scroll.y);
                    var C = {
                        $element: i,
                        inViewClass: T,
                        limitY: d,
                        limitX: h,
                        offsetX: Math.round(u),
                        offsetY: Math.round(c),
                        repeat: S,
                        callback: m,
                        viewportOffset: f
                    };
                    if (!1 !== r) {
                        var A = i.attr("data-position")
                          , O = "string" == typeof i.attr("data-horizontal")
                          , N = (d - c) / 2 + c
                          , M = (h - u) / 2 + u
                          , x = i.attr("data-delay");
                        C.horizontal = O,
                        C.middleY = N,
                        C.middleX = M,
                        C.offsetX = u,
                        C.offsetY = c,
                        C.position = A,
                        C.speed = r,
                        C.delay = x,
                        this.parallaxElements.push(C)
                    } else
                        C.sticky = s,
                        this.animatedElements.push(C),
                        s && this.toggleElement(C)
                }
            }
        }, {
            key: "transformElements",
            value: function(t) {
                if (0 < this.parallaxElements.length)
                    for (var e = this.instance.scroll.y + this.windowHeight, n = this.instance.scroll.x + this.windowWidth, i = this.instance.scroll.y + this.windowMiddleY, r = this.instance.scroll.x + this.windowMiddleX, o = 0, s = this.parallaxElements.length; o < s; o++) {
                        var a = this.parallaxElements[o]
                          , l = !1
                          , c = e + this.windowHeight >= a.offsetY && this.instance.scroll.y <= a.limitY;
                        if (this.isReversed && (c = n >= a.offsetX && this.instance.scroll.x <= a.limitX),
                            // console.log(123),
                        this.toggleElement(a, o),
                        t && !c && a.speed && "top" !== a.position && (l = (a.offset - this.windowMiddle - a.middle) * -a.speed),
                        c && a.speed)
                            switch (a.position) {
                            case "top":
                                l = !this.isReversed || this.isPortrait ? this.instance.scroll.y * -a.speed : this.instance.scroll.x * -a.speed;
                                break;
                            case "bottom":
                                l = !this.isReversed || this.isPortrait ? (this.instance.limit - e + this.windowHeight) * a.speed : (this.instance.limit - n + this.windowWidth) * a.speed;
                                break;
                            default:
                                l = !this.isReversed || this.isPortrait ? (i - a.middleY) * -a.speed : (r - a.middleX) * -a.speed
                            }
                        isNumeric(l) && (a.horizontal || this.isReversed && !this.isPortrait ? this.transformElement(a.$element, l, 0, 0, a.delay) : this.transformElement(a.$element, 0, l, 0, a.delay))
                    }
            }
        }, {
            key: "render",
            value: function(t, e) {
                var n = this;
                if (this.raf = requestAnimationFrame(function() {
                    return n.render()
                }),
                window.innerWidth < 768)
                    return !1;
                    // console.log(this.isReversed);
                this.isScrolling,
                !this.isReversed || this.isPortrait ? .5 < Math.abs(this.instance.scroll.y - this.instance.delta.y) && (this.instance.scroll.y = this.lerp(this.instance.scroll.y, this.instance.delta.y, this.inertia)) : .5 < Math.abs(this.instance.scroll.x - this.instance.delta.x) && (this.instance.scroll.x = this.lerp(this.instance.scroll.x, this.instance.delta.x, this.inertia)),
                !this.isReversed || this.isPortrait ? this.$container.css({
                    "-webkit-transform": "translate3d(0, ".concat(-this.instance.scroll.y, "px, 0)"),
                    "-ms-transform": "translate3d(0, ".concat(-this.instance.scroll.y, "px, 0)"),
                    transform: "translate3d(0, ".concat(-this.instance.scroll.y, "px, 0)")
                }) : this.$container.css({
                    "-webkit-transform": "translate3d(".concat(-this.instance.scroll.x, "px, 0, 0)"),
                    "-ms-transform": "translate3d(".concat(-this.instance.scroll.x, "px, 0)"),
                    transform: "translate3d(".concat(-this.instance.scroll.x, "px, 0, 0)")
                }),
                this.getDirection && (this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.scroll.direction && (this.instance.scroll.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.scroll.direction && (this.instance.scroll.direction = "up")),
                this.getSpeed && (this.instance.delta.y !== this.instance.scroll.y ? (this.instance.scroll.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp),
                this.instance.delta.y = this.instance.delta.y) : this.instance.scroll.speed = 0),
                window.scroll = this.instance.scroll,
                this.timestamp = Date.now(),
                this.callbacks.onScroll(this.instance, this.$container),
                this.transformElements(t),
                this.animateElements()
            }
        }, {
            key: "transformElement",
            value: function(t, e, n, i, r) {
                if (e = e || 0,
                n = n || 0,
                i = i || 0,
                !r || window.isIE)
                    t.css({
                        "-webkit-transform": "translate3d(".concat(e, "px, ").concat(n, "px, ").concat(i, "px)"),
                        "-ms-transform": "translate3d(".concat(e, "px, ").concat(n, "px, ").concat(i, "px)"),
                        transform: "translate3d(".concat(e, "px, ").concat(n, "px, ").concat(i, "px)")
                    }).data("transform", {
                        x: e,
                        y: n,
                        z: i
                    });
                else {
                    var o = this.getTranslate(t[0])
                      , s = this.lerp(o.y, n, r)
                      , a = this.lerp(o.x, e, r);
                    t.css({
                        "-webkit-transform": "translate3d(".concat(a, "px, ").concat(s, "px, ").concat(i, "px)"),
                        "-ms-transform": "translate3d(".concat(a, "px, ").concat(s, "px, ").concat(i, "px)"),
                        transform: "translate3d(".concat(a, "px, ").concat(s, "px, ").concat(i, "px)")
                    }).data("transform", {
                        x: a,
                        y: s,
                        z: i
                    })
                }
            }
        }, {
            key: "setScrollLimit",
            value: function() {
                if (this.isReversed)
                    if (this.isPortrait) {
                        for (var t = 0, e = this.$container[0].children, n = 0; n < e.length; n++)
                            t += e[n].offsetHeight;
                        this.instance.limit = t - this.windowHeight
                    } else {
                        for (var i = 0, r = this.$container[0].children, o = 0; o < r.length; o++)
                            i += r[o].offsetWidth;
                        this.instance.limit = i - this.windowWidth
                    }
                else
                    this.instance.limit = this.$container[0].offsetHeight - this.windowHeight
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                var e = this
                  , n = t.targetElem
                  , i = t.sourceElem
                  , r = t.offsetElem
                  , o = isNumeric(t.targetOffset) ? parseInt(t.targetOffset) : 0
                  , s = isNumeric(t.delay) ? parseInt(t.delay) : 0
                  , a = (isNumeric(t.speed) && parseInt(t.speed),
                t.toTop)
                  , l = t.toBottom
                  , c = 0
                  , u = t.offset
                  , d = this.isReversed ? this.instance.scroll.x : this.instance.scroll.y;
                if (void 0 === n && void 0 === i && void 0 === o)
                    return console.warn("You must specify at least one parameter."),
                    !1;
                if (void 0 !== n && n instanceof jQuery && 0 < n.length && (o = this.isReversed ? n.offset().left + d + o : n.offset().top + d + o),
                void 0 !== i && i instanceof jQuery && 0 < i.length) {
                    var h;
                    h = i.attr("data-target") ? i.attr("data-target") : i.attr("href"),
                    o = this.isReversed ? $(h).offset().left + d + o : $(h).offset().top + d + o
                }
                void 0 !== r && (c = this.isReversed ? $(r).outerWidth() : $(r).outerHeight(),
                o -= c),
                void 0 !== u && (o = parseInt(o - u)),
                !0 === a ? o = 0 : !0 === l && (o = this.instance.limit),
                setTimeout(function() {
                    e.isScrolling = !1,
                    e.isReversed ? e.instance.delta.x = o : e.instance.delta.y = o
                }, s)
            }
        }, {
            key: "update",
            value: function(t) {
                t = t || {},
                this.windowHeight = $window.height(),
                this.windowMiddleY = this.windowHeight / 2,
                this.windowWidth = $window.width(),
                this.windowMiddleX = this.windowWidth / 2,
                this.setScrollLimit(),
                this.addElements(),
                this.transformElements(!0)
            }
        }]),
        e
    }()
      , _default$8 = function() {
        function t(e) {
            _classCallCheck(this, t),
            this.options = e,
            this.smooth = e.smooth || DEFAULTS$1.smooth,
            this.smoothMobile = e.smoothMobile || DEFAULTS$1.smoothMobile,
            this.mobileContainer = e.mobileContainer || DEFAULTS$1.mobileContainer,
            this.isMobile = !1,
            this.init()
        }
        return _createClass(t, [{
            key: "init",
            value: function() {
                var t = this;
                $html[0].scrollTop = 0,
                $body[0].scrollTop = 0,
                this.smoothMobile || (this.isMobile = window.innerWidth < 768),
                this.instance = !0 !== t.smooth || t.isMobile ? (t.mobileContainer && (t.options.container = t.mobileContainer),
                new _default$5(t.options)) : new _default$7(t.options),
                this.instance.init();
                var e = $(".js-scrollto-on-load").first();
                1 === e.length && $document.triggerHandler({
                    type: "Event.SCROLLTO",
                    options: {
                        targetElem: e
                    }
                })
            }
        }, {
            key: "destroy",
            value: function() {
                this.instance.destroy()
            }
        }]),
        t
    }()
      , EVENT_KEY$1 = "LocomotiveScroll"
      , EVENT$3 = {
        CLICK: "click.".concat(EVENT_KEY$1),
        ISREADY: "isReady.".concat(EVENT_KEY$1),
        REBUILD: "rebuild.".concat(EVENT_KEY$1),
        RENDER: "render.".concat(EVENT_KEY$1),
        RESIZE: "resize.".concat(EVENT_KEY$1),
        SCROLL: "scroll.".concat(EVENT_KEY$1),
        SCROLLTO: "scrollTo.".concat(EVENT_KEY$1),
        UPDATE: "update.".concat(EVENT_KEY$1),
        STOP: "stop.".concat(EVENT_KEY$1),
        START: "start.".concat(EVENT_KEY$1)
    }
      , DEFAULTS$2 = {
        container: $document,
        mobileContainer: $document,
        onScroll: function() {},
        selector: ".js-animate",
        smooth: !1,
        smoothMobile: !1,
        reversed: !1,
        getDirection: !1,
        getSpeed: !1,
        scrollBarClassName: "o-scrollbar",
        isScrollingClassName: "is-scrolling"
    }
      , EVENT$4 = Object.assign(EVENT$3, {})
      , DEFAULTS$3 = Object.assign(DEFAULTS$2, {})
      , MODULE_NAME$1 = "RailMove"
      , EVENT_NAMESPACE$1 = "".concat(APP_NAME, ".").concat(MODULE_NAME$1)
      , EVENT$5 = {
        CLICK: "click.".concat(EVENT_NAMESPACE$1),
        UPDATE_SCROLL: "updateScroll.".concat(EVENT_NAMESPACE$1)
    }
      , _default$9 = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function(t, e) {
                this.$wrapper = t,
                this.containerWidth = 0,
                this.requestAnimation = null,
                this.scrollPosition = -1,
                this.translation = 0,
                this.grabbed = !1,
                this.preventClick = !1,
                this.originalVelocity = -e,
                this.velocity = this.originalVelocity,
                this.initializeElements(),
                this.initializeEvents()
            }
        }, {
            key: "initializeElements",
            value: function() {
                this.$railMove = this.$wrapper.find(".c-rail_group-container"),
                this.getBCR()
            }
        }, {
            key: "initializeEvents",
            value: function() {
                this.updateBind = this.updateScroll.bind(this),
                this.update(),
                this.updateBind(),
                $document.on(EVENT$5.UPDATE_SCROLL, this.updateBind)
            }
        }, {
            key: "setContainerWidth",
            value: function(t) {
                // console.log(t);
                this.containerWidth = t
            }
        }, {
            key: "getBCR",
            value: function() {
                this.railMoveBCR = this.$railMove[0].getBoundingClientRect()
            }
        }, {
            key: "updateScroll",
            value: function() {
                if (!$html.hasClass("is-mobile")) {
                    var t = window.scroll.x - this.scrollPosition;
                    this.scrollPosition = window.scroll.x,
                    0 != t && (this.velocity = this.originalVelocity * t * .5),
                    Math.abs(this.velocity) < Math.abs(this.originalVelocity) && (this.velocity < 0 ? this.velocity = this.originalVelocity : this.velocity = -this.originalVelocity)
                }
            }
        }, {
            key: "update",
            value: function() {
                var t;
                this.grabbed || (768 < window.innerWidth ? this.translation > this.railMoveBCR.height / 2 || this.translation < -this.railMoveBCR.height / 2 ? this.translation = 0 : this.translation = this.translation + this.velocity : this.translation > this.railMoveBCR.width / 2 || this.translation < -this.railMoveBCR.width / 2 ? this.translation = 0 : this.translation = this.translation + this.velocity),
                t = 0 < this.translation ? -this.containerWidth + this.translation % this.containerWidth : this.translation % this.containerWidth,
                TweenMax.set(this.$railMove, {
                    x: t,
                    force3D: !0
                }),
                this.requestAnimation = window.requestAnimationFrame(this.update.bind(this))
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$1)),
                $document.off(EVENT$5.UPDATE_SCROLL, this.updateBind),
                window.cancelAnimationFrame(this.requestAnimation),
                TweenMax.set(this.$railMove, {
                    x: 0
                })
            }
        }]),
        e
    }()
      , _default$a = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                function moveBar(instance) {
                    var totalHeight = $('.o-scroll')[0].scrollWidth,
                        ownHeight = $('.o-scroll')[0].clientWidth,
                        _this = this;

                        // console.log(this);

                    var scrollRatio = ownHeight / totalHeight;

                      // Hide scrollbar if no scrolling is possible
                      if(scrollRatio >= 1) {
                        // _this.bar.classList.add('sfta-ss-hidden')
                      } else {
                        // _this.bar.classList.remove('sfta-ss-hidden')
                        var barHeight = Math.max(scrollRatio * 100, 1) * ownHeight / 100;
                        var barTop = (instance.scroll.x / (totalHeight-ownHeight) ) * (ownHeight - barHeight);
                        $('.o-scrollbar_thumb')[0].style.cssText = 'width:' + (barHeight+3) + 'px; transform: translateX(' + barTop + 'px);';
                        // $('.o-scrollbar_thumb').css('width',barHeight + 'px')
                      }
                }

                function dragDealer(el, instance) {
                  var lastPageY;
                  var totalHeight = $('.o-scroll')[0].scrollWidth,
                        ownHeight = $('.o-scroll')[0].clientWidth;
                    var scrollRatio = ownHeight / totalHeight;

                    // console.log(instance);

                  el.addEventListener('mousedown', function(e) {
                    lastPageY = e.pageX;
                    el.classList.add('sfta-ss-grabbed');

                    document.addEventListener('mousemove', drag);
                    document.addEventListener('mouseup', stop);

                    return false;
                  });

                  function drag(e) {
                    var delta = e.pageX - lastPageY;
                    lastPageY = e.pageX;

                    window.requestAnimationFrame(function() {
                      instance.scroll.x += delta / scrollRatio;
                    });
                  }

                  function stop() {
                    el.classList.remove('sfta-ss-grabbed');
                    document.removeEventListener('mousemove', drag);
                    document.removeEventListener('mouseup', stop);
                  }
                }
                var t = this;
                window.scroll = {
                    x: 0,
                    y: 0
                },
                $document.on("trigger.Header", function(t) {
                    "enter" === t.way ? $html.removeClass("has-header-sticky") : $html.addClass("has-header-sticky")
                }),
                setTimeout(function() {
                    t.scrollManager = new _default$8({
                        container: t.$el,
                        selector: ".js-animate",
                        smooth: !0,
                        smoothMobile: !1,
                        mobileContainer: $document,
                        getDirection: !1,
                        getSpeed: !1,
                        inertia: 1,
                        reversed: !0,
                        scrollbarClass:'o-scrollbar',
                        onScroll: function(instance) {
                            $document.triggerHandler({
                                type: EVENT$5.UPDATE_SCROLL
                            })

                            moveBar(instance);
                        }
                    });
                    var e = location.hash;
                    0 < $(e).length && $document.triggerHandler({
                        type: "scrollTo.LocomotiveScroll",
                        options: {
                            targetElem: $(e),
                            offset: 60
                        }
                    })
                    // dragDealer(document.querySelector('.o-scrollbar_thumb'), t.scrollManager.instance.instance);
                }, 500)
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.scrollManager.destroy()
            }
        }]),
        e
    }()
      , MODULE_NAME$2 = "Slider"
      , EVENT_NAMESPACE$2 = "".concat(APP_NAME, ".").concat(MODULE_NAME$2)
      , EVENT$6 = {
        CLICK: "click.".concat(EVENT_NAMESPACE$2),
        MOUSEENTER: "mouseenter.".concat(EVENT_NAMESPACE$2),
        MOUSELEAVE: "mouseleave.".concat(EVENT_NAMESPACE$2),
        MOUSEMOVE: "mousemove.".concat(EVENT_NAMESPACE$2)
    }
      , CLASS = {
        ACTIVE: "is-active",
        OUT: "is-out"
    }
      , _default$b = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).$slider = $(".js-slider", n.$el),
            n.length = $(n.$slider[0]).find(".js-slider-item").length,
            n.$cursor = $(".js-cursor", n.$el),
            n.index = 0,
            n.isLeaving = !1,
            n.isHover = !1,
            n.mouse = {
                x: 0,
                y: n.$el.height() / 4
            },
            n.realMouse = {
                x: 0,
                y: n.$el.height() / 4
            },
            n.$cursor.css({
                "-webkit-transform": "translate3d(".concat(n.mouse.x, "px, ").concat(n.mouse.y, "px, 0px)"),
                "-ms-transform": "translate3d(".concat(n.mouse.x, "px, ").concat(n.mouse.y, "px, 0px)"),
                transform: "translate3d(".concat(n.mouse.x, "px, ").concat(n.mouse.y, "px, 0px)")
            }),
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.isAvailable = !0,
                this.$el.on(EVENT$6.CLICK, function(e) {
                    if (t.isAvailable) {
                        t.index < t.length - 1 ? t.index++ : t.index = 0,
                        t.isAvailable = !1;
                        for (var n = function() {
                            var e = $(t.$slider[i]).find(".js-slider-item");
                            e.removeClass(CLASS.OUT),
                            e.filter(".".concat(CLASS.ACTIVE)).addClass(CLASS.OUT).removeClass(CLASS.ACTIVE),
                            e.eq(t.index).addClass(CLASS.ACTIVE),
                            setTimeout(function() {
                                t.isAvailable = !0,
                                e.filter(".".concat(CLASS.OUT)).removeClass(CLASS.OUT)
                            }, 1e3)
                        }, i = t.$slider.length - 1; 0 <= i; i--)
                            n()
                    }
                }),
                window.isMobile || (this.$el.on(EVENT$6.MOUSEENTER, function() {
                    return t.mouseenter()
                }),
                this.$el.on(EVENT$6.MOUSELEAVE, function() {
                    return t.mouseleave()
                }),
                $window.on(EVENT$6.MOUSEMOVE, function(e) {
                    return t.mousemove(e)
                }),
                this.render())
            }
        }, {
            key: "mouseenter",
            value: function() {
                this.$el.addClass(CLASS.ISHOVER),
                this.isHover = !0
            }
        }, {
            key: "mouseleave",
            value: function() {
                var t = this;
                this.isLeaving = !0,
                this.isHover = !1,
                TweenMax.to(this.realMouse, 1, {
                    x: 0,
                    y: this.$el.height() / 4,
                    onComplete: function() {
                        t.isLeaving = !1,
                        t.$el.removeClass(CLASS.ISHOVER)
                    }
                })
            }
        }, {
            key: "mousemove",
            value: function(t) {
                this.isHover && (this.realMouse = {
                    x: t.clientX - this.$el.offset().left - this.$el.width() / 2,
                    y: t.clientY - this.$el.offset().top - this.$el.height() / 2
                })
            }
        }, {
            key: "render",
            value: function() {
                var t = this;
                this.raf = requestAnimationFrame(function() {
                    return t.render()
                }),
                (this.isHover || this.isLeaving) && (this.mouse.x = this.lerp(this.mouse.x, this.realMouse.x, .2),
                this.mouse.y = this.lerp(this.mouse.y, this.realMouse.y, .2),
                this.$cursor.css({
                    "-webkit-transform": "translate3d(".concat(this.mouse.x, "px, ").concat(this.mouse.y, "px, 0px)"),
                    "-ms-transform": "translate3d(".concat(this.mouse.x, "px, ").concat(this.mouse.y, "px, 0px)"),
                    transform: "translate3d(".concat(this.mouse.x, "px, ").concat(this.mouse.y, "px, 0px)")
                }))
            }
        }, {
            key: "lerp",
            value: function(t, e, n) {
                return (1 - n) * t + n * e
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                cancelAnimationFrame(this.raf),
                this.$el.off(".".concat(EVENT_NAMESPACE$2)),
                $window.off(".".concat(EVENT_NAMESPACE$2))
            }
        }]),
        e
    }()
      , MODULE_NAME$3 = "SplittedText"
      , EVENT_NAMESPACE$3 = "".concat(APP_NAME, ".").concat(MODULE_NAME$3)
      , _default$c = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this.$el.text().split("");
                this.$el.html("");
                for (var e = 0; e < t.length; e++)
                    this.$el.html("".concat(this.$el.html(), "<span>").concat(t[e], "</span>"))
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$3))
            }
        }]),
        e
    }()
      , MODULE_NAME$4 = "BrandList"
      , EVENT_NAMESPACE$4 = "".concat(APP_NAME, ".").concat(MODULE_NAME$4)
      , EVENT$7 = {
        CLICK: "click.".concat(EVENT_NAMESPACE$4),
        MOUSEENTER: "mouseenter.".concat(EVENT_NAMESPACE$4),
        MOUSELEAVE: "mouseleave.".concat(EVENT_NAMESPACE$4)
    }
      , CLASS$1 = {
        ACTIVE: "is-active"
    }
      , _default$d = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).$links = $(".js-link", n.$el),
            n.$backgrounds = $(".js-background", n.$el),
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                if (window.isMobile)
                    return !1;
                this.$el.on(EVENT$7.MOUSEENTER, ".js-link", function(e) {
                    var n = $(e.currentTarget).attr("data-id");
                    t.$backgrounds.filter("[data-id=".concat(n, "]")).addClass(CLASS$1.ACTIVE),
                    t.$el.addClass(CLASS$1.ACTIVE)
                }),
                this.$el.on(EVENT$7.MOUSELEAVE, ".js-link", function(e) {
                    var n = $(e.currentTarget).attr("data-id");
                    t.$backgrounds.filter("[data-id=".concat(n, "]")).removeClass(CLASS$1.ACTIVE),
                    t.$el.removeClass(CLASS$1.ACTIVE)
                })
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$4))
            }
        }]),
        e
    }()
      , MODULE_NAME$5 = "Rail"
      , EVENT_NAMESPACE$5 = "".concat(APP_NAME, ".").concat(MODULE_NAME$5)
      , _default$e = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).$wrapper = n.$el,
            n.speed = t["rail-speed"],
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                this.setClasses(),
                this.wrapItem(),
                this.initializeElements(),
                this.fillScreen(),
                this.groupTrack(),
                this.duplicateGroup(),
                this.wrapGroup(),
                this.railMove = new _default$9({
                    $el: this.$wrapper,
                    el: this.$wrapper[0]
                }),
                this.railMove.init(this.$wrapper, this.speed);
                768 < window.innerWidth ? this.railMove.setContainerWidth(this.groupTrackBCR.height) : this.railMove.setContainerWidth(this.groupTrackBCR.width)
                var t = this;
            }
        }, {
            key: "setClasses",
            value: function() {
                this.$wrapper.toggleClass("c-rail_wrapper"),
                this.$wrapper.find("> div").toggleClass("c-rail_item")
            }
        }, {
            key: "wrapItem",
            value: function() {
                var t = '<div class="c-rail_track">' + this.$wrapper[0].innerHTML + "</div>";
                this.$wrapper[0].innerHTML = t
            }
        }, {
            key: "initializeElements",
            value: function() {
                this.$item = this.$wrapper.find(".c-rail_item"),
                this.$track = this.$wrapper.find(".c-rail_track"),
                this.$container = this.$wrapper.find(".c-rail_container")
            }
        }, {
            key: "fillScreen",
            value: function() {
                var t;
                t = 768 < window.innerWidth ? window.innerHeight / this.$track[0].getBoundingClientRect().height : window.innerWidth / this.$track[0].getBoundingClientRect().width;
                for (var e = 0; e < t; e++)
                    this.$wrapper.append(this.$track[0].outerHTML)
            }
        }, {
            key: "groupTrack",
            value: function() {
                var t = '<div class="c-rail_track-container">' + this.$wrapper[0].innerHTML + "</div>";
                this.$wrapper[0].innerHTML = t,
                this.$groupTracks = this.$wrapper.find(".c-rail_track-container"),
                this.groupTrackBCR = this.$groupTracks[0].getBoundingClientRect()
            }
        }, {
            key: "updateValues",
            value: function() {
                this.$groupTracks = this.$wrapper.find(".c-rail_track-container")
                this.groupTrackBCR = this.$groupTracks[0].getBoundingClientRect()
                768 < window.innerWidth ? this.railMove.setContainerWidth(this.groupTrackBCR.height) : this.railMove.setContainerWidth(this.groupTrackBCR.width)
            }
        }, {
            key: "duplicateGroup",
            value: function() {
                this.$wrapper.append(this.$groupTracks[0].outerHTML)
            }
        }, {
            key: "wrapGroup",
            value: function() {
                var t = '<div class="c-rail_group-container">' + this.$wrapper[0].innerHTML + "</div>";
                this.$wrapper[0].innerHTML = t,
                this.$groupContainer = this.$wrapper.find(".c-rail_group-container")
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$5)),
                this.railMove.destroy()
            }
        }]),
        e
    }()
      , MODULE_NAME$6 = "NavButton"
      , EVENT_NAMESPACE$6 = "".concat(APP_NAME, ".").concat(MODULE_NAME$6)
      , EVENT$8 = {
        CLICK: "click.".concat(EVENT_NAMESPACE$6)
    }
      , CLASS$2 = {
        HTMLOPEN: "has-nav-open",
        OPEN: "is-open"
    }
      , _default$f = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.$el.on(EVENT$8.CLICK, function(e) {
                    $html.toggleClass(CLASS$2.HTMLOPEN),
                    t.$el.parent().toggleClass(CLASS$2.OPEN)
                })
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$6))
            }
        }]),
        e
    }()
      , MODULE_NAME$7 = "Preloader"
      , EVENT_NAMESPACE$7 = "".concat(APP_NAME, ".").concat(MODULE_NAME$7)
      , _default$g = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                bodymovin.loadAnimation({
                    container: this.el,
                    path: window.hsData.loaderUrl,
                    renderer: "svg",
                    loop: !1,
                    autoplay: !0,
                    name: "preloader"
                })
            }
        }, {
            key: "destroy",
            value: function() {
                console.log("❌ [module]:destroy - Preloader"),
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$7))
            }
        }]),
        e
    }()
      , MODULE_NAME$8 = "Form"
      , EVENT_NAMESPACE$8 = "".concat(APP_NAME, ".").concat(MODULE_NAME$8)
      , EVENT$9 = {
        CLICK: "click.".concat(EVENT_NAMESPACE$8),
        FOCUS: "focus.".concat(EVENT_NAMESPACE$8),
        INPUT: "input.".concat(EVENT_NAMESPACE$8),
        CHANGE: "change.".concat(EVENT_NAMESPACE$8),
        UPDATE_SELECT: "updateSelect.".concat(EVENT_NAMESPACE$8),
        SUBMIT: "submit.".concat(EVENT_NAMESPACE$8)
    }
      , SELECTOR = {
        CAPTCHA: ".js-captcha",
        FILEVALUE: ".js-file-value",
        FORM: ".js-form",
        INPUT: ".js-input",
        INPUTPARENT: ".js-input-parent",
        SELECT: ".js-select-jobs",
        SUBMIT: ".js-submit"
    }
      , CLASS$3 = {
        ERROR: "has-error",
        FILL: "-fill",
        BUSY: "is-busy",
        SENDING: "is-sending"
    }
      , _default$h = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).isSubmitting = !1,
            n.isTransmitting = !1,
            n.contentType = "application/x-www-form-urlencoded; charset=UTF-8",
            n.processData = !0,
            n.usingFormData = !1,
            n.captchaId = null,
            n.hasCaptcha = window.grecaptcha && window.hsData.recaptcha.siteKey,
            n.isCaptchaRendered = !1,
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.$form = $(SELECTOR.FORM, this.$el),
                this.$submit = $(SELECTOR.SUBMIT, this.$el),
                this.$inputs = $(SELECTOR.INPUT, this.$el),
                this.$select = $(SELECTOR.SELECT, this.$el),
                this.$preSubmit = $(".js-pre-submit", this.$el),
                this.$postSubmit = $(".js-post-submit", this.$el),
                this.$captcha = $(SELECTOR.CAPTCHA, this.$el),
                this.$el.on(EVENT$9.CHANGE, SELECTOR.INPUT, function(e) {
                    return t.onInputChange(e)
                }),
                this.$el.on(EVENT$9.FOCUS, SELECTOR.INPUT, function(e) {
                    return t.onInputFocus(e)
                }),
                this.$el.on(EVENT$9.SUBMIT, SELECTOR.FORM, function(e) {
                    return t.onSubmit(e)
                }),
                $document.on(EVENT$9.UPDATE_SELECT, function(e) {
                    return t.updateSelect(e)
                })
            }
        }, {
            key: "updateSelect",
            value: function(t) {
                this.$select.val(t.options.value)
            }
        }, {
            key: "onInputChange",
            value: function(t) {
                var e = $(t.currentTarget);
                0 < e.val().length ? e.addClass(CLASS$3.FILL) : e.removeClass(CLASS$3.FILL),
                "file" === e.prop("type") && (this.contentType = !1,
                this.processData = !1,
                this.usingFormData = !0,
                e.parent().find(SELECTOR.FILEVALUE).text(e.val().replace("C:\\fakepath\\", "")))
            }
        }, {
            key: "onInputFocus",
            value: function(t) {
                !this.isCaptchaRendered && this.hasCaptcha && (this.captchaId = window.grecaptcha.render(this.$captcha.get(0)),
                this.isCaptchaRendered = !0)
            }
        }, {
            key: "onSubmit",
            value: function(t) {
                if (t.preventDefault(),
                t.stopPropagation(),
                this.isSubmitting = !0,
                this.$el.addClass(CLASS$3.BUSY),
                t.currentTarget.reportValidity && !1 === t.currentTarget.reportValidity())
                    return this.postSubmit(),
                    !1;
                this.sendData()
            }
        }, {
            key: "postSubmit",
            value: function() {
                this.isTransmitting = !1,
                this.isSubmitting = !1,
                this.$el.removeClass(CLASS$3.BUSY)
            }
        }, {
            key: "resetCaptcha",
            value: function() {
                window.grecaptcha && null !== this.captchaId && window.grecaptcha.reset(this.captchaId)
            }
        }, {
            key: "sendData",
            value: function() {
                var t = this;
                if (!this.isTransmitting) {
                    this.isTransmitting = !0,
                    this.$el.addClass(CLASS$3.SENDING),
                    $(".".concat(CLASS$3.ERROR), this.$form).removeClass(CLASS$3.ERROR);
                    var e = this.usingFormData ? new FormData(this.$form.get(0)) : this.$form.serialize();
                    setTimeout(function() {
                        $.ajax({
                            url: t.$form.data("action") || t.$form.prop("action"),
                            method: t.$form.prop("method") || "POST",
                            contentType: t.contentType,
                            processData: t.processData,
                            dataType: "json",
                            data: e
                        }).done($.proxy(t.onAjaxDone, t)).fail($.proxy(t.onAjaxFail, t)).always(function() {
                            setTimeout(function() {
                                return t.postSubmit()
                            }, 600)
                        })
                    }, 600)
                }
            }
        }, {
            key: "onAjaxDone",
            value: function(t, e, n) {
                var i = this;
                !0 === t.success ? 0 < this.$preSubmit.length && 0 < this.$postSubmit.length && (t.results = t.results || {},
                this.$preSubmit.fadeOut(function() {
                    i.$postSubmit.fadeIn()
                })) : this.onAjaxFail(n, e, "Bad Request")
            }
        }, {
            key: "onAjaxFail",
            value: function(t, e, n) {
                var i = []
                  , r = !1
                  , o = {};
                try {
                    if (t && t.responseJSON && (o = t.responseJSON),
                    !($.isArray(o.errors) && 0 < o.errors.length))
                        throw new Error("Bad Response");
                    i = o.errors
                } catch (t) {
                    r = !0
                }
                r && this.fatalErrorCount++,
                0 === i.length && (3 < this.fatalErrorCount ? i.push({
                    message: hsData.l10n.errorTryLater
                }) : i.push({
                    message: hsData.l10n.errorTryAgain
                })),
                this.manageErrors(i),
                console.group("Something went wrong with the request (fail, ".concat(e, ")")),
                console.log(o),
                console.log(e),
                console.groupEnd()
            }
        }, {
            key: "manageErrors",
            value: function(t) {
                for (var e = 0, n = t.length; e < n; e++) {
                    var i = t[e].property || null;
                    t[e].message && i && $('[name="'.concat(i, '"]'), this.$form).parents(SELECTOR.INPUTPARENT).eq(0).addClass(CLASS$3.ERROR)
                }
                this.resetCaptcha()
            }
        }, {
            key: "destroy",
            value: function() {
                this.resetCaptcha(),
                this.$el.off(".".concat(EVENT_NAMESPACE$8)),
                $document.off(".".concat(EVENT_NAMESPACE$8)),
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this)
            }
        }]),
        e
    }()
      , MODULE_NAME$9 = "Popup"
      , EVENT_NAMESPACE$9 = "".concat(APP_NAME, ".").concat(MODULE_NAME$9)
      , EVENT$a = {
        CLICK: "click.".concat(EVENT_NAMESPACE$9),
        OPEN: "open.".concat(EVENT_NAMESPACE$9),
        CLOSE: "close.".concat(EVENT_NAMESPACE$9),
        KEYUP: "keyup.".concat(EVENT_NAMESPACE$9)
    }
      , CLASS$4 = {
        OPEN: "has-popup-open"
    }
      , _default$i = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).$content = $(".js-content", n.$el),
            n.$close = $(".js-close", n.$el),
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                $document.on(EVENT$a.OPEN, function(e) {
                    return t.open(e)
                }),
                $document.on(EVENT$a.CLOSE, function() {
                    return t.close()
                }),
                this.$el.on(EVENT$a.CLICK, ".js-close", function() {
                    return t.close()
                }),
                this.$el.on(EVENT$a.CLICK, ".js-popup-apply", function(e) {
                    return t.apply(e)
                }),
                $document.on(EVENT$a.KEYUP, function(e) {
                    27 === e.keyCode && t.close()
                })
            }
        }, {
            key: "open",
            value: function(t) {
                var e = t.options.content;
                this.$content.html(e.html()),
                setTimeout(function() {
                    $html.addClass(CLASS$4.OPEN)
                }, 100)
            }
        }, {
            key: "close",
            value: function() {
                var t = this;
                $html.removeClass(CLASS$4.OPEN),
                setTimeout(function() {
                    t.$content.html("")
                }, 800)
            }
        }, {
            key: "apply",
            value: function(t) {
                t.preventDefault();
                var e = $(t.currentTarget);
                this.close(),
                $document.triggerHandler({
                    type: "scrollTo.LocomotiveScroll",
                    options: {
                        targetElem: $("#form"),
                        offset: 60
                    }
                }),
                $document.triggerHandler({
                    type: EVENT$9.UPDATE_SELECT,
                    options: {
                        value: e.attr("data-job-id")
                    }
                })
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$9))
            }
        }]),
        e
    }()
      , MODULE_NAME$a = "Job"
      , EVENT_NAMESPACE$a = "".concat(APP_NAME, ".").concat(MODULE_NAME$a)
      , EVENT$b = {
        CLICK: "click.".concat(EVENT_NAMESPACE$a)
    }
      , _default$j = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).isActive = !1,
            "string" == typeof n.$el.attr("data-current") && (n.isActive = !0),
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.isActive && $document.triggerHandler({
                    type: EVENT$a.OPEN,
                    options: {
                        content: this.$el.find(".js-content")
                    }
                }),
                this.$el.on(EVENT$b.CLICK, ".js-button", function(e) {
                    history.pushState({}, t.$el.attr("data-title"), t.$el.attr("data-url")),
                    $document.triggerHandler({
                        type: EVENT$a.OPEN,
                        options: {
                            content: t.$el.find(".js-content")
                        }
                    })
                }),
                this.$el.on(EVENT$b.CLICK, ".js-apply", function(e) {
                    e.preventDefault(),
                    $document.triggerHandler({
                        type: "scrollTo.LocomotiveScroll",
                        options: {
                            targetElem: $("#form"),
                            offset: parseInt(60)
                        }
                    }),
                    $document.triggerHandler({
                        type: EVENT$9.UPDATE_SELECT,
                        options: {
                            value: t.$el.attr("id")
                        }
                    })
                })
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$a))
            }
        }]),
        e
    }()
      , MODULE_NAME$b = "Page"
      , EVENT_NAMESPACE$b = "".concat(APP_NAME, ".").concat(MODULE_NAME$b)
      , EVENT$c = {
        CLICK: "click.".concat(EVENT_NAMESPACE$b)
    }
      , _default$k = function(t) {
        function e(t) {
            var n;
            return _classCallCheck(this, e),
            (n = _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))).$content = $(".js-content", n.$el),
            n.isActive = !1,
            "string" == typeof n.$el.attr("data-current") && (n.isActive = !0),
            n
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = this;
                this.isActive && $document.triggerHandler({
                    type: EVENT$a.OPEN,
                    options: {
                        content: this.$content
                    }
                }),
                this.$el.on(EVENT$c.CLICK, function(e) {
                    history.pushState({}, t.$el.attr("data-title"), t.$el.attr("data-url")),
                    $document.triggerHandler({
                        type: EVENT$a.OPEN,
                        options: {
                            content: t.$content
                        }
                    })
                })
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$b))
            }
        }]),
        e
    }()
      , MODULE_NAME$c = "Carousel"
      , EVENT_NAMESPACE$c = "".concat(APP_NAME, ".").concat(MODULE_NAME$c)
      , _default$l = function(t) {
        function e(t) {
            return _classCallCheck(this, e),
            _possibleConstructorReturn(this, _getPrototypeOf(e).call(this, t))
        }
        return _inherits(e, _default$3),
        _createClass(e, [{
            key: "init",
            value: function() {
                var t = !1
                  , e = !1;
                this.$carouselSlides = this.$el.find(".js-carousel-slide"),
                1 < this.$carouselSlides.length && (t = {
                    delay: 5e3,
                    disableOnInteraction: !1
                },
                e = !0),
                this.carousel = new Swiper(".js-carousel",{
                    speed: 800,
                    grabCursor: !0,
                    mousewheel: !1,
                    loop: e,
                    autoplay: t
                }),
                this.contentCarousel = new Swiper(".js-carousel-content",{
                    grabCursor: !0,
                    mousewheel: !1,
                    autoplay: !1,
                    loop: e
                }),
                this.carousel.controller.control = this.contentCarousel,
                this.contentCarousel.controller.control = this.carousel
            }
        }, {
            key: "destroy",
            value: function() {
                _get(_getPrototypeOf(e.prototype), "destroy", this).call(this),
                this.$el.off(".".concat(EVENT_NAMESPACE$c))
            }
        }]),
        e
    }()
      , modules = Object.freeze({
        Scroll: _default$a,
        Slider: _default$b,
        SplittedText: _default$c,
        BrandList: _default$d,
        Rail: _default$e,
        NavButton: _default$f,
        Preloader: _default$g,
        Form: _default$h,
        Popup: _default$i,
        Job: _default$j,
        Page: _default$k,
        Carousel: _default$l
    })
      , MODULE_NAME$d = "App"
      , EVENT_NAMESPACE$d = "".concat(APP_NAME, ".").concat(MODULE_NAME$d)
      , EVENT$d = {
        INIT_MODULES: "initModules.".concat(EVENT_NAMESPACE$d),
        INIT_SCOPED_MODULES: "initScopedModules.".concat(EVENT_NAMESPACE$d),
        DELETE_SCOPED_MODULES: "deleteScopedModules.".concat(EVENT_NAMESPACE$d)
    }
      , App = function() {
        function t() {
            var e = this;
            _classCallCheck(this, t),
            this.modules = modules,
            this.currentModules = [],
            $document.on(EVENT$d.INIT_MODULES, function(t) {
                e.initGlobals(t.firstBlood).deleteModules(t).initModules(t)
            }),
            $document.on(EVENT$d.INIT_SCOPED_MODULES, function(t) {
                e.initGlobals(t.firstBlood),
                e.initModules(t)
            }),
            $document.on(EVENT$d.DELETE_SCOPED_MODULES, function(t) {
                e.deleteModules(t)
            })
        }
        return _createClass(t, [{
            key: "deleteModules",
            value: function(t) {
                var e = !0
                  , n = [];
                if (t.$scope instanceof jQuery && 0 < t.$scope.length) {
                    var i = t.$scope.find("[data-module]");
                    if (!(0 < (n = $.makeArray(i.map(function(t) {
                        return i.eq(t).data("uid")
                    }))).length))
                        return this;
                    e = !1
                }
                for (var r = this.currentModules.length; r--; )
                    (e || arrayContains(n, this.currentModules[r].uid)) && (removeFromArray(n, this.currentModules[r].uid),
                    this.currentModules[r].destroy(),
                    this.currentModules.splice(r));
                return this
            }
        }, {
            key: "initGlobals",
            value: function(t) {
                return globals(t),
                this
            }
        }, {
            key: "initModules",
            value: function(t) {
                // console.log(999);
                var e = [];
                t.firstBlood ? e = $document.find("[data-module]") : t.$scope instanceof jQuery && 0 < t.$scope.length ? e = t.$scope.find("[data-module]") : t.isPjax && (e = $pjaxWrapper.find("[data-module]"));
                for (var n = 0, i = e.length; n < i; n++) {
                    var r = e[n]
                      , o = getNodeData(r);
                    o.el = r,
                    o.$el = e.eq(n);
                    for (var s = o.module.split(/[,\s]+/g), a = 0, l = s.length; a < l; a++) {
                        var c = s[a];
                        if ("function" == typeof this.modules[c]) {
                            var u = new this.modules[c](o);
                            this.currentModules.push(u),
                            u.init()
                        }
                    }
                }
                var tt = this;
                $(window).resize(function(){
                    if(window.isMobile) {
                        rails.forEach(function(curr, i){
                            tt.currentModules[i+1].railMove.getBCR();
                            tt.currentModules[i+1].updateValues();
                        })
                    }
                })
                return this
            }
        }]),
        t
    }();
    return new App,
    $document.triggerHandler({
        type: EVENT$d.INIT_MODULES,
        firstBlood: !0
    }),
    exports.EVENT = EVENT$d,
    exports
}({});
