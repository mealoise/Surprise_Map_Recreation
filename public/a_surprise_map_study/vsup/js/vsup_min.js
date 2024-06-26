(function(t, e) {
	"object" == typeof exports && "undefined" != typeof module
		? e(exports)
		: "function" == typeof define && define.amd
			? define(["exports"], e)
			: e((t.vsup = {}));
})(this, function(t) {
	"use strict";
	function n(t, e) {
		return t < e ? -1 : e < t ? 1 : e <= t ? 0 : NaN;
	}
	var f,
		r,
		o = (
			1 === (f = n).length &&
				(
					(r = f),
					(f = function(t, e) {
						return n(r(t), e);
					})
				),
			{
				left: function(t, e, n, r) {
					for (null == n && (n = 0), null == r && (r = t.length); n < r; ) {
						var a = (n + r) >>> 1;
						f(t[a], e) < 0 ? (n = a + 1) : (r = a);
					}
					return n;
				},
				right: function(t, e, n, r) {
					for (null == n && (n = 0), null == r && (r = t.length); n < r; ) {
						var a = (n + r) >>> 1;
						0 < f(t[a], e) ? (r = a) : (n = a + 1);
					}
					return n;
				}
			}
		).right;
	function C(t, e, n) {
		(t = +t), (e = +e), (n = (a = arguments.length) < 2 ? ((e = t), (t = 0), 1) : a < 3 ? 1 : +n);
		for (
			var r = -1, a = 0 | Math.max(0, Math.ceil((e - t) / n)), f = new Array(a);
			++r < a;

		)
			f[r] = t + r * n;
		return f;
	}
	var m = Math.sqrt(50),
		_ = Math.sqrt(10),
		w = Math.sqrt(2);
	function u(t, e, n) {
		var r = (e - t) / Math.max(0, n),
			a = Math.floor(Math.log(r) / Math.LN10),
			f = r / Math.pow(10, a);
		return 0 <= a
			? (m <= f ? 10 : _ <= f ? 5 : w <= f ? 2 : 1) * Math.pow(10, a)
			: -Math.pow(10, -a) / (m <= f ? 10 : _ <= f ? 5 : w <= f ? 2 : 1);
	}
	var a = Array.prototype.slice;
	function N(t) {
		return t;
	}
	var k = 1,
		P = 2,
		D = 3,
		U = 4,
		S = 1e-6;
	function i(t) {
		return "translate(" + (t + 0.5) + ",0)";
	}
	function c(t) {
		return "translate(0," + (t + 0.5) + ")";
	}
	function z() {
		return !this.__axis;
	}
	function x(p, g) {
		var y = [],
			v = null,
			m = null,
			_ = 6,
			w = 6,
			x = 3,
			M = p === k || p === U ? -1 : 1,
			A = p === U || p === P ? "x" : "y",
			T = p === k || p === D ? i : c;
		function e(t) {
			var e = null == v ? (g.ticks ? g.ticks.apply(g, y) : g.domain()) : v,
				n = null == m ? (g.tickFormat ? g.tickFormat.apply(g, y) : N) : m,
				r = Math.max(_, 0) + x,
				a = g.range(),
				f = +a[0] + 0.5,
				i = +a[a.length - 1] + 0.5,
				c = (g.bandwidth
					? function(e) {
							var n = Math.max(0, e.bandwidth() - 1) / 2;
							return e.round() && (n = Math.round(n)), function(t) {
								return +e(t) + n;
							};
						}
					: function(e) {
							return function(t) {
								return +e(t);
							};
						})(g.copy()),
				o = t.selection ? t.selection() : t,
				u = o.selectAll(".domain").data([null]),
				s = o.selectAll(".tick").data(e, g).order(),
				d = s.exit(),
				l = s.enter().append("g").attr("class", "tick"),
				h = s.select("line"),
				b = s.select("text");
			(u = u.merge(
				u
					.enter()
					.insert("path", ".tick")
					.attr("class", "domain")
					.attr("stroke", "#000")
			)), (s = s.merge(l)), (h = h.merge(l.append("line").attr("stroke", "#000").attr(A + "2", M * _))), (b = b.merge(l.append("text").attr("fill", "#000").attr(A, M * r).attr("dy", p === k ? "0em" : p === D ? "0.71em" : "0.32em"))), t !==
				o &&
				(
					(u = u.transition(t)),
					(s = s.transition(t)),
					(h = h.transition(t)),
					(b = b.transition(t)),
					(d = d
						.transition(t)
						.attr("opacity", S)
						.attr("transform", function(t) {
							return isFinite((t = c(t)))
								? T(t)
								: this.getAttribute("transform");
						})),
					l.attr("opacity", S).attr("transform", function(t) {
						var e = this.parentNode.__axis;
						return T(e && isFinite((e = e(t))) ? e : c(t));
					})
				), d.remove(), u.attr("d", p === U || p == P ? "M" + M * w + "," + f + "H0.5V" + i + "H" + M * w : "M" + f + "," + M * w + "V0.5H" + i + "V" + M * w), s.attr("opacity", 1).attr("transform", function(t) {
				return T(c(t));
			}), h.attr(
				A + "2",
				M * _
			), b.attr(A, M * r).text(n), o.filter(z).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", p === P ? "start" : p === U ? "end" : "middle"), o.each(
				function() {
					this.__axis = c;
				}
			);
		}
		return (e.scale = function(t) {
			return arguments.length ? ((g = t), e) : g;
		}), (e.ticks = function() {
			return (y = a.call(arguments)), e;
		}), (e.tickArguments = function(t) {
			return arguments.length
				? ((y = null == t ? [] : a.call(t)), e)
				: y.slice();
		}), (e.tickValues = function(t) {
			return arguments.length
				? ((v = null == t ? null : a.call(t)), e)
				: v && v.slice();
		}), (e.tickFormat = function(t) {
			return arguments.length ? ((m = t), e) : m;
		}), (e.tickSize = function(t) {
			return arguments.length ? ((_ = w = +t), e) : _;
		}), (e.tickSizeInner = function(t) {
			return arguments.length ? ((_ = +t), e) : _;
		}), (e.tickSizeOuter = function(t) {
			return arguments.length ? ((w = +t), e) : w;
		}), (e.tickPadding = function(t) {
			return arguments.length ? ((x = +t), e) : x;
		}), e;
	}
	function E(t) {
		return x(P, t);
	}
	var s = { value: function() {} };
	function e() {
		for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) {
			if (!(t = arguments[e] + "") || t in r)
				throw new Error("illegal type: " + t);
			r[t] = [];
		}
		return new d(r);
	}
	function d(t) {
		this._ = t;
	}
	function l(t, e) {
		for (var n, r = 0, a = t.length; r < a; ++r)
			if ((n = t[r]).name === e) return n.value;
	}
	function h(t, e, n) {
		for (var r = 0, a = t.length; r < a; ++r)
			if (t[r].name === e) {
				(t[r] = s), (t = t.slice(0, r).concat(t.slice(r + 1)));
				break;
			}
		return null != n && t.push({ name: e, value: n }), t;
	}
	d.prototype = e.prototype = {
		constructor: d,
		on: function(t, e) {
			var n,
				r,
				a = this._,
				f = (
					(r = a),
					(t + "").trim().split(/^|\s+/).map(function(t) {
						var e = "",
							n = t.indexOf(".");
						if (
							(
								0 <= n && ((e = t.slice(n + 1)), (t = t.slice(0, n))),
								t && !r.hasOwnProperty(t)
							)
						)
							throw new Error("unknown type: " + t);
						return { type: t, name: e };
					})
				),
				i = -1,
				c = f.length;
			if (!(arguments.length < 2)) {
				if (null != e && "function" != typeof e)
					throw new Error("invalid callback: " + e);
				for (; ++i < c; )
					if ((n = (t = f[i]).type)) a[n] = h(a[n], t.name, e);
					else if (null == e) for (n in a) a[n] = h(a[n], t.name, null);
				return this;
			}
			for (; ++i < c; )
				if ((n = (t = f[i]).type) && (n = l(a[n], t.name))) return n;
		},
		copy: function() {
			var t = {},
				e = this._;
			for (var n in e) t[n] = e[n].slice();
			return new d(t);
		},
		call: function(t, e) {
			if (0 < (n = arguments.length - 2))
				for (var n, r, a = new Array(n), f = 0; f < n; ++f)
					a[f] = arguments[f + 2];
			if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
			for (f = 0, n = (r = this._[t]).length; f < n; ++f)
				r[f].value.apply(e, a);
		},
		apply: function(t, e, n) {
			if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
			for (var r = this._[t], a = 0, f = r.length; a < f; ++a)
				r[a].value.apply(e, n);
		}
	};
	var b = "http://www.w3.org/1999/xhtml",
		p = {
			svg: "http://www.w3.org/2000/svg",
			xhtml: b,
			xlink: "http://www.w3.org/1999/xlink",
			xml: "http://www.w3.org/XML/1998/namespace",
			xmlns: "http://www.w3.org/2000/xmlns/"
		};
	function g(t) {
		var e = (t += ""),
			n = e.indexOf(":");
		return 0 <= n &&
			"xmlns" !== (e = t.slice(0, n)) &&
			(t = t.slice(n + 1)), p.hasOwnProperty(e) ? { space: p[e], local: t } : t;
	}
	function y(t) {
		var e = g(t);
		return (e.local
			? function(t) {
					return function() {
						return this.ownerDocument.createElementNS(t.space, t.local);
					};
				}
			: function(n) {
					return function() {
						var t = this.ownerDocument,
							e = this.namespaceURI;
						return e === b && t.documentElement.namespaceURI === b
							? t.createElement(n)
							: t.createElementNS(e, n);
					};
				})(e);
	}
	function v() {}
	function M(t) {
		return null == t
			? v
			: function() {
					return this.querySelector(t);
				};
	}
	function A() {
		return [];
	}
	function T(t) {
		return null == t
			? A
			: function() {
					return this.querySelectorAll(t);
				};
	}
	var F = function(t) {
		return function() {
			return this.matches(t);
		};
	};
	if ("undefined" != typeof document) {
		var q = document.documentElement;
		if (!q.matches) {
			var Y =
				q.webkitMatchesSelector ||
				q.msMatchesSelector ||
				q.mozMatchesSelector ||
				q.oMatchesSelector;
			F = function(t) {
				return function() {
					return Y.call(this, t);
				};
			};
		}
	}
	var I = F;
	function L(t) {
		return new Array(t.length);
	}
	function H(t, e) {
		(this.ownerDocument =
			t.ownerDocument), (this.namespaceURI = t.namespaceURI), (this._next = null), (this._parent = t), (this.__data__ = e);
	}
	H.prototype = {
		constructor: H,
		appendChild: function(t) {
			return this._parent.insertBefore(t, this._next);
		},
		insertBefore: function(t, e) {
			return this._parent.insertBefore(t, e);
		},
		querySelector: function(t) {
			return this._parent.querySelector(t);
		},
		querySelectorAll: function(t) {
			return this._parent.querySelectorAll(t);
		}
	};
	var O = "$";
	function j(t, e, n, r, a, f) {
		for (var i, c = 0, o = e.length, u = f.length; c < u; ++c)
			(i = e[c]) ? ((i.__data__ = f[c]), (r[c] = i)) : (n[c] = new H(t, f[c]));
		for (; c < o; ++c) (i = e[c]) && (a[c] = i);
	}
	function R(t, e, n, r, a, f, i) {
		var c,
			o,
			u,
			s = {},
			d = e.length,
			l = f.length,
			h = new Array(d);
		for (c = 0; c < d; ++c)
			(o = e[c]) &&
				(
					(h[c] = u = O + i.call(o, o.__data__, c, e)),
					u in s ? (a[c] = o) : (s[u] = o)
				);
		for (c = 0; c < l; ++c)
			(o = s[(u = O + i.call(t, f[c], c, f))])
				? (((r[c] = o).__data__ = f[c]), (s[u] = null))
				: (n[c] = new H(t, f[c]));
		for (c = 0; c < d; ++c) (o = e[c]) && s[h[c]] === o && (a[c] = o);
	}
	function V(t, e) {
		return t < e ? -1 : e < t ? 1 : e <= t ? 0 : NaN;
	}
	function X(t) {
		return (
			(t.ownerDocument && t.ownerDocument.defaultView) ||
			(t.document && t) ||
			t.defaultView
		);
	}
	function $(t, e) {
		return (
			t.style.getPropertyValue(e) ||
			X(t).getComputedStyle(t, null).getPropertyValue(e)
		);
	}
	function Z(t) {
		return t.trim().split(/^|\s+/);
	}
	function G(t) {
		return t.classList || new B(t);
	}
	function B(t) {
		(this._node = t), (this._names = Z(t.getAttribute("class") || ""));
	}
	function Q(t, e) {
		for (var n = G(t), r = -1, a = e.length; ++r < a; ) n.add(e[r]);
	}
	function W(t, e) {
		for (var n = G(t), r = -1, a = e.length; ++r < a; ) n.remove(e[r]);
	}
	function J() {
		this.textContent = "";
	}
	function K() {
		this.innerHTML = "";
	}
	function tt() {
		this.nextSibling && this.parentNode.appendChild(this);
	}
	function et() {
		this.previousSibling &&
			this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}
	function nt() {
		return null;
	}
	function rt() {
		var t = this.parentNode;
		t && t.removeChild(this);
	}
	function at() {
		return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
	}
	function ft() {
		return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
	}
	B.prototype = {
		add: function(t) {
			this._names.indexOf(t) < 0 &&
				(
					this._names.push(t),
					this._node.setAttribute("class", this._names.join(" "))
				);
		},
		remove: function(t) {
			var e = this._names.indexOf(t);
			0 <= e &&
				(
					this._names.splice(e, 1),
					this._node.setAttribute("class", this._names.join(" "))
				);
		},
		contains: function(t) {
			return 0 <= this._names.indexOf(t);
		}
	};
	var it = {};
	"undefined" != typeof document &&
		("onmouseenter" in document.documentElement ||
			(it = { mouseenter: "mouseover", mouseleave: "mouseout" }));
	function ct(n, t, e) {
		return (n = ot(n, t, e)), function(t) {
			var e = t.relatedTarget;
			(e && (e === this || 8 & e.compareDocumentPosition(this))) ||
				n.call(this, t);
		};
	}
	function ot(e, n, r) {
		return function(t) {
			try {
				e.call(this, this.__data__, n, r);
			} finally {
			}
		};
	}
	function ut(f) {
		return function() {
			var t = this.__on;
			if (t) {
				for (var e, n = 0, r = -1, a = t.length; n < a; ++n)
					(e = t[n]), (f.type && e.type !== f.type) || e.name !== f.name
						? (t[++r] = e)
						: this.removeEventListener(e.type, e.listener, e.capture);
				++r ? (t.length = r) : delete this.__on;
			}
		};
	}
	function st(o, u, s) {
		var d = it.hasOwnProperty(o.type) ? ct : ot;
		return function(t, e, n) {
			var r,
				a = this.__on,
				f = d(u, e, n);
			if (a)
				for (var i = 0, c = a.length; i < c; ++i)
					if ((r = a[i]).type === o.type && r.name === o.name)
						return this.removeEventListener(
							r.type,
							r.listener,
							r.capture
						), this.addEventListener(
							r.type,
							(r.listener = f),
							(r.capture = s)
						), void (r.value = u);
			this.addEventListener(
				o.type,
				f,
				s
			), (r = { type: o.type, name: o.name, value: u, listener: f, capture: s }), a ? a.push(r) : (this.__on = [r]);
		};
	}
	function dt(t, e, n) {
		var r = X(t),
			a = r.CustomEvent;
		"function" == typeof a
			? (a = new a(e, n))
			: (
					(a = r.document.createEvent("Event")),
					n
						? (a.initEvent(e, n.bubbles, n.cancelable), (a.detail = n.detail))
						: a.initEvent(e, !1, !1)
				), t.dispatchEvent(a);
	}
	var lt = [null];
	function ht(t, e) {
		(this._groups = t), (this._parents = e);
	}
	function bt() {
		return new ht([[document.documentElement]], lt);
	}
	function pt(t, e, n) {
		(t.prototype = e.prototype = n), (n.constructor = t);
	}
	function gt(t, e) {
		var n = Object.create(t.prototype);
		for (var r in e) n[r] = e[r];
		return n;
	}
	function yt() {}
	ht.prototype = bt.prototype = {
		constructor: ht,
		select: function(t) {
			"function" != typeof t && (t = M(t));
			for (
				var e = this._groups, n = e.length, r = new Array(n), a = 0;
				a < n;
				++a
			)
				for (
					var f, i, c = e[a], o = c.length, u = (r[a] = new Array(o)), s = 0;
					s < o;
					++s
				)
					(f = c[s]) &&
						(i = t.call(f, f.__data__, s, c)) &&
						("__data__" in f && (i.__data__ = f.__data__), (u[s] = i));
			return new ht(r, this._parents);
		},
		selectAll: function(t) {
			"function" != typeof t && (t = T(t));
			for (
				var e = this._groups, n = e.length, r = [], a = [], f = 0;
				f < n;
				++f
			)
				for (var i, c = e[f], o = c.length, u = 0; u < o; ++u)
					(i = c[u]) && (r.push(t.call(i, i.__data__, u, c)), a.push(i));
			return new ht(r, a);
		},
		filter: function(t) {
			"function" != typeof t && (t = I(t));
			for (
				var e = this._groups, n = e.length, r = new Array(n), a = 0;
				a < n;
				++a
			)
				for (var f, i = e[a], c = i.length, o = (r[a] = []), u = 0; u < c; ++u)
					(f = i[u]) && t.call(f, f.__data__, u, i) && o.push(f);
			return new ht(r, this._parents);
		},
		data: function(t, e) {
			if (!t)
				return (b = new Array(this.size())), (s = -1), this.each(function(t) {
					b[++s] = t;
				}), b;
			var n,
				r = e ? R : j,
				a = this._parents,
				f = this._groups;
			"function" != typeof t &&
				(
					(n = t),
					(t = function() {
						return n;
					})
				);
			for (
				var i = f.length,
					c = new Array(i),
					o = new Array(i),
					u = new Array(i),
					s = 0;
				s < i;
				++s
			) {
				var d = a[s],
					l = f[s],
					h = l.length,
					b = t.call(d, d && d.__data__, s, a),
					p = b.length,
					g = (o[s] = new Array(p)),
					y = (c[s] = new Array(p));
				r(d, l, g, y, (u[s] = new Array(h)), b, e);
				for (var v, m, _ = 0, w = 0; _ < p; ++_)
					if ((v = g[_])) {
						for (w <= _ && (w = _ + 1); !(m = y[w]) && ++w < p; );
						v._next = m || null;
					}
			}
			return ((c = new ht(c, a))._enter = o), (c._exit = u), c;
		},
		enter: function() {
			return new ht(this._enter || this._groups.map(L), this._parents);
		},
		exit: function() {
			return new ht(this._exit || this._groups.map(L), this._parents);
		},
		merge: function(t) {
			for (
				var e = this._groups,
					n = t._groups,
					r = e.length,
					a = n.length,
					f = Math.min(r, a),
					i = new Array(r),
					c = 0;
				c < f;
				++c
			)
				for (
					var o,
						u = e[c],
						s = n[c],
						d = u.length,
						l = (i[c] = new Array(d)),
						h = 0;
					h < d;
					++h
				)
					(o = u[h] || s[h]) && (l[h] = o);
			for (; c < r; ++c) i[c] = e[c];
			return new ht(i, this._parents);
		},
		order: function() {
			for (var t = this._groups, e = -1, n = t.length; ++e < n; )
				for (var r, a = t[e], f = a.length - 1, i = a[f]; 0 <= --f; )
					(r = a[f]) &&
						(
							i && i !== r.nextSibling && i.parentNode.insertBefore(r, i),
							(i = r)
						);
			return this;
		},
		sort: function(n) {
			function t(t, e) {
				return t && e ? n(t.__data__, e.__data__) : !t - !e;
			}
			n || (n = V);
			for (
				var e = this._groups, r = e.length, a = new Array(r), f = 0;
				f < r;
				++f
			) {
				for (
					var i, c = e[f], o = c.length, u = (a[f] = new Array(o)), s = 0;
					s < o;
					++s
				)
					(i = c[s]) && (u[s] = i);
				u.sort(t);
			}
			return new ht(a, this._parents).order();
		},
		call: function() {
			var t = arguments[0];
			return (arguments[0] = this), t.apply(null, arguments), this;
		},
		nodes: function() {
			var t = new Array(this.size()),
				e = -1;
			return this.each(function() {
				t[++e] = this;
			}), t;
		},
		node: function() {
			for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
				for (var r = t[e], a = 0, f = r.length; a < f; ++a) {
					var i = r[a];
					if (i) return i;
				}
			return null;
		},
		size: function() {
			var t = 0;
			return this.each(function() {
				++t;
			}), t;
		},
		empty: function() {
			return !this.node();
		},
		each: function(t) {
			for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
				for (var a, f = e[n], i = 0, c = f.length; i < c; ++i)
					(a = f[i]) && t.call(a, a.__data__, i, f);
			return this;
		},
		attr: function(t, e) {
			var n = g(t);
			if (arguments.length < 2) {
				var r = this.node();
				return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
			}
			return this.each(
				(null == e
					? n.local
						? function(t) {
								return function() {
									this.removeAttributeNS(t.space, t.local);
								};
							}
						: function(t) {
								return function() {
									this.removeAttribute(t);
								};
							}
					: "function" == typeof e
						? n.local
							? function(e, n) {
									return function() {
										var t = n.apply(this, arguments);
										null == t
											? this.removeAttributeNS(e.space, e.local)
											: this.setAttributeNS(e.space, e.local, t);
									};
								}
							: function(e, n) {
									return function() {
										var t = n.apply(this, arguments);
										null == t
											? this.removeAttribute(e)
											: this.setAttribute(e, t);
									};
								}
						: n.local
							? function(t, e) {
									return function() {
										this.setAttributeNS(t.space, t.local, e);
									};
								}
							: function(t, e) {
									return function() {
										this.setAttribute(t, e);
									};
								})(n, e)
			);
		},
		style: function(t, e, n) {
			return 1 < arguments.length
				? this.each(
						(null == e
							? function(t) {
									return function() {
										this.style.removeProperty(t);
									};
								}
							: "function" == typeof e
								? function(e, n, r) {
										return function() {
											var t = n.apply(this, arguments);
											null == t
												? this.style.removeProperty(e)
												: this.style.setProperty(e, t, r);
										};
									}
								: function(t, e, n) {
										return function() {
											this.style.setProperty(t, e, n);
										};
									})(t, e, null == n ? "" : n)
					)
				: $(this.node(), t);
		},
		property: function(t, e) {
			return 1 < arguments.length
				? this.each(
						(null == e
							? function(t) {
									return function() {
										delete this[t];
									};
								}
							: "function" == typeof e
								? function(e, n) {
										return function() {
											var t = n.apply(this, arguments);
											null == t ? delete this[e] : (this[e] = t);
										};
									}
								: function(t, e) {
										return function() {
											this[t] = e;
										};
									})(t, e)
					)
				: this.node()[t];
		},
		classed: function(t, e) {
			var n = Z(t + "");
			if (arguments.length < 2) {
				for (var r = G(this.node()), a = -1, f = n.length; ++a < f; )
					if (!r.contains(n[a])) return !1;
				return !0;
			}
			return this.each(
				("function" == typeof e
					? function(t, e) {
							return function() {
								(e.apply(this, arguments) ? Q : W)(this, t);
							};
						}
					: e
						? function(t) {
								return function() {
									Q(this, t);
								};
							}
						: function(t) {
								return function() {
									W(this, t);
								};
							})(n, e)
			);
		},
		text: function(t) {
			return arguments.length
				? this.each(
						null == t
							? J
							: ("function" == typeof t
									? function(e) {
											return function() {
												var t = e.apply(this, arguments);
												this.textContent = null == t ? "" : t;
											};
										}
									: function(t) {
											return function() {
												this.textContent = t;
											};
										})(t)
					)
				: this.node().textContent;
		},
		html: function(t) {
			return arguments.length
				? this.each(
						null == t
							? K
							: ("function" == typeof t
									? function(e) {
											return function() {
												var t = e.apply(this, arguments);
												this.innerHTML = null == t ? "" : t;
											};
										}
									: function(t) {
											return function() {
												this.innerHTML = t;
											};
										})(t)
					)
				: this.node().innerHTML;
		},
		raise: function() {
			return this.each(tt);
		},
		lower: function() {
			return this.each(et);
		},
		append: function(t) {
			var e = "function" == typeof t ? t : y(t);
			return this.select(function() {
				return this.appendChild(e.apply(this, arguments));
			});
		},
		insert: function(t, e) {
			var n = "function" == typeof t ? t : y(t),
				r = null == e ? nt : "function" == typeof e ? e : M(e);
			return this.select(function() {
				return this.insertBefore(
					n.apply(this, arguments),
					r.apply(this, arguments) || null
				);
			});
		},
		remove: function() {
			return this.each(rt);
		},
		clone: function(t) {
			return this.select(t ? ft : at);
		},
		datum: function(t) {
			return arguments.length
				? this.property("__data__", t)
				: this.node().__data__;
		},
		on: function(t, e, n) {
			var r,
				a,
				f = (t + "").trim().split(/^|\s+/).map(function(t) {
					var e = "",
						n = t.indexOf(".");
					return 0 <= n &&
						((e = t.slice(n + 1)), (t = t.slice(0, n))), { type: t, name: e };
				}),
				i = f.length;
			if (!(arguments.length < 2)) {
				for (c = e ? st : ut, null == n && (n = !1), r = 0; r < i; ++r)
					this.each(c(f[r], e, n));
				return this;
			}
			var c = this.node().__on;
			if (c)
				for (var o, u = 0, s = c.length; u < s; ++u)
					for (r = 0, o = c[u]; r < i; ++r)
						if ((a = f[r]).type === o.type && a.name === o.name) return o.value;
		},
		dispatch: function(t, e) {
			return this.each(
				("function" == typeof e
					? function(t, e) {
							return function() {
								return dt(this, t, e.apply(this, arguments));
							};
						}
					: function(t, e) {
							return function() {
								return dt(this, t, e);
							};
						})(t, e)
			);
		}
	};
	var vt = 1 / 0.7,
		mt = "\\s*([+-]?\\d+)\\s*",
		_t = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
		wt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
		xt = /^#([0-9a-f]{3})$/,
		Mt = /^#([0-9a-f]{6})$/,
		At = new RegExp("^rgb\\(" + [mt, mt, mt] + "\\)$"),
		Tt = new RegExp("^rgb\\(" + [wt, wt, wt] + "\\)$"),
		Nt = new RegExp("^rgba\\(" + [mt, mt, mt, _t] + "\\)$"),
		kt = new RegExp("^rgba\\(" + [wt, wt, wt, _t] + "\\)$"),
		Ct = new RegExp("^hsl\\(" + [_t, wt, wt] + "\\)$"),
		Pt = new RegExp("^hsla\\(" + [_t, wt, wt, _t] + "\\)$"),
		Dt = {
			aliceblue: 15792383,
			antiquewhite: 16444375,
			aqua: 65535,
			aquamarine: 8388564,
			azure: 15794175,
			beige: 16119260,
			bisque: 16770244,
			black: 0,
			blanchedalmond: 16772045,
			blue: 255,
			blueviolet: 9055202,
			brown: 10824234,
			burlywood: 14596231,
			cadetblue: 6266528,
			chartreuse: 8388352,
			chocolate: 13789470,
			coral: 16744272,
			cornflowerblue: 6591981,
			cornsilk: 16775388,
			crimson: 14423100,
			cyan: 65535,
			darkblue: 139,
			darkcyan: 35723,
			darkgoldenrod: 12092939,
			darkgray: 11119017,
			darkgreen: 25600,
			darkgrey: 11119017,
			darkkhaki: 12433259,
			darkmagenta: 9109643,
			darkolivegreen: 5597999,
			darkorange: 16747520,
			darkorchid: 10040012,
			darkred: 9109504,
			darksalmon: 15308410,
			darkseagreen: 9419919,
			darkslateblue: 4734347,
			darkslategray: 3100495,
			darkslategrey: 3100495,
			darkturquoise: 52945,
			darkviolet: 9699539,
			deeppink: 16716947,
			deepskyblue: 49151,
			dimgray: 6908265,
			dimgrey: 6908265,
			dodgerblue: 2003199,
			firebrick: 11674146,
			floralwhite: 16775920,
			forestgreen: 2263842,
			fuchsia: 16711935,
			gainsboro: 14474460,
			ghostwhite: 16316671,
			gold: 16766720,
			goldenrod: 14329120,
			gray: 8421504,
			green: 32768,
			greenyellow: 11403055,
			grey: 8421504,
			honeydew: 15794160,
			hotpink: 16738740,
			indianred: 13458524,
			indigo: 4915330,
			ivory: 16777200,
			khaki: 15787660,
			lavender: 15132410,
			lavenderblush: 16773365,
			lawngreen: 8190976,
			lemonchiffon: 16775885,
			lightblue: 11393254,
			lightcoral: 15761536,
			lightcyan: 14745599,
			lightgoldenrodyellow: 16448210,
			lightgray: 13882323,
			lightgreen: 9498256,
			lightgrey: 13882323,
			lightpink: 16758465,
			lightsalmon: 16752762,
			lightseagreen: 2142890,
			lightskyblue: 8900346,
			lightslategray: 7833753,
			lightslategrey: 7833753,
			lightsteelblue: 11584734,
			lightyellow: 16777184,
			lime: 65280,
			limegreen: 3329330,
			linen: 16445670,
			magenta: 16711935,
			maroon: 8388608,
			mediumaquamarine: 6737322,
			mediumblue: 205,
			mediumorchid: 12211667,
			mediumpurple: 9662683,
			mediumseagreen: 3978097,
			mediumslateblue: 8087790,
			mediumspringgreen: 64154,
			mediumturquoise: 4772300,
			mediumvioletred: 13047173,
			midnightblue: 1644912,
			mintcream: 16121850,
			mistyrose: 16770273,
			moccasin: 16770229,
			navajowhite: 16768685,
			navy: 128,
			oldlace: 16643558,
			olive: 8421376,
			olivedrab: 7048739,
			orange: 16753920,
			orangered: 16729344,
			orchid: 14315734,
			palegoldenrod: 15657130,
			palegreen: 10025880,
			paleturquoise: 11529966,
			palevioletred: 14381203,
			papayawhip: 16773077,
			peachpuff: 16767673,
			peru: 13468991,
			pink: 16761035,
			plum: 14524637,
			powderblue: 11591910,
			purple: 8388736,
			rebeccapurple: 6697881,
			red: 16711680,
			rosybrown: 12357519,
			royalblue: 4286945,
			saddlebrown: 9127187,
			salmon: 16416882,
			sandybrown: 16032864,
			seagreen: 3050327,
			seashell: 16774638,
			sienna: 10506797,
			silver: 12632256,
			skyblue: 8900331,
			slateblue: 6970061,
			slategray: 7372944,
			slategrey: 7372944,
			snow: 16775930,
			springgreen: 65407,
			steelblue: 4620980,
			tan: 13808780,
			teal: 32896,
			thistle: 14204888,
			tomato: 16737095,
			turquoise: 4251856,
			violet: 15631086,
			wheat: 16113331,
			white: 16777215,
			whitesmoke: 16119285,
			yellow: 16776960,
			yellowgreen: 10145074
		};
	function Ut(t) {
		var e;
		return (t = (t + "")
			.trim()
			.toLowerCase()), (e = xt.exec(t)) ? new qt((((e = parseInt(e[1], 16)) >> 8) & 15) | ((e >> 4) & 240), ((e >> 4) & 15) | (240 & e), ((15 & e) << 4) | (15 & e), 1) : (e = Mt.exec(t)) ? St(parseInt(e[1], 16)) : (e = At.exec(t)) ? new qt(e[1], e[2], e[3], 1) : (e = Tt.exec(t)) ? new qt(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = Nt.exec(t)) ? zt(e[1], e[2], e[3], e[4]) : (e = kt.exec(t)) ? zt(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = Ct.exec(t)) ? Yt(e[1], e[2] / 100, e[3] / 100, 1) : (e = Pt.exec(t)) ? Yt(e[1], e[2] / 100, e[3] / 100, e[4]) : Dt.hasOwnProperty(t) ? St(Dt[t]) : "transparent" === t ? new qt(NaN, NaN, NaN, 0) : null;
	}
	function St(t) {
		return new qt((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
	}
	function zt(t, e, n, r) {
		return r <= 0 && (t = e = n = NaN), new qt(t, e, n, r);
	}
	function Et(t) {
		return t instanceof yt ||
			(t = Ut(t)), t ? new qt((t = t.rgb()).r, t.g, t.b, t.opacity) : new qt();
	}
	function Ft(t, e, n, r) {
		return 1 === arguments.length ? Et(t) : new qt(t, e, n, null == r ? 1 : r);
	}
	function qt(t, e, n, r) {
		(this.r = +t), (this.g = +e), (this.b = +n), (this.opacity = +r);
	}
	function Yt(t, e, n, r) {
		return r <= 0
			? (t = e = n = NaN)
			: n <= 0 || 1 <= n
				? (t = e = NaN)
				: e <= 0 && (t = NaN), new Lt(t, e, n, r);
	}
	function It(t, e, n, r) {
		return 1 === arguments.length
			? (function(t) {
					if (t instanceof Lt) return new Lt(t.h, t.s, t.l, t.opacity);
					if ((t instanceof yt || (t = Ut(t)), !t)) return new Lt();
					if (t instanceof Lt) return t;
					var e = (t = t.rgb()).r / 255,
						n = t.g / 255,
						r = t.b / 255,
						a = Math.min(e, n, r),
						f = Math.max(e, n, r),
						i = NaN,
						c = f - a,
						o = (f + a) / 2;
					return c
						? (
								(i =
									e === f
										? (n - r) / c + 6 * (n < r)
										: n === f ? (r - e) / c + 2 : (e - n) / c + 4),
								(c /= o < 0.5 ? f + a : 2 - f - a),
								(i *= 60)
							)
						: (c = 0 < o && o < 1 ? 0 : i), new Lt(i, c, o, t.opacity);
				})(t)
			: new Lt(t, e, n, null == r ? 1 : r);
	}
	function Lt(t, e, n, r) {
		(this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r);
	}
	function Ht(t, e, n) {
		return (
			255 *
			(t < 60
				? e + (n - e) * t / 60
				: t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e)
		);
	}
	pt(yt, Ut, {
		displayable: function() {
			return this.rgb().displayable();
		},
		toString: function() {
			return this.rgb() + "";
		}
	}), pt(
		qt,
		Ft,
		gt(yt, {
			brighter: function(t) {
				return (t = null == t ? vt : Math.pow(vt, t)), new qt(
					this.r * t,
					this.g * t,
					this.b * t,
					this.opacity
				);
			},
			darker: function(t) {
				return (t = null == t ? 0.7 : Math.pow(0.7, t)), new qt(
					this.r * t,
					this.g * t,
					this.b * t,
					this.opacity
				);
			},
			rgb: function() {
				return this;
			},
			displayable: function() {
				return (
					0 <= this.r &&
					this.r <= 255 &&
					0 <= this.g &&
					this.g <= 255 &&
					0 <= this.b &&
					this.b <= 255 &&
					0 <= this.opacity &&
					this.opacity <= 1
				);
			},
			toString: function() {
				var t = this.opacity;
				return (
					(1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
						? "rgb("
						: "rgba(") +
					Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
					", " +
					Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
					", " +
					Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
					(1 === t ? ")" : ", " + t + ")")
				);
			}
		})
	), pt(
		Lt,
		It,
		gt(yt, {
			brighter: function(t) {
				return (t = null == t ? vt : Math.pow(vt, t)), new Lt(
					this.h,
					this.s,
					this.l * t,
					this.opacity
				);
			},
			darker: function(t) {
				return (t = null == t ? 0.7 : Math.pow(0.7, t)), new Lt(
					this.h,
					this.s,
					this.l * t,
					this.opacity
				);
			},
			rgb: function() {
				var t = this.h % 360 + 360 * (this.h < 0),
					e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
					n = this.l,
					r = n + (n < 0.5 ? n : 1 - n) * e,
					a = 2 * n - r;
				return new qt(
					Ht(240 <= t ? t - 240 : t + 120, a, r),
					Ht(t, a, r),
					Ht(t < 120 ? t + 240 : t - 120, a, r),
					this.opacity
				);
			},
			displayable: function() {
				return (
					((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
					0 <= this.l &&
					this.l <= 1 &&
					0 <= this.opacity &&
					this.opacity <= 1
				);
			}
		})
	);
	var Ot = Math.PI / 180,
		jt = 180 / Math.PI,
		Rt = 0.95047,
		Vt = 1,
		Xt = 1.08883,
		$t = 4 / 29,
		Zt = 6 / 29,
		Gt = 3 * Zt * Zt,
		Bt = Zt * Zt * Zt;
	function Qt(t) {
		if (t instanceof Jt) return new Jt(t.l, t.a, t.b, t.opacity);
		if (t instanceof re) {
			var e = t.h * Ot;
			return new Jt(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
		}
		t instanceof qt || (t = Et(t));
		var n = ne(t.r),
			r = ne(t.g),
			a = ne(t.b),
			f = Kt((0.4124564 * n + 0.3575761 * r + 0.1804375 * a) / Rt),
			i = Kt((0.2126729 * n + 0.7151522 * r + 0.072175 * a) / Vt);
		return new Jt(
			116 * i - 16,
			500 * (f - i),
			200 * (i - Kt((0.0193339 * n + 0.119192 * r + 0.9503041 * a) / Xt)),
			t.opacity
		);
	}
	function Wt(t, e, n, r) {
		return 1 === arguments.length ? Qt(t) : new Jt(t, e, n, null == r ? 1 : r);
	}
	function Jt(t, e, n, r) {
		(this.l = +t), (this.a = +e), (this.b = +n), (this.opacity = +r);
	}
	function Kt(t) {
		return Bt < t ? Math.pow(t, 1 / 3) : t / Gt + $t;
	}
	function te(t) {
		return Zt < t ? t * t * t : Gt * (t - $t);
	}
	function ee(t) {
		return (
			255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
		);
	}
	function ne(t) {
		return (t /= 255) <= 0.04045
			? t / 12.92
			: Math.pow((t + 0.055) / 1.055, 2.4);
	}
	function re(t, e, n, r) {
		(this.h = +t), (this.c = +e), (this.l = +n), (this.opacity = +r);
	}
	pt(
		Jt,
		Wt,
		gt(yt, {
			brighter: function(t) {
				return new Jt(
					this.l + 18 * (null == t ? 1 : t),
					this.a,
					this.b,
					this.opacity
				);
			},
			darker: function(t) {
				return new Jt(
					this.l - 18 * (null == t ? 1 : t),
					this.a,
					this.b,
					this.opacity
				);
			},
			rgb: function() {
				var t = (this.l + 16) / 116,
					e = isNaN(this.a) ? t : t + this.a / 500,
					n = isNaN(this.b) ? t : t - this.b / 200;
				return (t = Vt * te(t)), new qt(
					ee(
						3.2404542 * (e = Rt * te(e)) -
							1.5371385 * t -
							0.4985314 * (n = Xt * te(n))
					),
					ee(-0.969266 * e + 1.8760108 * t + 0.041556 * n),
					ee(0.0556434 * e - 0.2040259 * t + 1.0572252 * n),
					this.opacity
				);
			}
		})
	), pt(
		re,
		function(t, e, n, r) {
			return 1 === arguments.length
				? (function(t) {
						if (t instanceof re) return new re(t.h, t.c, t.l, t.opacity);
						t instanceof Jt || (t = Qt(t));
						var e = Math.atan2(t.b, t.a) * jt;
						return new re(
							e < 0 ? e + 360 : e,
							Math.sqrt(t.a * t.a + t.b * t.b),
							t.l,
							t.opacity
						);
					})(t)
				: new re(t, e, n, null == r ? 1 : r);
		},
		gt(yt, {
			brighter: function(t) {
				return new re(
					this.h,
					this.c,
					this.l + 18 * (null == t ? 1 : t),
					this.opacity
				);
			},
			darker: function(t) {
				return new re(
					this.h,
					this.c,
					this.l - 18 * (null == t ? 1 : t),
					this.opacity
				);
			},
			rgb: function() {
				return Qt(this).rgb();
			}
		})
	);
	var ae = 1.78277,
		fe = -0.29227,
		ie = -0.90649,
		ce = 1.97294,
		oe = ce * ie,
		ue = ce * ae,
		se = ae * fe - -0.14861 * ie;
	function de(t, e, n, r) {
		return 1 === arguments.length
			? (function(t) {
					if (t instanceof le) return new le(t.h, t.s, t.l, t.opacity);
					t instanceof qt || (t = Et(t));
					var e = t.r / 255,
						n = t.g / 255,
						r = t.b / 255,
						a = (se * r + oe * e - ue * n) / (se + oe - ue),
						f = r - a,
						i = (ce * (n - a) - fe * f) / ie,
						c = Math.sqrt(i * i + f * f) / (ce * a * (1 - a)),
						o = c ? Math.atan2(i, f) * jt - 120 : NaN;
					return new le(o < 0 ? o + 360 : o, c, a, t.opacity);
				})(t)
			: new le(t, e, n, null == r ? 1 : r);
	}
	function le(t, e, n, r) {
		(this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r);
	}
	function he(t) {
		return function() {
			return t;
		};
	}
	function be(e, n) {
		return function(t) {
			return e + t * n;
		};
	}
	function pe(f) {
		return 1 == (f = +f)
			? ge
			: function(t, e) {
					return e - t
						? (
								(n = t),
								(r = e),
								(a = f),
								(n = Math.pow(n, a)),
								(r = Math.pow(r, a) - n),
								(a = 1 / a),
								function(t) {
									return Math.pow(n + t * r, a);
								}
							)
						: he(isNaN(t) ? e : t);
					var n, r, a;
				};
	}
	function ge(t, e) {
		var n = e - t;
		return n ? be(t, n) : he(isNaN(t) ? e : t);
	}
	pt(
		le,
		de,
		gt(yt, {
			brighter: function(t) {
				return (t = null == t ? vt : Math.pow(vt, t)), new le(
					this.h,
					this.s,
					this.l * t,
					this.opacity
				);
			},
			darker: function(t) {
				return (t = null == t ? 0.7 : Math.pow(0.7, t)), new le(
					this.h,
					this.s,
					this.l * t,
					this.opacity
				);
			},
			rgb: function() {
				var t = isNaN(this.h) ? 0 : (this.h + 120) * Ot,
					e = +this.l,
					n = isNaN(this.s) ? 0 : this.s * e * (1 - e),
					r = Math.cos(t),
					a = Math.sin(t);
				return new qt(
					255 * (e + n * (-0.14861 * r + ae * a)),
					255 * (e + n * (fe * r + ie * a)),
					255 * (e + n * (ce * r)),
					this.opacity
				);
			}
		})
	);
	var ye = (function t(e) {
		var i = pe(e);
		function n(e, t) {
			var n = i((e = Ft(e)).r, (t = Ft(t)).r),
				r = i(e.g, t.g),
				a = i(e.b, t.b),
				f = ge(e.opacity, t.opacity);
			return function(t) {
				return (e.r = n(t)), (e.g = r(t)), (e.b = a(t)), (e.opacity = f(t)), e +
					"";
			};
		}
		return (n.gamma = t), n;
	})(1);
	var ve,
		me = (
			(ve = function(u) {
				var s = u.length - 1;
				return function(t) {
					var e,
						n,
						r,
						a = t <= 0 ? (t = 0) : 1 <= t ? s - (t = 1) : Math.floor(t * s),
						f = u[a],
						i = u[a + 1],
						c = 0 < a ? u[a - 1] : 2 * f - i,
						o = a < s - 1 ? u[a + 2] : 2 * i - f;
					return (
						((1 - 3 * (e = (t - a / s) * s) + 3 * (n = e * e) - (r = n * e)) *
							c +
							(4 - 6 * n + 3 * r) * f +
							(1 + 3 * e + 3 * n - 3 * r) * i +
							r * o) /
						6
					);
				};
			}),
			function(t) {
				var e,
					n,
					r = t.length,
					a = new Array(r),
					f = new Array(r),
					i = new Array(r);
				for (e = 0; e < r; ++e)
					(n = Ft(t[e])), (a[e] = n.r || 0), (f[e] = n.g || 0), (i[e] =
						n.b || 0);
				return (a = ve(a)), (f = ve(f)), (i = ve(i)), (n.opacity = 1), function(
					t
				) {
					return (n.r = a(t)), (n.g = f(t)), (n.b = i(t)), n + "";
				};
			}
		);
	function _e(e, n) {
		return (n -= e = +e), function(t) {
			return e + n * t;
		};
	}
	var we = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
		xe = new RegExp(we.source, "g");
	function Me(t, r) {
		var e,
			n,
			a,
			f,
			i,
			c = (we.lastIndex = xe.lastIndex = 0),
			o = -1,
			u = [],
			s = [];
		for (t += "", r += ""; (e = we.exec(t)) && (n = xe.exec(r)); )
			(a = n.index) > c &&
				((a = r.slice(c, a)), u[o] ? (u[o] += a) : (u[++o] = a)), (e = e[0]) ===
			(n = n[0])
				? u[o] ? (u[o] += n) : (u[++o] = n)
				: ((u[++o] = null), s.push({ i: o, x: _e(e, n) })), (c = xe.lastIndex);
		return c < r.length &&
			((a = r.slice(c)), u[o] ? (u[o] += a) : (u[++o] = a)), u.length < 2
			? s[0]
				? (
						(i = s[0].x),
						function(t) {
							return i(t) + "";
						}
					)
				: (
						(f = r),
						function() {
							return f;
						}
					)
			: (
					(r = s.length),
					function(t) {
						for (var e, n = 0; n < r; ++n) u[(e = s[n]).i] = e.x(t);
						return u.join("");
					}
				);
	}
	function Ae(t, e) {
		var n,
			r = typeof e;
		return null == e || "boolean" === r
			? he(e)
			: ("number" === r
					? _e
					: "string" === r
						? (n = Ut(e)) ? ((e = n), ye) : Me
						: e instanceof Ut
							? ye
							: e instanceof Date
								? function(e, n) {
										var r = new Date();
										return (n -= e = +e), function(t) {
											return r.setTime(e + n * t), r;
										};
									}
								: Array.isArray(e)
									? function(t, e) {
											var n,
												r = e ? e.length : 0,
												a = t ? Math.min(r, t.length) : 0,
												f = new Array(a),
												i = new Array(r);
											for (n = 0; n < a; ++n) f[n] = Ae(t[n], e[n]);
											for (; n < r; ++n) i[n] = e[n];
											return function(t) {
												for (n = 0; n < a; ++n) i[n] = f[n](t);
												return i;
											};
										}
									: ("function" != typeof e.valueOf &&
											"function" != typeof e.toString) ||
										isNaN(e)
										? function(t, e) {
												var n,
													r = {},
													a = {};
												for (n in (
													(null !== t && "object" == typeof t) || (t = {}),
													(null !== e && "object" == typeof e) || (e = {}),
													e
												))
													n in t ? (r[n] = Ae(t[n], e[n])) : (a[n] = e[n]);
												return function(t) {
													for (n in r) a[n] = r[n](t);
													return a;
												};
											}
										: _e)(t, e);
	}
	function Te(e, n) {
		return (n -= e = +e), function(t) {
			return Math.round(e + n * t);
		};
	}
	var Ne,
		ke,
		Ce,
		Pe,
		De = 180 / Math.PI,
		Ue = {
			translateX: 0,
			translateY: 0,
			rotate: 0,
			skewX: 0,
			scaleX: 1,
			scaleY: 1
		};
	function Se(t, e, n, r, a, f) {
		var i, c, o;
		return (i = Math.sqrt(t * t + e * e)) &&
			(
				(t /= i),
				(e /= i)
			), (o = t * n + e * r) && ((n -= t * o), (r -= e * o)), (c = Math.sqrt(n * n + r * r)) && ((n /= c), (r /= c), (o /= c)), t * r < e * n && ((t = -t), (e = -e), (o = -o), (i = -i)), { translateX: a, translateY: f, rotate: Math.atan2(e, t) * De, skewX: Math.atan(o) * De, scaleX: i, scaleY: c };
	}
	function ze(l, h, b, p) {
		function g(t) {
			return t.length ? t.pop() + " " : "";
		}
		return function(t, e) {
			var n,
				r,
				a,
				f,
				i,
				c,
				o,
				u,
				s = [],
				d = [];
			return (t = l(t)), (e = l(e)), (function(t, e, n, r, a, f) {
				if (t !== n || e !== r) {
					var i = a.push("translate(", null, h, null, b);
					f.push({ i: i - 4, x: _e(t, n) }, { i: i - 2, x: _e(e, r) });
				} else (n || r) && a.push("translate(" + n + h + r + b);
			})(
				t.translateX,
				t.translateY,
				e.translateX,
				e.translateY,
				s,
				d
			), (n = t.rotate), (r = e.rotate), (a = s), (f = d), n !== r ? (180 < n - r ? (r += 360) : 180 < r - n && (n += 360), f.push({ i: a.push(g(a) + "rotate(", null, p) - 2, x: _e(n, r) })) : r && a.push(g(a) + "rotate(" + r + p), (i = t.skewX), (c = e.skewX), (o = s), (u = d), i !== c ? u.push({ i: o.push(g(o) + "skewX(", null, p) - 2, x: _e(i, c) }) : c && o.push(g(o) + "skewX(" + c + p), (function(t, e, n, r, a, f) {
				if (t !== n || e !== r) {
					var i = a.push(g(a) + "scale(", null, ",", null, ")");
					f.push({ i: i - 4, x: _e(t, n) }, { i: i - 2, x: _e(e, r) });
				} else (1 === n && 1 === r) || a.push(g(a) + "scale(" + n + "," + r + ")");
			})(
				t.scaleX,
				t.scaleY,
				e.scaleX,
				e.scaleY,
				s,
				d
			), (t = e = null), function(t) {
				for (var e, n = -1, r = d.length; ++n < r; ) s[(e = d[n]).i] = e.x(t);
				return s.join("");
			};
		};
	}
	var Ee = ze(
			function(t) {
				return "none" === t
					? Ue
					: (
							Ne ||
								(
									(Ne = document.createElement("DIV")),
									(ke = document.documentElement),
									(Ce = document.defaultView)
								),
							(Ne.style.transform = t),
							(t = Ce.getComputedStyle(
								ke.appendChild(Ne),
								null
							).getPropertyValue("transform")),
							ke.removeChild(Ne),
							Se(
								+(t = t.slice(7, -1).split(","))[0],
								+t[1],
								+t[2],
								+t[3],
								+t[4],
								+t[5]
							)
						);
			},
			"px, ",
			"px)",
			"deg)"
		),
		Fe = ze(
			function(t) {
				return null == t
					? Ue
					: (
							Pe ||
								(Pe = document.createElementNS(
									"http://www.w3.org/2000/svg",
									"g"
								)),
							Pe.setAttribute("transform", t),
							(t = Pe.transform.baseVal.consolidate())
								? Se((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
								: Ue
						);
			},
			", ",
			")",
			")"
		);
	Math.SQRT2;
	function qe(e, t) {
		var n = ge((e = Wt(e)).l, (t = Wt(t)).l),
			r = ge(e.a, t.a),
			a = ge(e.b, t.b),
			f = ge(e.opacity, t.opacity);
		return function(t) {
			return (e.l = n(
				t
			)), (e.a = r(t)), (e.b = a(t)), (e.opacity = f(t)), e + "";
		};
	}
	function Ye(c) {
		return (function t(i) {
			function e(e, t) {
				var n = c((e = de(e)).h, (t = de(t)).h),
					r = ge(e.s, t.s),
					a = ge(e.l, t.l),
					f = ge(e.opacity, t.opacity);
				return function(t) {
					return (e.h = n(
						t
					)), (e.s = r(t)), (e.l = a(Math.pow(t, i))), (e.opacity = f(t)), e + "";
				};
			}
			return (i = +i), (e.gamma = t), e;
		})(1);
	}
	Ye(function(t, e) {
		var n = e - t;
		return n
			? be(t, 180 < n || n < -180 ? n - 360 * Math.round(n / 360) : n)
			: he(isNaN(t) ? e : t);
	});
	var Ie = Ye(ge);
	var Le,
		He,
		Oe = 0,
		je = 0,
		Re = 0,
		Ve = 1e3,
		Xe = 0,
		$e = 0,
		Ze = 0,
		Ge = "object" == typeof performance && performance.now ? performance : Date,
		Be =
			"object" == typeof window && window.requestAnimationFrame
				? window.requestAnimationFrame.bind(window)
				: function(t) {
						setTimeout(t, 17);
					};
	function Qe() {
		return $e || (Be(We), ($e = Ge.now() + Ze));
	}
	function We() {
		$e = 0;
	}
	function Je() {
		this._call = this._time = this._next = null;
	}
	function Ke(t, e, n) {
		var r = new Je();
		return r.restart(t, e, n), r;
	}
	function tn() {
		($e = (Xe = Ge.now()) + Ze), (Oe = je = 0);
		try {
			(function() {
				Qe(), ++Oe;
				for (var t, e = Le; e; )
					0 <= (t = $e - e._time) && e._call.call(null, t), (e = e._next);
				--Oe;
			})();
		} finally {
			(Oe = 0), (function() {
				var t,
					e,
					n = Le,
					r = 1 / 0;
				for (; n; )
					n._call
						? (r > n._time && (r = n._time), (n = (t = n)._next))
						: (
								(e = n._next),
								(n._next = null),
								(n = t ? (t._next = e) : (Le = e))
							);
				(He = t), nn(r);
			})(), ($e = 0);
		}
	}
	function en() {
		var t = Ge.now(),
			e = t - Xe;
		Ve < e && ((Ze -= e), (Xe = t));
	}
	function nn(t) {
		Oe ||
			(
				je && (je = clearTimeout(je)),
				24 < t - $e
					? (
							t < 1 / 0 && (je = setTimeout(tn, t - Ge.now() - Ze)),
							Re && (Re = clearInterval(Re))
						)
					: (
							Re || ((Xe = Ge.now()), (Re = setInterval(en, Ve))),
							(Oe = 1),
							Be(tn)
						)
			);
	}
	function rn(e, n, t) {
		var r = new Je();
		return (n = null == n ? 0 : +n), r.restart(
			function(t) {
				r.stop(), e(t + n);
			},
			n,
			t
		), r;
	}
	Je.prototype = Ke.prototype = {
		constructor: Je,
		restart: function(t, e, n) {
			if ("function" != typeof t)
				throw new TypeError("callback is not a function");
			(n = (null == n ? Qe() : +n) + (null == e ? 0 : +e)), this._next ||
				He === this ||
				(
					He ? (He._next = this) : (Le = this),
					(He = this)
				), (this._call = t), (this._time = n), nn();
		},
		stop: function() {
			this._call && ((this._call = null), (this._time = 1 / 0), nn());
		}
	};
	var an = e("start", "end", "interrupt"),
		fn = [],
		cn = 0,
		on = 1,
		un = 2,
		sn = 3,
		dn = 4,
		ln = 5,
		hn = 6;
	function bn(t, e, n, r, a, f) {
		var i = t.__transition;
		if (i) {
			if (n in i) return;
		} else t.__transition = {};
		(function(f, i, c) {
			var o,
				u = f.__transition;
			function s(t) {
				var e, n, r, a;
				if (c.state !== on) return l();
				for (e in u)
					if ((a = u[e]).name === c.name) {
						if (a.state === sn) return rn(s);
						a.state === dn
							? (
									(a.state = hn),
									a.timer.stop(),
									a.on.call("interrupt", f, f.__data__, a.index, a.group),
									delete u[e]
								)
							: +e < i && ((a.state = hn), a.timer.stop(), delete u[e]);
					}
				if (
					(
						rn(function() {
							c.state === sn &&
								((c.state = dn), c.timer.restart(d, c.delay, c.time), d(t));
						}),
						(c.state = un),
						c.on.call("start", f, f.__data__, c.index, c.group),
						c.state === un
					)
				) {
					for (
						c.state = sn, o = new Array((r = c.tween.length)), e = 0, n = -1;
						e < r;
						++e
					)
						(a = c.tween[e].value.call(f, f.__data__, c.index, c.group)) &&
							(o[++n] = a);
					o.length = n + 1;
				}
			}
			function d(t) {
				for (
					var e =
							t < c.duration
								? c.ease.call(null, t / c.duration)
								: (c.timer.restart(l), (c.state = ln), 1),
						n = -1,
						r = o.length;
					++n < r;

				)
					o[n].call(null, e);
				c.state === ln &&
					(c.on.call("end", f, f.__data__, c.index, c.group), l());
			}
			function l() {
				for (var t in ((c.state = hn), c.timer.stop(), delete u[i], u)) return;
				delete f.__transition;
			}
			(u[i] = c).timer = Ke(
				function(t) {
					(c.state = on), c.timer.restart(s, c.delay, c.time), c.delay <= t &&
						s(t - c.delay);
				},
				0,
				c.time
			);
		})(t, n, {
			name: e,
			index: r,
			group: a,
			on: an,
			tween: fn,
			time: f.time,
			delay: f.delay,
			duration: f.duration,
			ease: f.ease,
			timer: null,
			state: cn
		});
	}
	function pn(t, e) {
		var n = yn(t, e);
		if (n.state > cn) throw new Error("too late; already scheduled");
		return n;
	}
	function gn(t, e) {
		var n = yn(t, e);
		if (n.state > un) throw new Error("too late; already started");
		return n;
	}
	function yn(t, e) {
		var n = t.__transition;
		if (!n || !(n = n[e])) throw new Error("transition not found");
		return n;
	}
	function vn(t, e, n) {
		var r = t._id;
		return t.each(function() {
			var t = gn(this, r);
			(t.value || (t.value = {}))[e] = n.apply(this, arguments);
		}), function(t) {
			return yn(t, r).value[e];
		};
	}
	function mn(t, e) {
		var n;
		return ("number" == typeof e
			? _e
			: e instanceof Ut ? ye : (n = Ut(e)) ? ((e = n), ye) : Me)(t, e);
	}
	var _n = bt.prototype.constructor;
	var wn = 0;
	function xn(t, e, n, r) {
		(this._groups = t), (this._parents = e), (this._name = n), (this._id = r);
	}
	function Mn() {
		return ++wn;
	}
	var An = bt.prototype;
	xn.prototype = function(t) {
		return bt().transition(t);
	}.prototype = {
		constructor: xn,
		select: function(t) {
			var e = this._name,
				n = this._id;
			"function" != typeof t && (t = M(t));
			for (
				var r = this._groups, a = r.length, f = new Array(a), i = 0;
				i < a;
				++i
			)
				for (
					var c, o, u = r[i], s = u.length, d = (f[i] = new Array(s)), l = 0;
					l < s;
					++l
				)
					(c = u[l]) &&
						(o = t.call(c, c.__data__, l, u)) &&
						(
							"__data__" in c && (o.__data__ = c.__data__),
							(d[l] = o),
							bn(d[l], e, n, l, d, yn(c, n))
						);
			return new xn(f, this._parents, e, n);
		},
		selectAll: function(t) {
			var e = this._name,
				n = this._id;
			"function" != typeof t && (t = T(t));
			for (
				var r = this._groups, a = r.length, f = [], i = [], c = 0;
				c < a;
				++c
			)
				for (var o, u = r[c], s = u.length, d = 0; d < s; ++d)
					if ((o = u[d])) {
						for (
							var l,
								h = t.call(o, o.__data__, d, u),
								b = yn(o, n),
								p = 0,
								g = h.length;
							p < g;
							++p
						)
							(l = h[p]) && bn(l, e, n, p, h, b);
						f.push(h), i.push(o);
					}
			return new xn(f, i, e, n);
		},
		filter: function(t) {
			"function" != typeof t && (t = I(t));
			for (
				var e = this._groups, n = e.length, r = new Array(n), a = 0;
				a < n;
				++a
			)
				for (var f, i = e[a], c = i.length, o = (r[a] = []), u = 0; u < c; ++u)
					(f = i[u]) && t.call(f, f.__data__, u, i) && o.push(f);
			return new xn(r, this._parents, this._name, this._id);
		},
		merge: function(t) {
			if (t._id !== this._id) throw new Error();
			for (
				var e = this._groups,
					n = t._groups,
					r = e.length,
					a = n.length,
					f = Math.min(r, a),
					i = new Array(r),
					c = 0;
				c < f;
				++c
			)
				for (
					var o,
						u = e[c],
						s = n[c],
						d = u.length,
						l = (i[c] = new Array(d)),
						h = 0;
					h < d;
					++h
				)
					(o = u[h] || s[h]) && (l[h] = o);
			for (; c < r; ++c) i[c] = e[c];
			return new xn(i, this._parents, this._name, this._id);
		},
		selection: function() {
			return new _n(this._groups, this._parents);
		},
		transition: function() {
			for (
				var t = this._name,
					e = this._id,
					n = Mn(),
					r = this._groups,
					a = r.length,
					f = 0;
				f < a;
				++f
			)
				for (var i, c = r[f], o = c.length, u = 0; u < o; ++u)
					if ((i = c[u])) {
						var s = yn(i, e);
						bn(i, t, n, u, c, {
							time: s.time + s.delay + s.duration,
							delay: 0,
							duration: s.duration,
							ease: s.ease
						});
					}
			return new xn(r, this._parents, t, n);
		},
		call: An.call,
		nodes: An.nodes,
		node: An.node,
		size: An.size,
		empty: An.empty,
		each: An.each,
		on: function(t, e) {
			var n,
				r,
				a,
				f,
				i,
				c,
				o = this._id;
			return arguments.length < 2
				? yn(this.node(), o).on.on(t)
				: this.each(
						(
							(n = o),
							(a = e),
							(c = ((r = t) + "").trim().split(/^|\s+/).every(function(t) {
								var e = t.indexOf(".");
								return 0 <= e && (t = t.slice(0, e)), !t || "start" === t;
							})
								? pn
								: gn),
							function() {
								var t = c(this, n),
									e = t.on;
								e !== f && (i = (f = e).copy()).on(r, a), (t.on = i);
							}
						)
					);
		},
		attr: function(t, e) {
			var n = g(t),
				r = "transform" === n ? Fe : mn;
			return this.attrTween(
				t,
				"function" == typeof e
					? (n.local
							? function(n, r, a) {
									var f, i, c;
									return function() {
										var t,
											e = a(this);
										if (null != e)
											return (t = this.getAttributeNS(n.space, n.local)) === e
												? null
												: t === f && e === i ? c : (c = r((f = t), (i = e)));
										this.removeAttributeNS(n.space, n.local);
									};
								}
							: function(n, r, a) {
									var f, i, c;
									return function() {
										var t,
											e = a(this);
										if (null != e)
											return (t = this.getAttribute(n)) === e
												? null
												: t === f && e === i ? c : (c = r((f = t), (i = e)));
										this.removeAttribute(n);
									};
								})(n, r, vn(this, "attr." + t, e))
					: null == e
						? (n.local
								? function(t) {
										return function() {
											this.removeAttributeNS(t.space, t.local);
										};
									}
								: function(t) {
										return function() {
											this.removeAttribute(t);
										};
									})(n)
						: (n.local
								? function(e, n, r) {
										var a, f;
										return function() {
											var t = this.getAttributeNS(e.space, e.local);
											return t === r ? null : t === a ? f : (f = n((a = t), r));
										};
									}
								: function(e, n, r) {
										var a, f;
										return function() {
											var t = this.getAttribute(e);
											return t === r ? null : t === a ? f : (f = n((a = t), r));
										};
									})(n, r, e + "")
			);
		},
		attrTween: function(t, e) {
			var n = "attr." + t;
			if (arguments.length < 2) return (n = this.tween(n)) && n._value;
			if (null == e) return this.tween(n, null);
			if ("function" != typeof e) throw new Error();
			var r = g(t);
			return this.tween(
				n,
				(r.local
					? function(r, t) {
							function e() {
								var e = this,
									n = t.apply(e, arguments);
								return (
									n &&
									function(t) {
										e.setAttributeNS(r.space, r.local, n(t));
									}
								);
							}
							return (e._value = t), e;
						}
					: function(r, t) {
							function e() {
								var e = this,
									n = t.apply(e, arguments);
								return (
									n &&
									function(t) {
										e.setAttribute(r, n(t));
									}
								);
							}
							return (e._value = t), e;
						})(r, e)
			);
		},
		style: function(t, e, n) {
			var r,
				a,
				f,
				i,
				c,
				o,
				u,
				s,
				d,
				l,
				h,
				b,
				p,
				g,
				y,
				v,
				m,
				_ = "transform" == (t += "") ? Ee : mn;
			return null == e
				? this.styleTween(
						t,
						(
							(p = t),
							(g = _),
							function() {
								var t = $(this, p),
									e = (this.style.removeProperty(p), $(this, p));
								return t === e
									? null
									: t === y && e === v ? m : (m = g((y = t), (v = e)));
							}
						)
					).on(
						"end.style." + t,
						(
							(b = t),
							function() {
								this.style.removeProperty(b);
							}
						)
					)
				: this.styleTween(
						t,
						"function" == typeof e
							? (
									(u = _),
									(s = vn(this, "style." + (o = t), e)),
									function() {
										var t = $(this, o),
											e = s(this);
										return null == e &&
											(this.style.removeProperty(o), (e = $(this, o))), t === e
											? null
											: t === d && e === l ? h : (h = u((d = t), (l = e)));
									}
								)
							: (
									(r = t),
									(a = _),
									(f = e + ""),
									function() {
										var t = $(this, r);
										return t === f ? null : t === i ? c : (c = a((i = t), f));
									}
								),
						n
					);
		},
		styleTween: function(t, e, n) {
			var r = "style." + (t += "");
			if (arguments.length < 2) return (r = this.tween(r)) && r._value;
			if (null == e) return this.tween(r, null);
			if ("function" != typeof e) throw new Error();
			return this.tween(
				r,
				(function(r, t, a) {
					function e() {
						var e = this,
							n = t.apply(e, arguments);
						return (
							n &&
							function(t) {
								e.style.setProperty(r, n(t), a);
							}
						);
					}
					return (e._value = t), e;
				})(t, e, null == n ? "" : n)
			);
		},
		text: function(t) {
			return this.tween(
				"text",
				"function" == typeof t
					? (
							(n = vn(this, "text", t)),
							function() {
								var t = n(this);
								this.textContent = null == t ? "" : t;
							}
						)
					: (
							(e = null == t ? "" : t + ""),
							function() {
								this.textContent = e;
							}
						)
			);
			var e, n;
		},
		remove: function() {
			return this.on(
				"end.remove",
				(
					(n = this._id),
					function() {
						var t = this.parentNode;
						for (var e in this.__transition) if (+e !== n) return;
						t && t.removeChild(this);
					}
				)
			);
			var n;
		},
		tween: function(t, e) {
			var n = this._id;
			if (((t += ""), arguments.length < 2)) {
				for (
					var r, a = yn(this.node(), n).tween, f = 0, i = a.length;
					f < i;
					++f
				)
					if ((r = a[f]).name === t) return r.value;
				return null;
			}
			return this.each(
				(null == e
					? function(a, f) {
							var i, c;
							return function() {
								var t = gn(this, a),
									e = t.tween;
								if (e !== i)
									for (var n = 0, r = (c = i = e).length; n < r; ++n)
										if (c[n].name === f) {
											(c = c.slice()).splice(n, 1);
											break;
										}
								t.tween = c;
							};
						}
					: function(f, i, c) {
							var o, u;
							if ("function" != typeof c) throw new Error();
							return function() {
								var t = gn(this, f),
									e = t.tween;
								if (e !== o) {
									u = (o = e).slice();
									for (
										var n = { name: i, value: c }, r = 0, a = u.length;
										r < a;
										++r
									)
										if (u[r].name === i) {
											u[r] = n;
											break;
										}
									r === a && u.push(n);
								}
								t.tween = u;
							};
						})(n, t, e)
			);
		},
		delay: function(t) {
			var e = this._id;
			return arguments.length
				? this.each(
						("function" == typeof t
							? function(t, e) {
									return function() {
										pn(this, t).delay = +e.apply(this, arguments);
									};
								}
							: function(t, e) {
									return (e = +e), function() {
										pn(this, t).delay = e;
									};
								})(e, t)
					)
				: yn(this.node(), e).delay;
		},
		duration: function(t) {
			var e = this._id;
			return arguments.length
				? this.each(
						("function" == typeof t
							? function(t, e) {
									return function() {
										gn(this, t).duration = +e.apply(this, arguments);
									};
								}
							: function(t, e) {
									return (e = +e), function() {
										gn(this, t).duration = e;
									};
								})(e, t)
					)
				: yn(this.node(), e).duration;
		},
		ease: function(t) {
			var e = this._id;
			return arguments.length
				? this.each(
						(function(t, e) {
							if ("function" != typeof e) throw new Error();
							return function() {
								gn(this, t).ease = e;
							};
						})(e, t)
					)
				: yn(this.node(), e).ease;
		}
	};
	Math.PI, Math.PI;
	var Tn = {
		time: null,
		delay: 0,
		duration: 250,
		ease: function(t) {
			return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
		}
	};
	function Nn(t, e) {
		for (var n; !(n = t.__transition) || !(n = n[e]); )
			if (!(t = t.parentNode)) return (Tn.time = Qe()), Tn;
		return n;
	}
	(bt.prototype.interrupt = function(t) {
		return this.each(function() {
			(function(t, e) {
				var n,
					r,
					a,
					f = t.__transition,
					i = !0;
				if (f) {
					for (a in ((e = null == e ? null : e + ""), f))
						(n = f[a]).name === e
							? (
									(r = n.state > un && n.state < ln),
									(n.state = hn),
									n.timer.stop(),
									r && n.on.call("interrupt", t, t.__data__, n.index, n.group),
									delete f[a]
								)
							: (i = !1);
					i && delete t.__transition;
				}
			})(this, t);
		});
	}), (bt.prototype.transition = function(t) {
		var e, n;
		t instanceof xn
			? ((e = t._id), (t = t._name))
			: ((e = Mn()), ((n = Tn).time = Qe()), (t = null == t ? null : t + ""));
		for (var r = this._groups, a = r.length, f = 0; f < a; ++f)
			for (var i, c = r[f], o = c.length, u = 0; u < o; ++u)
				(i = c[u]) && bn(i, t, e, u, c, n || Nn(i, e));
		return new xn(r, this._parents, t, e);
	});
	Math.PI;
	var kn = Math.PI,
		Cn = 2 * kn,
		Pn = 1e-6,
		Dn = Cn - Pn;
	function Un() {
		(this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = "");
	}
	function Sn() {
		return new Un();
	}
	Un.prototype = Sn.prototype = {
		constructor: Un,
		moveTo: function(t, e) {
			this._ +=
				"M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e);
		},
		closePath: function() {
			null !== this._x1 &&
				((this._x1 = this._x0), (this._y1 = this._y0), (this._ += "Z"));
		},
		lineTo: function(t, e) {
			this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +e);
		},
		quadraticCurveTo: function(t, e, n, r) {
			this._ +=
				"Q" + +t + "," + +e + "," + (this._x1 = +n) + "," + (this._y1 = +r);
		},
		bezierCurveTo: function(t, e, n, r, a, f) {
			this._ +=
				"C" +
				+t +
				"," +
				+e +
				"," +
				+n +
				"," +
				+r +
				"," +
				(this._x1 = +a) +
				"," +
				(this._y1 = +f);
		},
		arcTo: function(t, e, n, r, a) {
			(t = +t), (e = +e), (n = +n), (r = +r), (a = +a);
			var f = this._x1,
				i = this._y1,
				c = n - t,
				o = r - e,
				u = f - t,
				s = i - e,
				d = u * u + s * s;
			if (a < 0) throw new Error("negative radius: " + a);
			if (null === this._x1)
				this._ += "M" + (this._x1 = t) + "," + (this._y1 = e);
			else if (Pn < d)
				if (Math.abs(s * c - o * u) > Pn && a) {
					var l = n - f,
						h = r - i,
						b = c * c + o * o,
						p = l * l + h * h,
						g = Math.sqrt(b),
						y = Math.sqrt(d),
						v = a * Math.tan((kn - Math.acos((b + d - p) / (2 * g * y))) / 2),
						m = v / y,
						_ = v / g;
					Math.abs(m - 1) > Pn &&
						(this._ += "L" + (t + m * u) + "," + (e + m * s)), (this._ +=
						"A" +
						a +
						"," +
						a +
						",0,0," +
						+(u * h < s * l) +
						"," +
						(this._x1 = t + _ * c) +
						"," +
						(this._y1 = e + _ * o));
				} else this._ += "L" + (this._x1 = t) + "," + (this._y1 = e);
			else;
		},
		arc: function(t, e, n, r, a, f) {
			(t = +t), (e = +e);
			var i = (n = +n) * Math.cos(r),
				c = n * Math.sin(r),
				o = t + i,
				u = e + c,
				s = 1 ^ f,
				d = f ? r - a : a - r;
			if (n < 0) throw new Error("negative radius: " + n);
			null === this._x1
				? (this._ += "M" + o + "," + u)
				: (Math.abs(this._x1 - o) > Pn || Math.abs(this._y1 - u) > Pn) &&
					(this._ += "L" + o + "," + u), n &&
				(
					d < 0 && (d = d % Cn + Cn),
					Dn < d
						? (this._ +=
								"A" +
								n +
								"," +
								n +
								",0,1," +
								s +
								"," +
								(t - i) +
								"," +
								(e - c) +
								"A" +
								n +
								"," +
								n +
								",0,1," +
								s +
								"," +
								(this._x1 = o) +
								"," +
								(this._y1 = u))
						: Pn < d &&
							(this._ +=
								"A" +
								n +
								"," +
								n +
								",0," +
								+(kn <= d) +
								"," +
								s +
								"," +
								(this._x1 = t + n * Math.cos(a)) +
								"," +
								(this._y1 = e + n * Math.sin(a)))
				);
		},
		rect: function(t, e, n, r) {
			this._ +=
				"M" +
				(this._x0 = this._x1 = +t) +
				"," +
				(this._y0 = this._y1 = +e) +
				"h" +
				+n +
				"v" +
				+r +
				"h" +
				-n +
				"Z";
		},
		toString: function() {
			return this._;
		}
	};
	var zn = "$";
	function En() {}
	function Fn(t, e) {
		var n = new En();
		if (t instanceof En)
			t.each(function(t, e) {
				n.set(e, t);
			});
		else if (Array.isArray(t)) {
			var r,
				a = -1,
				f = t.length;
			if (null == e) for (; ++a < f; ) n.set(a, t[a]);
			else for (; ++a < f; ) n.set(e((r = t[a]), a, t), r);
		} else if (t) for (var i in t) n.set(i, t[i]);
		return n;
	}
	function qn() {}
	En.prototype = Fn.prototype = {
		constructor: En,
		has: function(t) {
			return zn + t in this;
		},
		get: function(t) {
			return this[zn + t];
		},
		set: function(t, e) {
			return (this[zn + t] = e), this;
		},
		remove: function(t) {
			var e = zn + t;
			return e in this && delete this[e];
		},
		clear: function() {
			for (var t in this) t[0] === zn && delete this[t];
		},
		keys: function() {
			var t = [];
			for (var e in this) e[0] === zn && t.push(e.slice(1));
			return t;
		},
		values: function() {
			var t = [];
			for (var e in this) e[0] === zn && t.push(this[e]);
			return t;
		},
		entries: function() {
			var t = [];
			for (var e in this)
				e[0] === zn && t.push({ key: e.slice(1), value: this[e] });
			return t;
		},
		size: function() {
			var t = 0;
			for (var e in this) e[0] === zn && ++t;
			return t;
		},
		empty: function() {
			for (var t in this) if (t[0] === zn) return !1;
			return !0;
		},
		each: function(t) {
			for (var e in this) e[0] === zn && t(this[e], e.slice(1), this);
		}
	};
	var Yn = Fn.prototype;
	qn.prototype = function(t, e) {
		var n = new qn();
		if (t instanceof qn)
			t.each(function(t) {
				n.add(t);
			});
		else if (t) {
			var r = -1,
				a = t.length;
			if (null == e) for (; ++r < a; ) n.add(t[r]);
			else for (; ++r < a; ) n.add(e(t[r], r, t));
		}
		return n;
	}.prototype = {
		constructor: qn,
		has: Yn.has,
		add: function(t) {
			return (this[zn + (t += "")] = t), this;
		},
		remove: Yn.remove,
		clear: Yn.clear,
		values: Yn.keys,
		size: Yn.size,
		empty: Yn.empty,
		each: Yn.each
	};
	var In = {},
		Ln = {},
		Hn = 34,
		On = 10,
		jn = 13;
	function Rn(t) {
		return new Function(
			"d",
			"return {" +
				t
					.map(function(t, e) {
						return JSON.stringify(t) + ": d[" + e + "]";
					})
					.join(",") +
				"}"
		);
	}
	function Vn(f) {
		var e = new RegExp('["' + f + "\n\r]"),
			d = f.charCodeAt(0);
		function n(r, t) {
			var e,
				n = [],
				a = r.length,
				f = 0,
				i = 0,
				c = a <= 0,
				o = !1;
			function u() {
				if (c) return Ln;
				if (o) return (o = !1), In;
				var t,
					e,
					n = f;
				if (r.charCodeAt(n) === Hn) {
					for (
						;
						(f++ < a && r.charCodeAt(f) !== Hn) || r.charCodeAt(++f) === Hn;

					);
					return (t = f) >= a
						? (c = !0)
						: (e = r.charCodeAt(f++)) === On
							? (o = !0)
							: e === jn && ((o = !0), r.charCodeAt(f) === On && ++f), r
						.slice(n + 1, t - 1)
						.replace(/""/g, '"');
				}
				for (; f < a; ) {
					if ((e = r.charCodeAt((t = f++))) === On) o = !0;
					else if (e === jn) (o = !0), r.charCodeAt(f) === On && ++f;
					else if (e !== d) continue;
					return r.slice(n, t);
				}
				return (c = !0), r.slice(n, a);
			}
			for (
				r.charCodeAt(a - 1) === On && --a, r.charCodeAt(a - 1) === jn && --a;
				(e = u()) !== Ln;

			) {
				for (var s = []; e !== In && e !== Ln; ) s.push(e), (e = u());
				(t && null == (s = t(s, i++))) || n.push(s);
			}
			return n;
		}
		function r(t) {
			return t.map(i).join(f);
		}
		function i(t) {
			return null == t
				? ""
				: e.test((t += "")) ? '"' + t.replace(/"/g, '""') + '"' : t;
		}
		return {
			parse: function(t, f) {
				var i,
					c,
					e = n(t, function(t, e) {
						if (i) return i(t, e - 1);
						var n, r, a;
						(c = t), (i = f
							? (
									(r = f),
									(a = Rn((n = t))),
									function(t, e) {
										return r(a(t), e, n);
									}
								)
							: Rn(t));
					});
				return (e.columns = c || []), e;
			},
			parseRows: n,
			format: function(t, n) {
				var e, r, a;
				return null == n &&
					(
						(e = t),
						(r = Object.create(null)),
						(a = []),
						e.forEach(function(t) {
							for (var e in t) e in r || a.push((r[e] = e));
						}),
						(n = a)
					), [n.map(i).join(f)]
					.concat(
						t.map(function(e) {
							return n
								.map(function(t) {
									return i(e[t]);
								})
								.join(f);
						})
					)
					.join("\n");
			},
			formatRows: function(t) {
				return t.map(r).join("\n");
			}
		};
	}
	Vn(","), Vn("\t");
	function Xn(t, e, n, r) {
		if (isNaN(e) || isNaN(n)) return t;
		var a,
			f,
			i,
			c,
			o,
			u,
			s,
			d,
			l,
			h = t._root,
			b = { data: r },
			p = t._x0,
			g = t._y0,
			y = t._x1,
			v = t._y1;
		if (!h) return (t._root = b), t;
		for (; h.length; )
			if (
				(
					(u = e >= (f = (p + y) / 2)) ? (p = f) : (y = f),
					(s = n >= (i = (g + v) / 2)) ? (g = i) : (v = i),
					!(h = (a = h)[(d = (s << 1) | u)])
				)
			)
				return (a[d] = b), t;
		if (
			(
				(c = +t._x.call(null, h.data)),
				(o = +t._y.call(null, h.data)),
				e === c && n === o
			)
		)
			return (b.next = h), a ? (a[d] = b) : (t._root = b), t;
		for (
			;
			(a = a ? (a[d] = new Array(4)) : (t._root = new Array(4))), (u =
				e >= (f = (p + y) / 2))
				? (p = f)
				: (y = f), (s = n >= (i = (g + v) / 2)) ? (g = i) : (v = i), (d =
				(s << 1) | u) == (l = ((i <= o) << 1) | (f <= c));

		);
		return (a[l] = h), (a[d] = b), t;
	}
	function $n(t, e, n, r, a) {
		(this.node = t), (this.x0 = e), (this.y0 = n), (this.x1 = r), (this.y1 = a);
	}
	function Zn(t) {
		return t[0];
	}
	function Gn(t) {
		return t[1];
	}
	function Bn(t, e, n, r, a, f) {
		(this._x = t), (this._y = e), (this._x0 = n), (this._y0 = r), (this._x1 = a), (this._y1 = f), (this._root = void 0);
	}
	function Qn(t) {
		for (var e = { data: t.data }, n = e; (t = t.next); )
			n = n.next = { data: t.data };
		return e;
	}
	var Wn = (function(t, e, n) {
		var r = new Bn(null == e ? Zn : e, null == n ? Gn : n, NaN, NaN, NaN, NaN);
		return null == t ? r : r.addAll(t);
	}.prototype =
		Bn.prototype);
	(Wn.copy = function() {
		var t,
			e,
			n = new Bn(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
			r = this._root;
		if (!r) return n;
		if (!r.length) return (n._root = Qn(r)), n;
		for (t = [{ source: r, target: (n._root = new Array(4)) }]; (r = t.pop()); )
			for (var a = 0; a < 4; ++a)
				(e = r.source[a]) &&
					(e.length
						? t.push({ source: e, target: (r.target[a] = new Array(4)) })
						: (r.target[a] = Qn(e)));
		return n;
	}), (Wn.add = function(t) {
		var e = +this._x.call(null, t),
			n = +this._y.call(null, t);
		return Xn(this.cover(e, n), e, n, t);
	}), (Wn.addAll = function(t) {
		var e,
			n,
			r,
			a,
			f = t.length,
			i = new Array(f),
			c = new Array(f),
			o = 1 / 0,
			u = 1 / 0,
			s = -1 / 0,
			d = -1 / 0;
		for (n = 0; n < f; ++n)
			isNaN((r = +this._x.call(null, (e = t[n])))) ||
				isNaN((a = +this._y.call(null, e))) ||
				(
					(i[n] = r) < o && (o = r),
					s < r && (s = r),
					(c[n] = a) < u && (u = a),
					d < a && (d = a)
				);
		for (
			s < o && ((o = this._x0), (s = this._x1)), d < u &&
				((u = this._y0), (d = this._y1)), this.cover(o, u).cover(s, d), n = 0;
			n < f;
			++n
		)
			Xn(this, i[n], c[n], t[n]);
		return this;
	}), (Wn.cover = function(t, e) {
		if (isNaN((t = +t)) || isNaN((e = +e))) return this;
		var n = this._x0,
			r = this._y0,
			a = this._x1,
			f = this._y1;
		if (isNaN(n)) (a = (n = Math.floor(t)) + 1), (f = (r = Math.floor(e)) + 1);
		else {
			if (!(t < n || a < t || e < r || f < e)) return this;
			var i,
				c,
				o = a - n,
				u = this._root;
			switch ((c = ((e < (r + f) / 2) << 1) | (t < (n + a) / 2))) {
				case 0:
					for (
						;
						((i = new Array(4))[c] = u), (u = i), (f = r + (o *= 2)), (a =
							n + o) < t || f < e;

					);
					break;
				case 1:
					for (
						;
						((i = new Array(4))[c] = u), (u = i), (f = r + (o *= 2)), t <
							(n = a - o) || f < e;

					);
					break;
				case 2:
					for (
						;
						((i = new Array(4))[c] = u), (u = i), (r = f - (o *= 2)), (a =
							n + o) < t || e < r;

					);
					break;
				case 3:
					for (
						;
						((i = new Array(4))[c] = u), (u = i), (r = f - (o *= 2)), t <
							(n = a - o) || e < r;

					);
			}
			this._root && this._root.length && (this._root = u);
		}
		return (this._x0 = n), (this._y0 = r), (this._x1 = a), (this._y1 = f), this;
	}), (Wn.data = function() {
		var e = [];
		return this.visit(function(t) {
			if (!t.length) for (; e.push(t.data), (t = t.next); );
		}), e;
	}), (Wn.extent = function(t) {
		return arguments.length
			? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
			: isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
	}), (Wn.find = function(t, e, n) {
		var r,
			a,
			f,
			i,
			c,
			o,
			u,
			s = this._x0,
			d = this._y0,
			l = this._x1,
			h = this._y1,
			b = [],
			p = this._root;
		for (
			p && b.push(new $n(p, s, d, l, h)), null == n
				? (n = 1 / 0)
				: ((s = t - n), (d = e - n), (l = t + n), (h = e + n), (n *= n));
			(o = b.pop());

		)
			if (
				!(
					!(p = o.node) ||
					(a = o.x0) > l ||
					(f = o.y0) > h ||
					(i = o.x1) < s ||
					(c = o.y1) < d
				)
			)
				if (p.length) {
					var g = (a + i) / 2,
						y = (f + c) / 2;
					b.push(
						new $n(p[3], g, y, i, c),
						new $n(p[2], a, y, g, c),
						new $n(p[1], g, f, i, y),
						new $n(p[0], a, f, g, y)
					), (u = ((y <= e) << 1) | (g <= t)) &&
						(
							(o = b[b.length - 1]),
							(b[b.length - 1] = b[b.length - 1 - u]),
							(b[b.length - 1 - u] = o)
						);
				} else {
					var v = t - +this._x.call(null, p.data),
						m = e - +this._y.call(null, p.data),
						_ = v * v + m * m;
					if (_ < n) {
						var w = Math.sqrt((n = _));
						(s = t - w), (d = e - w), (l = t + w), (h = e + w), (r = p.data);
					}
				}
		return r;
	}), (Wn.remove = function(t) {
		if (
			isNaN((f = +this._x.call(null, t))) ||
			isNaN((i = +this._y.call(null, t)))
		)
			return this;
		var e,
			n,
			r,
			a,
			f,
			i,
			c,
			o,
			u,
			s,
			d,
			l,
			h = this._root,
			b = this._x0,
			p = this._y0,
			g = this._x1,
			y = this._y1;
		if (!h) return this;
		if (h.length)
			for (;;) {
				if (
					(
						(u = f >= (c = (b + g) / 2)) ? (b = c) : (g = c),
						(s = i >= (o = (p + y) / 2)) ? (p = o) : (y = o),
						!(h = (e = h)[(d = (s << 1) | u)])
					)
				)
					return this;
				if (!h.length) break;
				(e[(d + 1) & 3] || e[(d + 2) & 3] || e[(d + 3) & 3]) &&
					((n = e), (l = d));
			}
		for (; h.data !== t; ) if (!(h = (r = h).next)) return this;
		return (a = h.next) && delete h.next, r
			? a ? (r.next = a) : delete r.next
			: e
				? (
						a ? (e[d] = a) : delete e[d],
						(h = e[0] || e[1] || e[2] || e[3]) &&
							h === (e[3] || e[2] || e[1] || e[0]) &&
							!h.length &&
							(n ? (n[l] = h) : (this._root = h))
					)
				: (this._root = a), this;
	}), (Wn.removeAll = function(t) {
		for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
		return this;
	}), (Wn.root = function() {
		return this._root;
	}), (Wn.size = function() {
		var e = 0;
		return this.visit(function(t) {
			if (!t.length) for (; ++e, (t = t.next); );
		}), e;
	}), (Wn.visit = function(t) {
		var e,
			n,
			r,
			a,
			f,
			i,
			c = [],
			o = this._root;
		for (
			o && c.push(new $n(o, this._x0, this._y0, this._x1, this._y1));
			(e = c.pop());

		)
			if (
				!t((o = e.node), (r = e.x0), (a = e.y0), (f = e.x1), (i = e.y1)) &&
				o.length
			) {
				var u = (r + f) / 2,
					s = (a + i) / 2;
				(n = o[3]) && c.push(new $n(n, u, s, f, i)), (n = o[2]) &&
					c.push(new $n(n, r, s, u, i)), (n = o[1]) &&
					c.push(new $n(n, u, a, f, s)), (n = o[0]) &&
					c.push(new $n(n, r, a, u, s));
			}
		return this;
	}), (Wn.visitAfter = function(t) {
		var e,
			n = [],
			r = [];
		for (
			this._root &&
			n.push(new $n(this._root, this._x0, this._y0, this._x1, this._y1));
			(e = n.pop());

		) {
			var a = e.node;
			if (a.length) {
				var f,
					i = e.x0,
					c = e.y0,
					o = e.x1,
					u = e.y1,
					s = (i + o) / 2,
					d = (c + u) / 2;
				(f = a[0]) && n.push(new $n(f, i, c, s, d)), (f = a[1]) &&
					n.push(new $n(f, s, c, o, d)), (f = a[2]) &&
					n.push(new $n(f, i, d, s, u)), (f = a[3]) &&
					n.push(new $n(f, s, d, o, u));
			}
			r.push(e);
		}
		for (; (e = r.pop()); ) t(e.node, e.x0, e.y0, e.x1, e.y1);
		return this;
	}), (Wn.x = function(t) {
		return arguments.length ? ((this._x = t), this) : this._x;
	}), (Wn.y = function(t) {
		return arguments.length ? ((this._y = t), this) : this._y;
	});
	var Jn;
	Math.PI, Math.sqrt(5);
	function Kn(t, e) {
		if (
			(n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) <
			0
		)
			return null;
		var n,
			r = t.slice(0, n);
		return [1 < r.length ? r[0] + r.slice(2) : r, +t.slice(n + 1)];
	}
	function tr(t) {
		return (t = Kn(Math.abs(t))) ? t[1] : NaN;
	}
	function er(t, e) {
		var n = Kn(t, e);
		if (!n) return t + "";
		var r = n[0],
			a = n[1];
		return a < 0
			? "0." + new Array(-a).join("0") + r
			: r.length > a + 1
				? r.slice(0, a + 1) + "." + r.slice(a + 1)
				: r + new Array(a - r.length + 2).join("0");
	}
	var nr = {
			"": function(t, e) {
				t: for (
					var n, r = (t = t.toPrecision(e)).length, a = 1, f = -1;
					a < r;
					++a
				)
					switch (t[a]) {
						case ".":
							f = n = a;
							break;
						case "0":
							0 === f && (f = a), (n = a);
							break;
						case "e":
							break t;
						default:
							0 < f && (f = 0);
					}
				return 0 < f ? t.slice(0, f) + t.slice(n + 1) : t;
			},
			"%": function(t, e) {
				return (100 * t).toFixed(e);
			},
			b: function(t) {
				return Math.round(t).toString(2);
			},
			c: function(t) {
				return t + "";
			},
			d: function(t) {
				return Math.round(t).toString(10);
			},
			e: function(t, e) {
				return t.toExponential(e);
			},
			f: function(t, e) {
				return t.toFixed(e);
			},
			g: function(t, e) {
				return t.toPrecision(e);
			},
			o: function(t) {
				return Math.round(t).toString(8);
			},
			p: function(t, e) {
				return er(100 * t, e);
			},
			r: er,
			s: function(t, e) {
				var n = Kn(t, e);
				if (!n) return t + "";
				var r = n[0],
					a = n[1],
					f = a - (Jn = 3 * Math.max(-8, Math.min(8, Math.floor(a / 3)))) + 1,
					i = r.length;
				return f === i
					? r
					: i < f
						? r + new Array(f - i + 1).join("0")
						: 0 < f
							? r.slice(0, f) + "." + r.slice(f)
							: "0." +
								new Array(1 - f).join("0") +
								Kn(t, Math.max(0, e + f - 1))[0];
			},
			X: function(t) {
				return Math.round(t).toString(16).toUpperCase();
			},
			x: function(t) {
				return Math.round(t).toString(16);
			}
		},
		rr = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
	function ar(t) {
		return new fr(t);
	}
	function fr(t) {
		if (!(e = rr.exec(t))) throw new Error("invalid format: " + t);
		var e,
			n = e[1] || " ",
			r = e[2] || ">",
			a = e[3] || "-",
			f = e[4] || "",
			i = !!e[5],
			c = e[6] && +e[6],
			o = !!e[7],
			u = e[8] && +e[8].slice(1),
			s = e[9] || "";
		"n" === s
			? ((o = !0), (s = "g"))
			: nr[s] ||
				(s =
					""), (i || ("0" === n && "=" === r)) && ((i = !0), (n = "0"), (r = "=")), (this.fill = n), (this.align = r), (this.sign = a), (this.symbol = f), (this.zero = i), (this.width = c), (this.comma = o), (this.precision = u), (this.type = s);
	}
	function ir(t) {
		return t;
	}
	(ar.prototype = fr.prototype), (fr.prototype.toString = function() {
		return (
			this.fill +
			this.align +
			this.sign +
			this.symbol +
			(this.zero ? "0" : "") +
			(null == this.width ? "" : Math.max(1, 0 | this.width)) +
			(this.comma ? "," : "") +
			(null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) +
			this.type
		);
	});
	var cr,
		or,
		ur,
		sr = [
			"y",
			"z",
			"a",
			"f",
			"p",
			"n",
			"µ",
			"m",
			"",
			"k",
			"M",
			"G",
			"T",
			"P",
			"E",
			"Z",
			"Y"
		];
	function dr(t) {
		var e,
			c,
			o,
			w =
				t.grouping && t.thousands
					? (
							(c = t.grouping),
							(o = t.thousands),
							function(t, e) {
								for (
									var n = t.length, r = [], a = 0, f = c[0], i = 0;
									0 < n &&
									0 < f &&
									(
										e < i + f + 1 && (f = Math.max(1, e - i)),
										r.push(t.substring((n -= f), n + f)),
										!((i += f + 1) > e)
									);

								)
									f = c[(a = (a + 1) % c.length)];
								return r.reverse().join(o);
							}
						)
					: ir,
			r = t.currency,
			x = t.decimal,
			M = t.numerals
				? (
						(e = t.numerals),
						function(t) {
							return t.replace(/[0-9]/g, function(t) {
								return e[+t];
							});
						}
					)
				: ir,
			a = t.percent || "%";
		function i(t) {
			var u = (t = ar(t)).fill,
				s = t.align,
				d = t.sign,
				e = t.symbol,
				l = t.zero,
				h = t.width,
				b = t.comma,
				p = t.precision,
				g = t.type,
				y =
					"$" === e
						? r[0]
						: "#" === e && /[boxX]/.test(g) ? "0" + g.toLowerCase() : "",
				v = "$" === e ? r[1] : /[%p]/.test(g) ? a : "",
				m = nr[g],
				_ = !g || /[defgprs%]/.test(g);
			function n(t) {
				var e,
					n,
					r,
					a = y,
					f = v;
				if ("c" === g) (f = m(t) + f), (t = "");
				else {
					var i = (t = +t) < 0;
					if (
						(
							(t = m(Math.abs(t), p)),
							i && 0 == +t && (i = !1),
							(a =
								(i ? ("(" === d ? d : "-") : "-" === d || "(" === d ? "" : d) +
								a),
							(f =
								("s" === g ? sr[8 + Jn / 3] : "") +
								f +
								(i && "(" === d ? ")" : "")),
							_
						)
					)
						for (e = -1, n = t.length; ++e < n; )
							if ((r = t.charCodeAt(e)) < 48 || 57 < r) {
								(f =
									(46 === r ? x + t.slice(e + 1) : t.slice(e)) +
									f), (t = t.slice(0, e));
								break;
							}
				}
				b && !l && (t = w(t, 1 / 0));
				var c = a.length + t.length + f.length,
					o = c < h ? new Array(h - c + 1).join(u) : "";
				switch ((
					b && l && ((t = w(o + t, o.length ? h - f.length : 1 / 0)), (o = "")),
					s
				)) {
					case "<":
						t = a + t + f + o;
						break;
					case "=":
						t = a + o + t + f;
						break;
					case "^":
						t = o.slice(0, (c = o.length >> 1)) + a + t + f + o.slice(c);
						break;
					default:
						t = o + a + t + f;
				}
				return M(t);
			}
			return (p =
				null == p
					? g ? 6 : 12
					: /[gprs]/.test(g)
						? Math.max(1, Math.min(21, p))
						: Math.max(0, Math.min(20, p))), (n.toString = function() {
				return t + "";
			}), n;
		}
		return {
			format: i,
			formatPrefix: function(t, e) {
				var n = i((((t = ar(t)).type = "f"), t)),
					r = 3 * Math.max(-8, Math.min(8, Math.floor(tr(e) / 3))),
					a = Math.pow(10, -r),
					f = sr[8 + r / 3];
				return function(t) {
					return n(a * t) + f;
				};
			}
		};
	}
	function lr() {
		return new hr();
	}
	function hr() {
		this.reset();
	}
	(cr = dr({
		decimal: ".",
		thousands: ",",
		grouping: [3],
		currency: ["$", ""]
	})), (or = cr.format), (ur = cr.formatPrefix), (hr.prototype = {
		constructor: hr,
		reset: function() {
			this.s = this.t = 0;
		},
		add: function(t) {
			pr(br, t, this.t), pr(this, br.s, this.s), this.s
				? (this.t += br.t)
				: (this.s = br.t);
		},
		valueOf: function() {
			return this.s;
		}
	});
	var br = new hr();
	function pr(t, e, n) {
		var r = (t.s = e + n),
			a = r - e,
			f = r - a;
		t.t = e - f + (n - a);
	}
	Math.PI, lr(), lr(), lr(), lr(), lr(), lr(), lr(), lr();
	var gr = Array.prototype,
		yr = gr.map,
		vr = gr.slice,
		mr = { name: "implicit" };
	function _r() {
		var f,
			i,
			t = (function t(r) {
				var f = Fn(),
					i = [],
					a = mr;
				function c(t) {
					var e = t + "",
						n = f.get(e);
					if (!n) {
						if (a !== mr) return a;
						f.set(e, (n = i.push(t)));
					}
					return r[(n - 1) % r.length];
				}
				return (r = null == r ? [] : vr.call(r)), (c.domain = function(t) {
					if (!arguments.length) return i.slice();
					(i = []), (f = Fn());
					for (var e, n, r = -1, a = t.length; ++r < a; )
						f.has((n = (e = t[r]) + "")) || f.set(n, i.push(e));
					return c;
				}), (c.range = function(t) {
					return arguments.length ? ((r = vr.call(t)), c) : r.slice();
				}), (c.unknown = function(t) {
					return arguments.length ? ((a = t), c) : a;
				}), (c.copy = function() {
					return t().domain(i).range(r).unknown(a);
				}), c;
			})().unknown(void 0),
			c = t.domain,
			o = t.range,
			u = [0, 1],
			s = !1,
			d = 0,
			l = 0,
			h = 0.5;
		function e() {
			var t = c().length,
				e = u[1] < u[0],
				n = u[e - 0],
				r = u[1 - e];
			(f =
				(r - n) /
				Math.max(
					1,
					t - d + 2 * l
				)), s && (f = Math.floor(f)), (n += (r - n - f * (t - d)) * h), (i = f * (1 - d)), s && ((n = Math.round(n)), (i = Math.round(i)));
			var a = C(t).map(function(t) {
				return n + f * t;
			});
			return o(e ? a.reverse() : a);
		}
		return delete t.unknown, (t.domain = function(t) {
			return arguments.length ? (c(t), e()) : c();
		}), (t.range = function(t) {
			return arguments.length ? ((u = [+t[0], +t[1]]), e()) : u.slice();
		}), (t.rangeRound = function(t) {
			return (u = [+t[0], +t[1]]), (s = !0), e();
		}), (t.bandwidth = function() {
			return i;
		}), (t.step = function() {
			return f;
		}), (t.round = function(t) {
			return arguments.length ? ((s = !!t), e()) : s;
		}), (t.padding = function(t) {
			return arguments.length
				? ((d = l = Math.max(0, Math.min(1, t))), e())
				: d;
		}), (t.paddingInner = function(t) {
			return arguments.length ? ((d = Math.max(0, Math.min(1, t))), e()) : d;
		}), (t.paddingOuter = function(t) {
			return arguments.length ? ((l = Math.max(0, Math.min(1, t))), e()) : l;
		}), (t.align = function(t) {
			return arguments.length ? ((h = Math.max(0, Math.min(1, t))), e()) : h;
		}), (t.copy = function() {
			return _r()
				.domain(c())
				.range(u)
				.round(s)
				.paddingInner(d)
				.paddingOuter(l)
				.align(h);
		}), e();
	}
	function wr() {
		return (function t(e) {
			var n = e.copy;
			return (e.padding =
				e.paddingOuter), delete e.paddingInner, delete e.paddingOuter, (e.copy = function() {
				return t(n());
			}), e;
		})(_r().paddingInner(1));
	}
	function xr(t) {
		return +t;
	}
	var Mr = [0, 1];
	function Ar(e, n) {
		return (n -= e = +e)
			? function(t) {
					return (t - e) / n;
				}
			: (
					(t = n),
					function() {
						return t;
					}
				);
		var t;
	}
	function Tr(t, e, n, r) {
		var a = t[0],
			f = t[1],
			i = e[0],
			c = e[1];
		return f < a
			? ((a = n(f, a)), (i = r(c, i)))
			: ((a = n(a, f)), (i = r(i, c))), function(t) {
			return i(a(t));
		};
	}
	function Nr(n, t, e, r) {
		var a = Math.min(n.length, t.length) - 1,
			f = new Array(a),
			i = new Array(a),
			c = -1;
		for (
			n[a] < n[0] && ((n = n.slice().reverse()), (t = t.slice().reverse()));
			++c < a;

		)
			(f[c] = e(n[c], n[c + 1])), (i[c] = r(t[c], t[c + 1]));
		return function(t) {
			var e = o(n, t, 1, a) - 1;
			return i[e](f[e](t));
		};
	}
	function kr(t, e, n) {
		var r,
			a,
			f,
			i,
			c,
			o,
			u,
			s,
			d,
			l,
			h,
			b,
			p = t[0],
			g = t[t.length - 1],
			y = (
				(a = p),
				(f = g),
				(i = null == e ? 10 : e),
				(c = Math.abs(f - a) / Math.max(0, i)),
				(o = Math.pow(10, Math.floor(Math.log(c) / Math.LN10))),
				m <= (u = c / o) ? (o *= 10) : _ <= u ? (o *= 5) : w <= u && (o *= 2),
				f < a ? -o : o
			);
		switch ((n = ar(null == n ? ",f" : n)).type) {
			case "s":
				var v = Math.max(Math.abs(p), Math.abs(g));
				return null != n.precision ||
					isNaN(
						(
							(h = y),
							(b = v),
							(r = Math.max(
								0,
								3 * Math.max(-8, Math.min(8, Math.floor(tr(b) / 3))) -
									tr(Math.abs(h))
							))
						)
					) ||
					(n.precision = r), ur(n, v);
			case "":
			case "e":
			case "g":
			case "p":
			case "r":
				null != n.precision ||
					isNaN(
						(
							(d = y),
							(l = Math.max(Math.abs(p), Math.abs(g))),
							(d = Math.abs(d)),
							(l = Math.abs(l) - d),
							(r = Math.max(0, tr(l) - tr(d)) + 1)
						)
					) ||
					(n.precision = r - ("e" === n.type));
				break;
			case "f":
			case "%":
				null != n.precision ||
					isNaN(((s = y), (r = Math.max(0, -tr(Math.abs(s)))))) ||
					(n.precision = r - 2 * ("%" === n.type));
		}
		return or(n);
	}
	function Cr(c) {
		var o = c.domain;
		return (c.ticks = function(t) {
			var e = o();
			return (function(t, e, n) {
				var r,
					a,
					f,
					i,
					c = -1;
				if (((n = +n), (t = +t) == (e = +e) && 0 < n)) return [t];
				if (
					(
						(r = e < t) && ((a = t), (t = e), (e = a)),
						0 === (i = u(t, e, n)) || !isFinite(i)
					)
				)
					return [];
				if (0 < i)
					for (
						t = Math.ceil(t / i), e = Math.floor(e / i), f = new Array(
							(a = Math.ceil(e - t + 1))
						);
						++c < a;

					)
						f[c] = (t + c) * i;
				else
					for (
						t = Math.floor(t * i), e = Math.ceil(e * i), f = new Array(
							(a = Math.ceil(t - e + 1))
						);
						++c < a;

					)
						f[c] = (t - c) / i;
				return r && f.reverse(), f;
			})(e[0], e[e.length - 1], null == t ? 10 : t);
		}), (c.tickFormat = function(t, e) {
			return kr(o(), t, e);
		}), (c.nice = function(t) {
			null == t && (t = 10);
			var e,
				n = o(),
				r = 0,
				a = n.length - 1,
				f = n[r],
				i = n[a];
			return i < f &&
				((e = f), (f = i), (i = e), (e = r), (r = a), (a = e)), 0 <
			(e = u(f, i, t))
				? (e = u((f = Math.floor(f / e) * e), (i = Math.ceil(i / e) * e), t))
				: e < 0 &&
					(e = u(
						(f = Math.ceil(f * e) / e),
						(i = Math.floor(i * e) / e),
						t
					)), 0 < e
				? ((n[r] = Math.floor(f / e) * e), (n[a] = Math.ceil(i / e) * e), o(n))
				: e < 0 &&
					(
						(n[r] = Math.ceil(f * e) / e),
						(n[a] = Math.floor(i * e) / e),
						o(n)
					), c;
		}), c;
	}
	function Pr() {
		var e = (function(e, n) {
			var r,
				f,
				i,
				c = Mr,
				o = Mr,
				u = Ae,
				s = !1;
			function a() {
				return (r =
					2 < Math.min(c.length, o.length) ? Nr : Tr), (f = i = null), t;
			}
			function t(t) {
				return (f ||
					(f = r(
						c,
						o,
						s
							? (
									(a = e),
									function(e, n) {
										var r = a((e = +e), (n = +n));
										return function(t) {
											return t <= e ? 0 : n <= t ? 1 : r(t);
										};
									}
								)
							: e,
						u
					)))(+t);
				var a;
			}
			return (t.invert = function(t) {
				return (i ||
					(i = r(
						o,
						c,
						Ar,
						s
							? (
									(a = n),
									function(e, n) {
										var r = a((e = +e), (n = +n));
										return function(t) {
											return t <= 0 ? e : 1 <= t ? n : r(t);
										};
									}
								)
							: n
					)))(+t);
				var a;
			}), (t.domain = function(t) {
				return arguments.length ? ((c = yr.call(t, xr)), a()) : c.slice();
			}), (t.range = function(t) {
				return arguments.length ? ((o = vr.call(t)), a()) : o.slice();
			}), (t.rangeRound = function(t) {
				return (o = vr.call(t)), (u = Te), a();
			}), (t.clamp = function(t) {
				return arguments.length ? ((s = !!t), a()) : s;
			}), (t.interpolate = function(t) {
				return arguments.length ? ((u = t), a()) : u;
			}), a();
		})(Ar, _e);
		return (e.copy = function() {
			return (t = e), Pr()
				.domain(t.domain())
				.range(t.range())
				.interpolate(t.interpolate())
				.clamp(t.clamp());
			var t;
		}), Cr(e);
	}
	var Dr = new Date(),
		Ur = new Date();
	function Sr(f, i, n, r) {
		function c(t) {
			return f((t = new Date(+t))), t;
		}
		return ((c.floor = c).ceil = function(t) {
			return f((t = new Date(t - 1))), i(t, 1), f(t), t;
		}), (c.round = function(t) {
			var e = c(t),
				n = c.ceil(t);
			return t - e < n - t ? e : n;
		}), (c.offset = function(t, e) {
			return i((t = new Date(+t)), null == e ? 1 : Math.floor(e)), t;
		}), (c.range = function(t, e, n) {
			var r,
				a = [];
			if (
				(
					(t = c.ceil(t)),
					(n = null == n ? 1 : Math.floor(n)),
					!(t < e && 0 < n)
				)
			)
				return a;
			for (; a.push((r = new Date(+t))), i(t, n), f(t), r < t && t < e; );
			return a;
		}), (c.filter = function(n) {
			return Sr(
				function(t) {
					if (t <= t) for (; f(t), !n(t); ) t.setTime(t - 1);
				},
				function(t, e) {
					if (t <= t)
						if (e < 0) for (; ++e <= 0; ) for (; i(t, -1), !n(t); );
						else for (; 0 <= --e; ) for (; i(t, 1), !n(t); );
				}
			);
		}), n &&
			(
				(c.count = function(t, e) {
					return Dr.setTime(+t), Ur.setTime(+e), f(Dr), f(Ur), Math.floor(
						n(Dr, Ur)
					);
				}),
				(c.every = function(e) {
					return (e = Math.floor(e)), isFinite(e) && 0 < e
						? 1 < e
							? c.filter(
									r
										? function(t) {
												return r(t) % e == 0;
											}
										: function(t) {
												return c.count(0, t) % e == 0;
											}
								)
							: c
						: null;
				})
			), c;
	}
	var zr = Sr(
		function() {},
		function(t, e) {
			t.setTime(+t + e);
		},
		function(t, e) {
			return e - t;
		}
	);
	zr.every = function(n) {
		return (n = Math.floor(n)), isFinite(n) && 0 < n
			? 1 < n
				? Sr(
						function(t) {
							t.setTime(Math.floor(t / n) * n);
						},
						function(t, e) {
							t.setTime(+t + e * n);
						},
						function(t, e) {
							return (e - t) / n;
						}
					)
				: zr
			: null;
	};
	var Er = 6e4,
		Fr = 36e5,
		qr = 6048e5,
		Yr = (
			Sr(
				function(t) {
					t.setTime(1e3 * Math.floor(t / 1e3));
				},
				function(t, e) {
					t.setTime(+t + 1e3 * e);
				},
				function(t, e) {
					return (e - t) / 1e3;
				},
				function(t) {
					return t.getUTCSeconds();
				}
			),
			Sr(
				function(t) {
					t.setTime(Math.floor(t / Er) * Er);
				},
				function(t, e) {
					t.setTime(+t + e * Er);
				},
				function(t, e) {
					return (e - t) / Er;
				},
				function(t) {
					return t.getMinutes();
				}
			),
			Sr(
				function(t) {
					var e = t.getTimezoneOffset() * Er % Fr;
					e < 0 && (e += Fr), t.setTime(Math.floor((+t - e) / Fr) * Fr + e);
				},
				function(t, e) {
					t.setTime(+t + e * Fr);
				},
				function(t, e) {
					return (e - t) / Fr;
				},
				function(t) {
					return t.getHours();
				}
			),
			Sr(
				function(t) {
					t.setHours(0, 0, 0, 0);
				},
				function(t, e) {
					t.setDate(t.getDate() + e);
				},
				function(t, e) {
					return (
						(e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * Er) /
						864e5
					);
				},
				function(t) {
					return t.getDate() - 1;
				}
			)
		);
	function Ir(e) {
		return Sr(
			function(t) {
				t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(
					0,
					0,
					0,
					0
				);
			},
			function(t, e) {
				t.setDate(t.getDate() + 7 * e);
			},
			function(t, e) {
				return (
					(e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * Er) / qr
				);
			}
		);
	}
	var Lr = Ir(0),
		Hr = Ir(1),
		Or = (Ir(2), Ir(3), Ir(4)),
		jr = (
			Ir(5),
			Ir(6),
			Sr(
				function(t) {
					t.setDate(1), t.setHours(0, 0, 0, 0);
				},
				function(t, e) {
					t.setMonth(t.getMonth() + e);
				},
				function(t, e) {
					return (
						e.getMonth() -
						t.getMonth() +
						12 * (e.getFullYear() - t.getFullYear())
					);
				},
				function(t) {
					return t.getMonth();
				}
			),
			Sr(
				function(t) {
					t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
				},
				function(t, e) {
					t.setFullYear(t.getFullYear() + e);
				},
				function(t, e) {
					return e.getFullYear() - t.getFullYear();
				},
				function(t) {
					return t.getFullYear();
				}
			)
		);
	jr.every = function(n) {
		return isFinite((n = Math.floor(n))) && 0 < n
			? Sr(
					function(t) {
						t.setFullYear(Math.floor(t.getFullYear() / n) * n), t.setMonth(
							0,
							1
						), t.setHours(0, 0, 0, 0);
					},
					function(t, e) {
						t.setFullYear(t.getFullYear() + e * n);
					}
				)
			: null;
	};
	Sr(
		function(t) {
			t.setUTCSeconds(0, 0);
		},
		function(t, e) {
			t.setTime(+t + e * Er);
		},
		function(t, e) {
			return (e - t) / Er;
		},
		function(t) {
			return t.getUTCMinutes();
		}
	), Sr(
		function(t) {
			t.setUTCMinutes(0, 0, 0);
		},
		function(t, e) {
			t.setTime(+t + e * Fr);
		},
		function(t, e) {
			return (e - t) / Fr;
		},
		function(t) {
			return t.getUTCHours();
		}
	);
	var Rr = Sr(
		function(t) {
			t.setUTCHours(0, 0, 0, 0);
		},
		function(t, e) {
			t.setUTCDate(t.getUTCDate() + e);
		},
		function(t, e) {
			return (e - t) / 864e5;
		},
		function(t) {
			return t.getUTCDate() - 1;
		}
	);
	function Vr(e) {
		return Sr(
			function(t) {
				t.setUTCDate(
					t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7
				), t.setUTCHours(0, 0, 0, 0);
			},
			function(t, e) {
				t.setUTCDate(t.getUTCDate() + 7 * e);
			},
			function(t, e) {
				return (e - t) / qr;
			}
		);
	}
	var Xr = Vr(0),
		$r = Vr(1),
		Zr = (Vr(2), Vr(3), Vr(4)),
		Gr = (
			Vr(5),
			Vr(6),
			Sr(
				function(t) {
					t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
				},
				function(t, e) {
					t.setUTCMonth(t.getUTCMonth() + e);
				},
				function(t, e) {
					return (
						e.getUTCMonth() -
						t.getUTCMonth() +
						12 * (e.getUTCFullYear() - t.getUTCFullYear())
					);
				},
				function(t) {
					return t.getUTCMonth();
				}
			),
			Sr(
				function(t) {
					t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
				},
				function(t, e) {
					t.setUTCFullYear(t.getUTCFullYear() + e);
				},
				function(t, e) {
					return e.getUTCFullYear() - t.getUTCFullYear();
				},
				function(t) {
					return t.getUTCFullYear();
				}
			)
		);
	function Br(t) {
		if (0 <= t.y && t.y < 100) {
			var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
			return e.setFullYear(t.y), e;
		}
		return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
	}
	function Qr(t) {
		if (0 <= t.y && t.y < 100) {
			var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
			return e.setUTCFullYear(t.y), e;
		}
		return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
	}
	function Wr(t) {
		return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
	}
	Gr.every = function(n) {
		return isFinite((n = Math.floor(n))) && 0 < n
			? Sr(
					function(t) {
						t.setUTCFullYear(
							Math.floor(t.getUTCFullYear() / n) * n
						), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
					},
					function(t, e) {
						t.setUTCFullYear(t.getUTCFullYear() + e * n);
					}
				)
			: null;
	};
	var Jr,
		Kr,
		ta,
		ea = { "-": "", _: " ", 0: "0" },
		na = /^\s*\d+/,
		ra = /^%/,
		aa = /[\\^$*+?|[\]().{}]/g;
	function fa(t, e, n) {
		var r = t < 0 ? "-" : "",
			a = (r ? -t : t) + "",
			f = a.length;
		return r + (f < n ? new Array(n - f + 1).join(e) + a : a);
	}
	function ia(t) {
		return t.replace(aa, "\\$&");
	}
	function ca(t) {
		return new RegExp("^(?:" + t.map(ia).join("|") + ")", "i");
	}
	function oa(t) {
		for (var e = {}, n = -1, r = t.length; ++n < r; ) e[t[n].toLowerCase()] = n;
		return e;
	}
	function ua(t, e, n) {
		var r = na.exec(e.slice(n, n + 1));
		return r ? ((t.w = +r[0]), n + r[0].length) : -1;
	}
	function sa(t, e, n) {
		var r = na.exec(e.slice(n, n + 1));
		return r ? ((t.u = +r[0]), n + r[0].length) : -1;
	}
	function da(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.U = +r[0]), n + r[0].length) : -1;
	}
	function la(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.V = +r[0]), n + r[0].length) : -1;
	}
	function ha(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.W = +r[0]), n + r[0].length) : -1;
	}
	function ba(t, e, n) {
		var r = na.exec(e.slice(n, n + 4));
		return r ? ((t.y = +r[0]), n + r[0].length) : -1;
	}
	function pa(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r
			? ((t.y = +r[0] + (68 < +r[0] ? 1900 : 2e3)), n + r[0].length)
			: -1;
	}
	function ga(t, e, n) {
		var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
		return r
			? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), n + r[0].length)
			: -1;
	}
	function ya(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.m = r[0] - 1), n + r[0].length) : -1;
	}
	function va(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.d = +r[0]), n + r[0].length) : -1;
	}
	function ma(t, e, n) {
		var r = na.exec(e.slice(n, n + 3));
		return r ? ((t.m = 0), (t.d = +r[0]), n + r[0].length) : -1;
	}
	function _a(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.H = +r[0]), n + r[0].length) : -1;
	}
	function wa(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.M = +r[0]), n + r[0].length) : -1;
	}
	function xa(t, e, n) {
		var r = na.exec(e.slice(n, n + 2));
		return r ? ((t.S = +r[0]), n + r[0].length) : -1;
	}
	function Ma(t, e, n) {
		var r = na.exec(e.slice(n, n + 3));
		return r ? ((t.L = +r[0]), n + r[0].length) : -1;
	}
	function Aa(t, e, n) {
		var r = na.exec(e.slice(n, n + 6));
		return r ? ((t.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
	}
	function Ta(t, e, n) {
		var r = ra.exec(e.slice(n, n + 1));
		return r ? n + r[0].length : -1;
	}
	function Na(t, e, n) {
		var r = na.exec(e.slice(n));
		return r ? ((t.Q = +r[0]), n + r[0].length) : -1;
	}
	function ka(t, e, n) {
		var r = na.exec(e.slice(n));
		return r ? ((t.Q = 1e3 * +r[0]), n + r[0].length) : -1;
	}
	function Ca(t, e) {
		return fa(t.getDate(), e, 2);
	}
	function Pa(t, e) {
		return fa(t.getHours(), e, 2);
	}
	function Da(t, e) {
		return fa(t.getHours() % 12 || 12, e, 2);
	}
	function Ua(t, e) {
		return fa(1 + Yr.count(jr(t), t), e, 3);
	}
	function Sa(t, e) {
		return fa(t.getMilliseconds(), e, 3);
	}
	function za(t, e) {
		return Sa(t, e) + "000";
	}
	function Ea(t, e) {
		return fa(t.getMonth() + 1, e, 2);
	}
	function Fa(t, e) {
		return fa(t.getMinutes(), e, 2);
	}
	function qa(t, e) {
		return fa(t.getSeconds(), e, 2);
	}
	function Ya(t) {
		var e = t.getDay();
		return 0 === e ? 7 : e;
	}
	function Ia(t, e) {
		return fa(Lr.count(jr(t), t), e, 2);
	}
	function La(t, e) {
		var n = t.getDay();
		return (t =
			4 <= n || 0 === n
				? Or(t)
				: Or.ceil(t)), fa(Or.count(jr(t), t) + (4 === jr(t).getDay()), e, 2);
	}
	function Ha(t) {
		return t.getDay();
	}
	function Oa(t, e) {
		return fa(Hr.count(jr(t), t), e, 2);
	}
	function ja(t, e) {
		return fa(t.getFullYear() % 100, e, 2);
	}
	function Ra(t, e) {
		return fa(t.getFullYear() % 1e4, e, 4);
	}
	function Va(t) {
		var e = t.getTimezoneOffset();
		return (
			(0 < e ? "-" : ((e *= -1), "+")) +
			fa((e / 60) | 0, "0", 2) +
			fa(e % 60, "0", 2)
		);
	}
	function Xa(t, e) {
		return fa(t.getUTCDate(), e, 2);
	}
	function $a(t, e) {
		return fa(t.getUTCHours(), e, 2);
	}
	function Za(t, e) {
		return fa(t.getUTCHours() % 12 || 12, e, 2);
	}
	function Ga(t, e) {
		return fa(1 + Rr.count(Gr(t), t), e, 3);
	}
	function Ba(t, e) {
		return fa(t.getUTCMilliseconds(), e, 3);
	}
	function Qa(t, e) {
		return Ba(t, e) + "000";
	}
	function Wa(t, e) {
		return fa(t.getUTCMonth() + 1, e, 2);
	}
	function Ja(t, e) {
		return fa(t.getUTCMinutes(), e, 2);
	}
	function Ka(t, e) {
		return fa(t.getUTCSeconds(), e, 2);
	}
	function tf(t) {
		var e = t.getUTCDay();
		return 0 === e ? 7 : e;
	}
	function ef(t, e) {
		return fa(Xr.count(Gr(t), t), e, 2);
	}
	function nf(t, e) {
		var n = t.getUTCDay();
		return (t =
			4 <= n || 0 === n
				? Zr(t)
				: Zr.ceil(t)), fa(Zr.count(Gr(t), t) + (4 === Gr(t).getUTCDay()), e, 2);
	}
	function rf(t) {
		return t.getUTCDay();
	}
	function af(t, e) {
		return fa($r.count(Gr(t), t), e, 2);
	}
	function ff(t, e) {
		return fa(t.getUTCFullYear() % 100, e, 2);
	}
	function cf(t, e) {
		return fa(t.getUTCFullYear() % 1e4, e, 4);
	}
	function of() {
		return "+0000";
	}
	function uf() {
		return "%";
	}
	function sf(t) {
		return +t;
	}
	function df(t) {
		return Math.floor(+t / 1e3);
	}
	(Jr = (function(t) {
		var r = t.dateTime,
			a = t.date,
			f = t.time,
			e = t.periods,
			n = t.days,
			i = t.shortDays,
			c = t.months,
			o = t.shortMonths,
			u = ca(e),
			s = oa(e),
			d = ca(n),
			l = oa(n),
			h = ca(i),
			b = oa(i),
			p = ca(c),
			g = oa(c),
			y = ca(o),
			v = oa(o),
			m = {
				a: function(t) {
					return i[t.getDay()];
				},
				A: function(t) {
					return n[t.getDay()];
				},
				b: function(t) {
					return o[t.getMonth()];
				},
				B: function(t) {
					return c[t.getMonth()];
				},
				c: null,
				d: Ca,
				e: Ca,
				f: za,
				H: Pa,
				I: Da,
				j: Ua,
				L: Sa,
				m: Ea,
				M: Fa,
				p: function(t) {
					return e[+(12 <= t.getHours())];
				},
				Q: sf,
				s: df,
				S: qa,
				u: Ya,
				U: Ia,
				V: La,
				w: Ha,
				W: Oa,
				x: null,
				X: null,
				y: ja,
				Y: Ra,
				Z: Va,
				"%": uf
			},
			_ = {
				a: function(t) {
					return i[t.getUTCDay()];
				},
				A: function(t) {
					return n[t.getUTCDay()];
				},
				b: function(t) {
					return o[t.getUTCMonth()];
				},
				B: function(t) {
					return c[t.getUTCMonth()];
				},
				c: null,
				d: Xa,
				e: Xa,
				f: Qa,
				H: $a,
				I: Za,
				j: Ga,
				L: Ba,
				m: Wa,
				M: Ja,
				p: function(t) {
					return e[+(12 <= t.getUTCHours())];
				},
				Q: sf,
				s: df,
				S: Ka,
				u: tf,
				U: ef,
				V: nf,
				w: rf,
				W: af,
				x: null,
				X: null,
				y: ff,
				Y: cf,
				Z: of,
				"%": uf
			},
			w = {
				a: function(t, e, n) {
					var r = h.exec(e.slice(n));
					return r ? ((t.w = b[r[0].toLowerCase()]), n + r[0].length) : -1;
				},
				A: function(t, e, n) {
					var r = d.exec(e.slice(n));
					return r ? ((t.w = l[r[0].toLowerCase()]), n + r[0].length) : -1;
				},
				b: function(t, e, n) {
					var r = y.exec(e.slice(n));
					return r ? ((t.m = v[r[0].toLowerCase()]), n + r[0].length) : -1;
				},
				B: function(t, e, n) {
					var r = p.exec(e.slice(n));
					return r ? ((t.m = g[r[0].toLowerCase()]), n + r[0].length) : -1;
				},
				c: function(t, e, n) {
					return A(t, r, e, n);
				},
				d: va,
				e: va,
				f: Aa,
				H: _a,
				I: _a,
				j: ma,
				L: Ma,
				m: ya,
				M: wa,
				p: function(t, e, n) {
					var r = u.exec(e.slice(n));
					return r ? ((t.p = s[r[0].toLowerCase()]), n + r[0].length) : -1;
				},
				Q: Na,
				s: ka,
				S: xa,
				u: sa,
				U: da,
				V: la,
				w: ua,
				W: ha,
				x: function(t, e, n) {
					return A(t, a, e, n);
				},
				X: function(t, e, n) {
					return A(t, f, e, n);
				},
				y: pa,
				Y: ba,
				Z: ga,
				"%": Ta
			};
		function x(o, u) {
			return function(t) {
				var e,
					n,
					r,
					a = [],
					f = -1,
					i = 0,
					c = o.length;
				for (t instanceof Date || (t = new Date(+t)); ++f < c; )
					37 === o.charCodeAt(f) &&
						(
							a.push(o.slice(i, f)),
							null != (n = ea[(e = o.charAt(++f))])
								? (e = o.charAt(++f))
								: (n = "e" === e ? " " : "0"),
							(r = u[e]) && (e = r(t, n)),
							a.push(e),
							(i = f + 1)
						);
				return a.push(o.slice(i, f)), a.join("");
			};
		}
		function M(a, f) {
			return function(t) {
				var e,
					n,
					r = Wr(1900);
				if (A(r, a, (t += ""), 0) != t.length) return null;
				if ("Q" in r) return new Date(r.Q);
				if (("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r)) {
					if (r.V < 1 || 53 < r.V) return null;
					"w" in r || (r.w = 1), "Z" in r
						? (
								(e =
									4 < (n = (e = Qr(Wr(r.y))).getUTCDay()) || 0 === n
										? $r.ceil(e)
										: $r(e)),
								(e = Rr.offset(e, 7 * (r.V - 1))),
								(r.y = e.getUTCFullYear()),
								(r.m = e.getUTCMonth()),
								(r.d = e.getUTCDate() + (r.w + 6) % 7)
							)
						: (
								(e =
									4 < (n = (e = f(Wr(r.y))).getDay()) || 0 === n
										? Hr.ceil(e)
										: Hr(e)),
								(e = Yr.offset(e, 7 * (r.V - 1))),
								(r.y = e.getFullYear()),
								(r.m = e.getMonth()),
								(r.d = e.getDate() + (r.w + 6) % 7)
							);
				} else
					("W" in r || "U" in r) &&
						(
							"w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0),
							(n = "Z" in r ? Qr(Wr(r.y)).getUTCDay() : f(Wr(r.y)).getDay()),
							(r.m = 0),
							(r.d =
								"W" in r
									? (r.w + 6) % 7 + 7 * r.W - (n + 5) % 7
									: r.w + 7 * r.U - (n + 6) % 7)
						);
				return "Z" in r
					? ((r.H += (r.Z / 100) | 0), (r.M += r.Z % 100), Qr(r))
					: f(r);
			};
		}
		function A(t, e, n, r) {
			for (var a, f, i = 0, c = e.length, o = n.length; i < c; ) {
				if (o <= r) return -1;
				if (37 === (a = e.charCodeAt(i++))) {
					if (
						(
							(a = e.charAt(i++)),
							!(f = w[a in ea ? e.charAt(i++) : a]) || (r = f(t, n, r)) < 0
						)
					)
						return -1;
				} else if (a != n.charCodeAt(r++)) return -1;
			}
			return r;
		}
		return (m.x = x(a, m)), (m.X = x(f, m)), (m.c = x(r, m)), (_.x = x(
			a,
			_
		)), (_.X = x(f, _)), (_.c = x(r, _)), {
			format: function(t) {
				var e = x((t += ""), m);
				return (e.toString = function() {
					return t;
				}), e;
			},
			parse: function(t) {
				var e = M((t += ""), Br);
				return (e.toString = function() {
					return t;
				}), e;
			},
			utcFormat: function(t) {
				var e = x((t += ""), _);
				return (e.toString = function() {
					return t;
				}), e;
			},
			utcParse: function(t) {
				var e = M(t, Qr);
				return (e.toString = function() {
					return t;
				}), e;
			}
		};
	})({
		dateTime: "%x, %X",
		date: "%-m/%-d/%Y",
		time: "%-I:%M:%S %p",
		periods: ["AM", "PM"],
		days: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		],
		shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		months: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		shortMonths: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		]
	})), Jr.format, Jr.parse, (Kr = Jr.utcFormat), (ta = Jr.utcParse);
	var lf = "%Y-%m-%dT%H:%M:%S.%LZ";
	Date.prototype.toISOString || Kr(lf);
	+new Date("2000-01-01T00:00:00.000Z") || ta(lf);
	function hf(t) {
		for (var e = (t.length / 6) | 0, n = new Array(e), r = 0; r < e; )
			n[r] = "#" + t.slice(6 * r, 6 * ++r);
		return n;
	}
	function bf(t) {
		return me(t[t.length - 1]);
	}
	hf(
		"1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"
	), hf("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), hf("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), hf("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), hf("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), hf("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), hf("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), hf("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), hf("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), bf(new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(hf)), bf(new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(hf)), bf(new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(hf)), bf(new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(hf)), bf(new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(hf)), bf(new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(hf)), bf(new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(hf)), bf(new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(hf)), bf(new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(hf)), bf(new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(hf)), bf(new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(hf)), bf(new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(hf)), bf(new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(hf)), bf(new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(hf)), bf(new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(hf)), bf(new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(hf)), bf(new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(hf)), bf(new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(hf)), bf(new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(hf)), bf(new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(hf)), bf(new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(hf)), bf(new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(hf)), bf(new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(hf)), bf(new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(hf)), bf(new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(hf)), bf(new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(hf)), bf(new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(hf)), Ie(de(300, 0.5, 0), de(-240, 0.5, 1));
	Ie(
		de(-100, 0.75, 0.35),
		de(80, 1.5, 0.8)
	), Ie(de(260, 0.75, 0.35), de(80, 1.5, 0.8)), de();
	function pf(e) {
		var n = e.length;
		return function(t) {
			return e[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
		};
	}
	var gf = pf(
		hf(
			"44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"
		)
	);
	pf(
		hf(
			"00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"
		)
	), pf(hf("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), pf(hf("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
	function yf(t) {
		return function() {
			return t;
		};
	}
	var vf = Math.abs,
		mf = Math.atan2,
		_f = Math.cos,
		wf = Math.max,
		xf = Math.min,
		Mf = Math.sin,
		Af = Math.sqrt,
		Tf = 1e-12,
		Nf = Math.PI,
		kf = Nf / 2,
		Cf = 2 * Nf;
	function Pf(t) {
		return 1 <= t ? kf : t <= -1 ? -kf : Math.asin(t);
	}
	function Df(t) {
		return t.innerRadius;
	}
	function Uf(t) {
		return t.outerRadius;
	}
	function Sf(t) {
		return t.startAngle;
	}
	function zf(t) {
		return t.endAngle;
	}
	function Ef(t) {
		return t && t.padAngle;
	}
	function Ff(t, e, n, r, a, f, i) {
		var c = t - n,
			o = e - r,
			u = (i ? f : -f) / Af(c * c + o * o),
			s = u * o,
			d = -u * c,
			l = t + s,
			h = e + d,
			b = n + s,
			p = r + d,
			g = (l + b) / 2,
			y = (h + p) / 2,
			v = b - l,
			m = p - h,
			_ = v * v + m * m,
			w = a - f,
			x = l * p - b * h,
			M = (m < 0 ? -1 : 1) * Af(wf(0, w * w * _ - x * x)),
			A = (x * m - v * M) / _,
			T = (-x * v - m * M) / _,
			N = (x * m + v * M) / _,
			k = (-x * v + m * M) / _,
			C = A - g,
			P = T - y,
			D = N - g,
			U = k - y;
		return D * D + U * U < C * C + P * P &&
			(
				(A = N),
				(T = k)
			), { cx: A, cy: T, x01: -s, y01: -d, x11: A * (a / w - 1), y11: T * (a / w - 1) };
	}
	function qf() {
		var G = Df,
			B = Uf,
			Q = yf(0),
			W = null,
			J = Sf,
			K = zf,
			tt = Ef,
			et = null;
		function e() {
			var t,
				e,
				n,
				r,
				a,
				f,
				i,
				c,
				o,
				u,
				s,
				d,
				l = +G.apply(this, arguments),
				h = +B.apply(this, arguments),
				b = J.apply(this, arguments) - kf,
				p = K.apply(this, arguments) - kf,
				g = vf(p - b),
				y = b < p;
			if ((et || (et = t = Sn()), h < l && ((e = h), (h = l), (l = e)), Tf < h))
				if (Cf - Tf < g)
					et.moveTo(h * _f(b), h * Mf(b)), et.arc(0, 0, h, b, p, !y), Tf < l &&
						(et.moveTo(l * _f(p), l * Mf(p)), et.arc(0, 0, l, p, b, y));
				else {
					var v,
						m,
						_ = b,
						w = p,
						x = b,
						M = p,
						A = g,
						T = g,
						N = tt.apply(this, arguments) / 2,
						k = Tf < N && (W ? +W.apply(this, arguments) : Af(l * l + h * h)),
						C = xf(vf(h - l) / 2, +Q.apply(this, arguments)),
						P = C,
						D = C;
					if (Tf < k) {
						var U = Pf(k / l * Mf(N)),
							S = Pf(k / h * Mf(N));
						(A -= 2 * U) > Tf
							? ((x += U *= y ? 1 : -1), (M -= U))
							: ((A = 0), (x = M = (b + p) / 2)), (T -= 2 * S) > Tf
							? ((_ += S *= y ? 1 : -1), (w -= S))
							: ((T = 0), (_ = w = (b + p) / 2));
					}
					var z = h * _f(_),
						E = h * Mf(_),
						F = l * _f(M),
						q = l * Mf(M);
					if (Tf < C) {
						var Y = h * _f(w),
							I = h * Mf(w),
							L = l * _f(x),
							H = l * Mf(x);
						if (g < Nf) {
							var O =
									Tf < A
										? [
												(r = z) +
													(d =
														((u = F - (f = Y)) * ((a = E) - (i = I)) -
															(s = q - i) * (r - f)) /
														(s * (c = L - r) - u * (o = H - a))) *
														c,
												a + d * o
											]
										: [F, q],
								j = z - O[0],
								R = E - O[1],
								V = Y - O[0],
								X = I - O[1],
								$ =
									1 /
									Mf(
										(1 <
										(n =
											(j * V + R * X) / (Af(j * j + R * R) * Af(V * V + X * X)))
											? 0
											: n < -1 ? Nf : Math.acos(n)) / 2
									),
								Z = Af(O[0] * O[0] + O[1] * O[1]);
							(P = xf(C, (l - Z) / ($ - 1))), (D = xf(C, (h - Z) / ($ + 1)));
						}
					}
					Tf < T
						? Tf < D
							? (
									(v = Ff(L, H, z, E, h, D, y)),
									(m = Ff(Y, I, F, q, h, D, y)),
									et.moveTo(v.cx + v.x01, v.cy + v.y01),
									D < C
										? et.arc(
												v.cx,
												v.cy,
												D,
												mf(v.y01, v.x01),
												mf(m.y01, m.x01),
												!y
											)
										: (
												et.arc(
													v.cx,
													v.cy,
													D,
													mf(v.y01, v.x01),
													mf(v.y11, v.x11),
													!y
												),
												et.arc(
													0,
													0,
													h,
													mf(v.cy + v.y11, v.cx + v.x11),
													mf(m.cy + m.y11, m.cx + m.x11),
													!y
												),
												et.arc(
													m.cx,
													m.cy,
													D,
													mf(m.y11, m.x11),
													mf(m.y01, m.x01),
													!y
												)
											)
								)
							: (et.moveTo(z, E), et.arc(0, 0, h, _, w, !y))
						: et.moveTo(z, E), Tf < l && Tf < A
						? Tf < P
							? (
									(v = Ff(F, q, Y, I, l, -P, y)),
									(m = Ff(z, E, L, H, l, -P, y)),
									et.lineTo(v.cx + v.x01, v.cy + v.y01),
									P < C
										? et.arc(
												v.cx,
												v.cy,
												P,
												mf(v.y01, v.x01),
												mf(m.y01, m.x01),
												!y
											)
										: (
												et.arc(
													v.cx,
													v.cy,
													P,
													mf(v.y01, v.x01),
													mf(v.y11, v.x11),
													!y
												),
												et.arc(
													0,
													0,
													l,
													mf(v.cy + v.y11, v.cx + v.x11),
													mf(m.cy + m.y11, m.cx + m.x11),
													y
												),
												et.arc(
													m.cx,
													m.cy,
													P,
													mf(m.y11, m.x11),
													mf(m.y01, m.x01),
													!y
												)
											)
								)
							: et.arc(0, 0, l, M, x, y)
						: et.lineTo(F, q);
				}
			else et.moveTo(0, 0);
			if ((et.closePath(), t)) return (et = null), t + "" || null;
		}
		return (e.centroid = function() {
			var t = (+G.apply(this, arguments) + +B.apply(this, arguments)) / 2,
				e =
					(+J.apply(this, arguments) + +K.apply(this, arguments)) / 2 - Nf / 2;
			return [_f(e) * t, Mf(e) * t];
		}), (e.innerRadius = function(t) {
			return arguments.length
				? ((G = "function" == typeof t ? t : yf(+t)), e)
				: G;
		}), (e.outerRadius = function(t) {
			return arguments.length
				? ((B = "function" == typeof t ? t : yf(+t)), e)
				: B;
		}), (e.cornerRadius = function(t) {
			return arguments.length
				? ((Q = "function" == typeof t ? t : yf(+t)), e)
				: Q;
		}), (e.padRadius = function(t) {
			return arguments.length
				? ((W = null == t ? null : "function" == typeof t ? t : yf(+t)), e)
				: W;
		}), (e.startAngle = function(t) {
			return arguments.length
				? ((J = "function" == typeof t ? t : yf(+t)), e)
				: J;
		}), (e.endAngle = function(t) {
			return arguments.length
				? ((K = "function" == typeof t ? t : yf(+t)), e)
				: K;
		}), (e.padAngle = function(t) {
			return arguments.length
				? ((tt = "function" == typeof t ? t : yf(+t)), e)
				: tt;
		}), (e.context = function(t) {
			return arguments.length ? ((et = null == t ? null : t), e) : et;
		}), e;
	}
	function Yf(t) {
		return t < 0 ? -1 : 1;
	}
	function If(t, e, n) {
		var r = t._x1 - t._x0,
			a = e - t._x1,
			f = (t._y1 - t._y0) / (r || (a < 0 && -0)),
			i = (n - t._y1) / (a || (r < 0 && -0)),
			c = (f * a + i * r) / (r + a);
		return (
			(Yf(f) + Yf(i)) * Math.min(Math.abs(f), Math.abs(i), 0.5 * Math.abs(c)) ||
			0
		);
	}
	function Lf(t, e) {
		var n = t._x1 - t._x0;
		return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e;
	}
	function Hf(t, e, n) {
		var r = t._x0,
			a = t._y0,
			f = t._x1,
			i = t._y1,
			c = (f - r) / 3;
		t._context.bezierCurveTo(r + c, a + c * e, f - c, i - c * n, f, i);
	}
	function Of(t) {
		this._context = t;
	}
	function jf(t) {
		this._context = t;
	}
	function Rf(e, t, n, r, a, f) {
		var i,
			c = a || 0,
			o = f || 0,
			u = n || 0,
			s =
				t ||
				function() {
					return "#fff";
				},
			d = r;
		function l(t) {
			(l.el = t), l.setProperties();
		}
		return (l.setProperties = function() {
			this.el &&
				(
					l.svgGroup || (l.svgGroup = l.el.append("g")),
					l.svgGroup.attr("transform", "translate(" + c + "," + o + ")"),
					l.svgGroup
						.selectAll("g")
						.data(e)
						.enter()
						.append("g")
						.selectAll("rect")
						.data(function(t, e) {
							return t.map(function(t) {
								return { r: e, v: t };
							});
						})
						.enter()
						.append("rect")
						.datum(function(t, e) {
							return (t.c = e), t;
						}),
					l.svgGroup
						.selectAll("g")
						.selectAll("rect")
						.attr("x", function(t) {
							return u / e[t.r].length * t.c;
						})
						.attr("y", function(t) {
							return t.r * i;
						})
						.attr("width", function(t) {
							return u / e[t.r].length;
						})
						.attr("height", i)
						.attr("fill", function(t) {
							return s(t.v);
						}),
					d && l.svgGroup.attr("id", d)
				);
		}), (l.data = function(t) {
			return arguments.length
				? ((i = u / (e = t).length), l.setProperties(), l)
				: e;
		}), (l.x = function(t) {
			return arguments.length ? ((c = t), l.setProperties(), l) : c;
		}), (l.y = function(t) {
			return arguments.length ? ((o = t), l.setProperties(), l) : o;
		}), (l.size = function(t) {
			return arguments.length
				? ((u = t), e && ((i = u / e.length), l.setProperties()), l)
				: u;
		}), (l.scale = function(t) {
			return arguments.length ? ((s = t), e && l.setProperties(), l) : s;
		}), (l.id = function(t) {
			return arguments.length ? ((d = t), l.setProperties(), l) : d;
		}), l;
	}
	function Vf(t, e, n, r, a, f) {
		var i = Rf(t, e, n, r, a, f);
		return (i.setProperties = function() {
			var c = i.data(),
				o = i.size(),
				e = i.scale(),
				t = i.id(),
				n = i.x(),
				r = i.y();
			i.el &&
				(
					i.svgGroup || (i.svgGroup = i.el.append("g")),
					i.svgGroup.attr("transform", "translate(" + n + "," + r + ")"),
					i.svgGroup
						.selectAll("g")
						.data(c)
						.enter()
						.append("g")
						.selectAll("path")
						.data(function(t, e) {
							return t.map(function(t) {
								return { r: e, v: t };
							});
						})
						.enter()
						.append("path")
						.datum(function(t, e) {
							return (t.c = e), t;
						}),
					i.svgGroup
						.selectAll("g")
						.selectAll("path")
						.attr("transform", "translate(" + o / 2 + "," + o + ")")
						.attr("d", function(t) {
							return (e = t), (n = o), (r = c.length), (a = c[t.r].length), (f = Pr().domain([0, a]).range([-Math.PI / 6, Math.PI / 6])), (i = Pr().domain([0, r]).range([n, 0])), qf().innerRadius(i(e.r + 1)).outerRadius(i(e.r)).startAngle(f(e.c)).endAngle(f(e.c + 1))();
							var e, n, r, a, f, i;
						})
						.attr("id", (t) => e(t.v).replaceAll(', ', '').replace('(','').replace(')','').replace('rgb','legend'))
						.attr("fill", function(t) {							
							return e(t.v);
						})
						.on("mouseover", function(t){
							  if (toggled) {
								let id = 'legend'.concat(e(t.v).replaceAll(', ', '').replace('(','').replace(')','').replace('rgb',''))
								d3.select('#'.concat(id)).raise()
								d3.select('#'.concat(id)).style('stroke','black')
								d3.select('#'.concat(id)).style('stroke-width',2.5)
								//animate on hover
								lastHovered = e(t.v).replaceAll(', ', '').replace('(','').replace(')','')
							    highlightCounties(lastHovered)		
							  }
						})
						.on("mouseout", function(t){		
							if (toggled) {
								let id = 'legend'.concat(e(t.v).replaceAll(', ', '').replace('(','').replace(')','').replace('rgb',''))
								d3.select('#'.concat(id)).style('stroke','white')
								d3.select('#'.concat(id)).style('stroke-width',0.2)	
							}	
							if (lastHovered != null && toggled){
									unHighlightCounties(e(t.v).replaceAll(', ', '').replace('(','').replace(')',''), lastHovered)
									lastHovered = null
							}
							if (lastHovered == null) {
								d3.selectAll('.stateBorder').raise()
							    //d3.selectAll('.stateBorder').style("stroke", "black")
								//d3.selectAll('.stateBorder').style("opacity", 1)	
							}
						})
						.on("click", function(t) {		
									let rgbColor = e(t.v)
									let id = rgbColor.replaceAll(', ', '').replace('(','').replace(')','')
									if (((toggleValue % 2) == 0) && (lastSelected != id)) {		
								        unHighlightCounties(id, lastSelected)
									    d3.selectAll('.'.concat(id)).classed("countyPath", true)	
										d3.selectAll('.'.concat(id)).raise()
										d3.selectAll('.'.concat(id)).style("stroke", "black")												
										d3.selectAll('.'.concat(id)).style("stroke-width", 1)
										d3.selectAll('.'.concat(id)).style("stroke-dasharray", "4,4")
										//Switch legend highlight
										d3.select('#legend'.concat(lastSelected.replace('rgb', ''))).style('stroke','white')
										d3.select('#legend'.concat(lastSelected.replace('rgb', ''))).style('stroke-width',0.2)
										d3.select('#legend'.concat(id.replace('rgb', ''))).style('stroke','black')
								        d3.select('#legend'.concat(id.replace('rgb', ''))).style('stroke-width',2.5)	
										d3.selectAll('.stateBorder').raise()																					
										toggled = false
										lastSelected = id
									} else if (((toggleValue % 2) == 0) && (lastSelected == id)){
										    d3.selectAll('.'.concat(id)).classed("countyPath", false)	
											d3.selectAll('.'.concat(id)).style("stroke-dasharray", "none")
										    d3.selectAll('.'.concat(id)).style("stroke", "white")
											d3.selectAll('.'.concat(id)).style("stroke-width", 0.2)
											d3.selectAll('.stateBorder').raise()
										    //d3.selectAll('.stateBorder').style("stroke", "black")
											//d3.selectAll('.stateBorder').style("opacity", 1)		
											toggled = true
											toggleValue -= 1
									} else {		
									    highlightCounties(id)										
										toggled = false
										lastSelected = id
										toggleValue += 1
									}
						}),
					t && i.svgGroup.attr("id", t)
				);
		}), i;
	}
	function highlightCounties(id){
		 d3.selectAll('.'.concat(id)).classed("countyPath", true)
		 d3.selectAll('.'.concat(id)).raise()							
	     d3.selectAll('.'.concat(id)).style("stroke", "black")										
		 d3.selectAll('.'.concat(id)).style("stroke-width", 1) 
		 d3.selectAll('.'.concat(id)).style("stroke-dasharray", "4,4")									
		// d3.selectAll('.stateBorder').style("stroke", "#252525")	
	    // d3.selectAll('.stateBorder').style("opacity", 0.5)	
	}
	function unHighlightCounties(id, lastSelected){
		d3.selectAll('.'.concat(lastSelected)).classed("countyPath", false)
		d3.selectAll('.'.concat(lastSelected)).style("stroke-dasharray", "none")									
		d3.selectAll('.'.concat(lastSelected)).style("stroke", "white")									
		d3.selectAll('.'.concat(lastSelected)).style("stroke-width", 0.2)
	}
	(Of.prototype = {
		areaStart: function() {
			this._line = 0;
		},
		areaEnd: function() {
			this._line = NaN;
		},
		lineStart: function() {
			(this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN), (this._point = 0);
		},
		lineEnd: function() {
			switch (this._point) {
				case 2:
					this._context.lineTo(this._x1, this._y1);
					break;
				case 3:
					Hf(this, this._t0, Lf(this, this._t0));
			}
			(this._line || (0 !== this._line && 1 === this._point)) &&
				this._context.closePath(), (this._line = 1 - this._line);
		},
		point: function(t, e) {
			var n = NaN;
			if (((e = +e), (t = +t) !== this._x1 || e !== this._y1)) {
				switch (this._point) {
					case 0:
						(this._point = 1), this._line
							? this._context.lineTo(t, e)
							: this._context.moveTo(t, e);
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						(this._point = 3), Hf(this, Lf(this, (n = If(this, t, e))), n);
						break;
					default:
						Hf(this, this._t0, (n = If(this, t, e)));
				}
				(this._x0 = this._x1), (this._x1 = t), (this._y0 = this._y1), (this._y1 = e), (this._t0 = n);
			}
		}
	}), ((function(t) {
		this._context = new jf(t);
	}.prototype = Object.create(Of.prototype)).point = function(t, e) {
		Of.prototype.point.call(this, e, t);
	}), (jf.prototype = {
		moveTo: function(t, e) {
			this._context.moveTo(e, t);
		},
		closePath: function() {
			this._context.closePath();
		},
		lineTo: function(t, e) {
			this._context.lineTo(e, t);
		},
		bezierCurveTo: function(t, e, n, r, a, f) {
			this._context.bezierCurveTo(e, t, r, n, f, a);
		}
	});
	var Xf = 1e-9;
	function $f(t, e, n) {
		var r,
			a,
			f = null,
			i = t,
			c = n,
			o = e;
		function u(t) {
			(f = t), u.make();
		}
		return (u.makePixelData = function() {
			for (var t, e = [], n = 0; n < i; n++)
				for (var r = 0; r < i; r++)
					(t = Ut((t = qe((t = o(r / i)), Ut("#ddd"))(n / i)))), e.push(
						t.r
					), e.push(t.g), e.push(t.b), e.push(255);
			return e;
		}), (u.make = function() {
			if (f) {
				a || (a = f.append("canvas")), a
					.attr("width", i)
					.attr("height", i), c && a.attr("id", c);
				var t = a.node();
				(r = t.getContext("2d")), u.setPixels();
			}
		}), (u.setPixels = function() {
			var t = r.createImageData(i, i);
			t.data.set(u.makePixelData()), r.putImageData(t, 0, 0);
		}), (u.size = function(t) {
			return arguments.length
				? (
						(i = t),
						a && (a.attr("width", i).attr("height", i), u.setPixels()),
						u
					)
				: i;
		}), (u.scale = function(t) {
			return arguments.length ? ((o = t), a ? u.setPixels() : u.make(), u) : o;
		}), (u.id = function(t) {
			return arguments.length ? ((c = t), a && a.attr("id", c), u) : c;
		}), u;
	}
	var Zf = Object.freeze({
		simpleLegend: function(t, e, n, r, a, f, i) {
			var u = null,
				s = a,
				d = t || null,
				l = e || 200,
				h = n || 30,
				b = r || null,
				p = f || 0,
				g = i || 0;
			function c(t) {
				(u = t), c.setProperties();
			}
			return (c.setProperties = function() {
				if (u) {
					var t = d.domain ? d.domain() : [0, 1],
						n = l / d.range().length,
						e = (t[1] - t[0]) / d.range().length,
						r = C(t[0], t[1] + e, e),
						a = wr().range([0, l]).domain(r).round(!0);
					u
						.attr("class", "legend")
						.attr("transform", "translate(" + p + "," + g + ")");
					var f = u.selectAll("rect").data(d.range());
					f
						.enter()
						.append("rect")
						.merge(f)
						.attr("x", function(t, e) {
							return e * n;
						})
						.attr("y", 0)
						.attr("height", h)
						.attr("width", n)
						.attr("fill", function(t) {
							return t;
						});
					var i,
						c = u.select("g.legend > g");
					c.empty() && (c = u.append("g")), c
						.attr("transform", "translate(0, " + h + ")")
						.call(((i = a), x(D, i)).tickFormat(or(b || "")));
					var o = u.select("g.legend > text");
					o.empty() && (o = u.append("text")), o
						.style("text-anchor", "middle")
						.style("font-size", 13)
						.attr("transform", "translate(" + l / 2 + ", " + (h + 30) + ")")
						.text(s);
				}
			}), (c.title = function(t) {
				return arguments.length ? ((s = t), c.setProperties(), c) : s;
			}), (c.scale = function(t) {
				return arguments.length ? ((d = t), c.setProperties(), c) : d;
			}), (c.size = function(t) {
				return arguments.length ? ((l = t), c.setProperties(), c) : l;
			}), (c.height = function(t) {
				return arguments.length ? ((h = t), c.setProperties(), c) : h;
			}), (c.format = function(t) {
				return arguments.length ? ((b = t), c.setProperties(), c) : b;
			}), (c.x = function(t) {
				return arguments.length ? ((p = t), c.setProperties(), c) : p;
			}), (c.y = function(t) {
				return arguments.length ? ((g = t), c.setProperties(), c) : g;
			}), c;
		},
		heatmapLegend: function(t, e, n, r, a, f, i) {
			var l = null,
				h = r || "Uncertainty",
				b = a || "Value",
				p = t || null,
				g = e || 200,
				y = n || null,
				v = f || 0,
				m = i || 0,
				_ = null,
				w = Rf(),
				c = function(t) {
					(l = t), c.setProperties(), l.call(w);
				};
			return (c.setProperties = function() {
				if (l) {
					var t = _;
					t || (t = p.quantize().data());
					for (var e = [], n = 0; n < t.length; n++) e[n] = t[t.length - n - 1];
					w.y(1), w.data(e), w.scale(p), w.size(g), l
						.attr("class", "legend")
						.attr("transform", "translate(" + v + "," + m + ")");
					var r,
						a = p && p.quantize ? p.quantize().uncertaintyDomain() : [0, 1],
						f = (a[1] - a[0]) / e.length,
						i = C(a[0], a[1] + f, f),
						c = p && p.quantize ? p.quantize().valueDomain() : [0, 1],
						o = (c[1] - c[0]) / e.length,
						u = C(c[0], c[1] + o, o),
						s = wr().range([0, g]).domain(u);
					l
						.append("g")
						.call(((r = s), x(k, r)).tickFormat(or(y || ""))), l
						.append("text")
						.style("text-anchor", "middle")
						.style("font-size", 13)
						.attr("transform", "translate(" + g / 2 + ", " + -25 + ")")
						.text(b);
					var d = wr().range([0, g]).domain(i);
					l
						.append("g")
						.attr("transform", "translate(" + g + ", 0)")
						.call(E(d).tickFormat(or(y || ""))), l
						.append("text")
						.style("text-anchor", "middle")
						.style("font-size", 13)
						.attr(
							"transform",
							"translate(" + (g + 40) + ", " + g / 2 + ")rotate(90)"
						)
						.text(h);
				}
			}), (c.data = function(t) {
				return arguments.length ? ((_ = t), c.setProperties(), c) : _;
			}), (c.scale = function(t) {
				return arguments.length ? ((p = t), c.setProperties(), c) : p;
			}), (c.size = function(t) {
				return arguments.length ? ((g = t), c.setProperties(), c) : g;
			}), (c.format = function(t) {
				return arguments.length ? ((y = t), c.setProperties(), c) : y;
			}), (c.x = function(t) {
				return arguments.length ? ((v = t), c.setProperties(), c) : v;
			}), (c.y = function(t) {
				return arguments.length ? ((m = t), c.setProperties(), c) : m;
			}), (c.utitle = function(t) {
				return arguments.length ? ((h = t), c.setProperties(), c) : h;
			}), (c.vtitle = function(t) {
				return arguments.length ? ((b = t), c.setProperties(), c) : b;
			}), c;
		},
		arcmapLegend: function(t, e, n, r, a, f, i) {
			var v = null,
				m = r || "Uncertainty",
				_ = a || "Value",
				w = t || null,
				x = e || 200,
				M = n || null,
				A = f || 0,
				T = i || 0,
				N = null,
				k = Vf(),
				c = function(t) {
					(v = t), c.setProperties(), v.call(k);
				};
			return (c.setProperties = function() {
				if (v) {
					var t = N;
					t || (t = w.quantize().data());
					for (var e = [], n = 0; n < t.length; n++) e[n] = t[t.length - n - 1];
					k.data(e), k.scale(w), k.size(x), v
						.attr("class", "legend")
						.attr("transform", "translate(" + A + "," + T + ")");
					var r = w && w.quantize ? w.quantize().uncertaintyDomain() : [0, 1],
						a = (r[1] - r[0]) / e.length,
						f = C(r[0], r[1] + a, a),
						i = wr().range([0, x]).domain(f),
						c = x / 180;
					v
						.append("g")
						.attr(
							"transform",
							"translate(" + (x + 6 * c) + "," + 28 * c + ")rotate(30)"
						)
						.call(E(i).tickFormat(d3.format('.5~f'))), v
						.append("text")
						.style("text-anchor", "middle")
						.style("font-size", 13)
						.attr(
							"transform",
							"translate(" +
								(x + 20 * c) +
								"," +
								(40 * c + x / 2) +
								")rotate(-60)"
						)
						.text(m);
					var o = w && w.quantize ? w.quantize().valueDomain() : [0, 1],
						u = (o[1] - o[0]) / e[0].length,
						s = C(o[0], o[1] + u, u),
						d = Pr().range([0, x]).domain(o),
						l = M ? or(M) : d.tickFormat(s.length) 
						h = Pr().domain(o).range([-30, 30]),
						b = 3 * c,
						p = qf()
							.innerRadius(x + b)
							.outerRadius(x + b + 1)
							.startAngle(-Math.PI / 6)
							.endAngle(Math.PI / 6),
						g = v
							.append("g")
							.attr("transform", "translate(" + x / 2 + "," + (x - b) + ")");
					g
						.append("path")
						.attr("fill", "black")
						.attr("stroke", "transparent")
						.attr("d", p);

					var y = g
						.selectAll(".arc-label")
						.data(s)
						.enter()
						.append("g")
						.attr("class", "arc-label")
						.attr("transform", function(t) {
							return "rotate(" + h(t) + ")translate(0," + (-x - b) + ")";
						})

					y.append("text")
						.style("font-size", "10")
						.style("text-anchor", "middle")
						.attr("y", -10)
						.text(l)

					y.append("line")
						.attr("x1", 0.5)
						.attr("x2", 0.5)
						.attr("y1", -6)
						.attr("y2", 0)
						.attr("stroke", "#000"), v
						.append("text")
						.style("text-anchor", "middle")
						.style("font-size", 13)
						.attr("x", x / 2)
						.attr("y", -30)
						.text(_);
				}
			}), (c.data = function(t) {
				return arguments.length ? ((N = t), c.setProperties(), c) : N;
			}), (c.scale = function(t) {
				return arguments.length ? ((w = t), c.setProperties(), c) : w;
			}), (c.size = function(t) {
				return arguments.length ? ((x = t), c.setProperties(), c) : x;
			}), (c.format = function(t) {
				return arguments.length ? ((M = t), c.setProperties(), c) : M;
			}), (c.x = function(t) {
				return arguments.length ? ((A = t), c.setProperties(), c) : A;
			}), (c.y = function(t) {
				return arguments.length ? ((T = t), c.setProperties(), c) : T;
			}), (c.utitle = function(t) {
				return arguments.length ? ((m = t), c.setProperties(), c) : m;
			}), (c.vtitle = function(t) {
				return arguments.length ? ((_ = t), c.setProperties(), c) : _;
			}), c;
		}
	});
	(t.legend = Zf), (t.heatmap = Rf), (t.arcmap = Vf), (t.quantization = function(
		t,
		e
	) {
		var a = t || 2,
			c = e || 2,
			o = Pr(),
			f = Pr(),
			u = r();
		function n(t, e) {
			for (
				var n = null != e ? e : t.u, r = null != e ? t : t.v, a = 0;
				a < u.length - 1 && o(n) < 1 - (a + 1) / c - Xf;

			)
				a++;
			for (
				var f = 1 < u[a].length ? (u[a][1].v - u[a][0].v) / 2 : 0, i = 0;
				i < u[a].length - 1 && r > u[a][i].v + f;

			)
				i++;
			return u[a][i];
		}
		function r() {
			var t,
				e = [];
			// f.nice(Math.pow(a, c - 1)), o.nice(c), (e[0] = []), e[0].push({
			f, o, (e[0] = []), e[0].push({
				u: o.invert((c - 1) / c),
				v: f.invert(0.5)
			});
			for (var n = 1; n < c; n++) {
				(e[n] = []), (t = 2 * Math.pow(a, n));
				for (var r = 1; r < t; r += 2)
					e[n].push({ u: o.invert(1 - (n + 1) / c), v: f.invert(r / t) });
			}
			return e;
		}
		return (n.range = function() {
			return [].concat.apply([], u);
		}), (n.data = n.tree = function() {
			return u;
		}), (n.branching = function(t) {
			return arguments.length ? ((a = Math.max(1, t)), (u = r()), n) : a;
		}), (n.layers = function(t) {
			return arguments.length ? ((c = Math.max(1, t)), (u = r()), n) : c;
		}), (n.uncertaintyDomain = function(t) {
			return arguments.length ? (o.domain(t), (u = r()), n) : o.domain();
		}), (n.valueDomain = function(t) {
			return arguments.length ? (f.domain(t), (u = r()), n) : f.domain();
		}), n;
	}), (t.squareQuantization = function(t) {
		var c = t,
			o = Pr(),
			r = Pr(),
			u = n();
		function e(t, e) {
			for (
				var n = null != e ? e : t.u, r = null != e ? t : t.v, a = 0;
				a < u.length - 1 && o(n) < 1 - (a + 1) / c;

			)
				a++;
			for (
				var f = 1 < u[a].length ? (u[a][1].v - u[a][0].v) / 2 : 0, i = 0;
				i < u[a].length - 1 && r > u[a][i].v + f;

			)
				i++;
			return u[a][i];
		}
		function n() {
			var t = [];
			o.nice(c), r.nice(c);
			for (var e = 0; e < c; e++) {
				t[e] = [];
				for (var n = 1; n < 2 * c; n += 2)
					t[e].push({ u: o.invert(1 - (e + 1) / c), v: r.invert(n / (2 * c)) });
			}
			return t;
		}
		return (e.range = function() {
			return [].concat.apply([], u);
		}), (e.n = function(t) {
			return arguments.length ? ((c = t), (u = n()), e) : c;
		}), (e.data = e.matrix = function() {
			return u;
		}), (e.uncertaintyDomain = function(t) {
			return arguments.length ? (o.domain(t), (u = n()), e) : o.domain();
		}), (e.valueDomain = function(t) {
			return arguments.length ? (r.domain(t), (u = n()), e) : r.domain();
		}), e;
	}), (t.linearQuantization = function(t, e) {
		var n = t,
			r = e,
			a = f();
		function f() {
			return (function t() {
				var n = 0,
					r = 1,
					a = 1,
					f = [0.5],
					i = [0, 1];
				function e(t) {
					if (t <= t) return i[o(f, t, 0, a)];
				}
				function c() {
					var t = -1;
					for (f = new Array(a); ++t < a; )
						f[t] = ((t + 1) * r - (t - a) * n) / (a + 1);
					return e;
				}
				return (e.domain = function(t) {
					return arguments.length ? ((n = +t[0]), (r = +t[1]), c()) : [n, r];
				}), (e.range = function(t) {
					return arguments.length
						? ((a = (i = vr.call(t)).length - 1), c())
						: i.slice();
				}), (e.invertExtent = function(t) {
					var e = i.indexOf(t);
					return e < 0
						? [NaN, NaN]
						: e < 1 ? [n, f[0]] : a <= e ? [f[a - 1], r] : [f[e - 1], f[e]];
				}), (e.copy = function() {
					return t().domain([n, r]).range(i);
				}), Cr(e);
			})().range(
				(function(t, e) {
					for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t(r / (e - 1));
					return n;
				})(r, n)
			);
		}
		function i(t) {
			return a(t);
		}
		return (i.range = function() {
			return a.range();
		}), (i.n = function(t) {
			return arguments.length ? ((n = t), (a = f()), i) : n;
		}), i;
	}), (t.scale = function(t, e, n) {
		var s = e || gf,
			d =
				n ||
				function(t, e) {
					return null != e ? { v: t, u: e } : { v: t.v, u: t.u };
				},
			l = t;
		function r(t, e) {
			var n = d(t, e),
				r = [0, 1],
				a = [0, 1];
			d.uncertaintyDomain && (r = d.uncertaintyDomain()), d.valueDomain &&
				(a = d.valueDomain());
			var f = Pr().domain(r).range([0, 1]),
				i = Pr().domain(a).range([0, 1]),
				c = s(i(n.v));
			switch (l) {
				case "usl":
				default:
					c = qe(c, "#fff")(f(n.u));
					break;
				case "us":
					c = It(c);
					var o = Pr().domain([0, 1]).range([c.s, 0]);
					c.s = o(f(n.u));
					break;
				case "ul":
					c = It(c);
					var u = Pr().domain([0, 1]).range([c.l, 1]);
					c.l = u(f(n.u));
			}
			return c;
		}
		return (r.colorList = function() {
			return this.quantize().range().map(function(t) {
				return r(t);
			});
		}), (r.colorDists = function() {
			for (
				var t,
					e,
					n,
					r,
					a,
					f,
					i = this.colorList(),
					c = new Array(i.length),
					o = new Array(2),
					u = 0;
				u < c.length;
				u++
			) {
				c[u] = new Array(i.length);
				for (var s = 0; s < c[u].length; s++)
					(n = i[u]), (r = i[s]), (a = Wt(Ut(n))), (f = Wt(
						Ut(r)
					)), (e = Math.sqrt(
						Math.pow(a.l - f.l, 2) +
							Math.pow(a.a - f.a, 2) +
							Math.pow(a.b - f.b, 2)
					)), (c[u][s] = e), u != s &&
						((0 == u && 1 == s) || e < t) &&
						((t = e), (o = [i[u], i[s]]));
			}
			return (c.minDist = t), (c.minPair = o), c;
		}), (r.mode = function(t) {
			return arguments.length ? ((l = t), r) : l;
		}), (r.range = function(t) {
			return arguments.length ? ((s = t), r) : s;
		}), (r.quantize = function(t) {
			return arguments.length ? ((d = t), r) : d;
		}), r;
	}), (t.csquare = $f), (t.carc = function(t, e) {
		var s = $f(t, e);
		return (s.makePixelData = function() {
			for (
				var t,
					e,
					n,
					r,
					a,
					f = [],
					i = Pr().domain([-Math.PI / 6, Math.PI / 6]).range([1, 0]),
					c = s.size(),
					o = 0;
				o < c;
				o++
			)
				for (var u = 0; u < c; u++)
					(e = u / c - 0.5), (n = 1 - o / c), (a = Math.sqrt(
						Math.pow(e, 2) + Math.pow(n, 2)
					)), (r = Math.atan2(n, e) - Math.PI / 2) > -Math.PI / 6 &&
					r < Math.PI / 6 &&
					0 < a &&
					a < 1
						? (t = Ut((t = qe((t = s.scale()(i(r))), Ut("#ddd"))(1 - a))))
						: ((t = Ut("white")).opacity = 0), f.push(t.r), f.push(t.g), f.push(
						t.b
					), f.push(255 * t.opacity);
			return f;
		}), s;
	}), (t.cline = function(t, e, n) {
		var a = $f(t, n),
			f = e,
			i = t;
		return (a.makePixelData = function() {
			for (var t, e = [], n = 0; n < i; n++)
				for (var r = 0; r < i; r++)
					n < f
						? (
								(t = Ut((t = a.scale()(r / i)))),
								e.push(t.r),
								e.push(t.g),
								e.push(t.b),
								e.push(255)
							)
						: (e.push(255), e.push(255), e.push(255), e.push(0));
			return e;
		}), a;
	}), Object.defineProperty(t, "__esModule", { value: !0 });
});
