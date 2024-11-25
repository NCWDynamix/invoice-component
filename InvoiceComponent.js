"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var InvoiceComponent = function (_a) {
    var modelValue = _a.modelValue, onModelValueChange = _a.onModelValueChange;
    var _b = (0, react_1.useState)([]), items = _b[0], setItems = _b[1];
    var _c = (0, react_1.useState)({
        netTotal: 0,
        vatTotal: 0,
        grossTotal: 0
    }), totals = _c[0], setTotals = _c[1];
    // Jednostki miary
    var units = ['szt.', 'kg', 'l', 'm', 'm2', 'm3', 'godz.'];
    // Stawki VAT
    var vatRates = [0, 5, 8, 23];
    var calculateItemValues = function (item) {
        var quantity = item.quantity || 0;
        var netPrice = item.netPrice || 0;
        var vatRate = item.vatRate || 0;
        var netValue = quantity * netPrice;
        var grossValue = netValue * (1 + vatRate / 100);
        return { netValue: netValue, grossValue: grossValue };
    };
    var addNewItem = function () {
        var newItem = {
            id: Date.now().toString(),
            name: '',
            quantity: 1,
            unit: 'szt.',
            netPrice: 0,
            vatRate: 8,
            netValue: 0,
            grossValue: 0
        };
        setItems(__spreadArray(__spreadArray([], items, true), [newItem], false));
    };
    var updateItem = function (index, updates) {
        var updatedItems = __spreadArray([], items, true);
        var currentItem = __assign(__assign({}, updatedItems[index]), updates);
        var _a = calculateItemValues(currentItem), netValue = _a.netValue, grossValue = _a.grossValue;
        updatedItems[index] = __assign(__assign({}, currentItem), { netValue: netValue, grossValue: grossValue });
        setItems(updatedItems);
    };
    var removeItem = function (index) {
        setItems(items.filter(function (_, i) { return i !== index; }));
    };
    (0, react_1.useEffect)(function () {
        var newTotals = items.reduce(function (acc, item) { return ({
            netTotal: acc.netTotal + item.netValue,
            vatTotal: acc.vatTotal + (item.grossValue - item.netValue),
            grossTotal: acc.grossTotal + item.grossValue
        }); }, { netTotal: 0, vatTotal: 0, grossTotal: 0 });
        setTotals(newTotals);
        // Aktualizuj model Retool
        onModelValueChange({
            items: items,
            totals: newTotals
        });
    }, [items]);
    return (react_1.default.createElement("div", { className: "p-4 space-y-4" },
        react_1.default.createElement("div", { className: "flex justify-between mb-4" },
            react_1.default.createElement("h2", { className: "text-lg font-semibold" }, "Pozycje na fakturze"),
            react_1.default.createElement("div", { className: "space-x-2" },
                react_1.default.createElement("button", { className: "px-4 py-2 bg-blue-500 text-white rounded", onClick: function () { return window.alert('Funkcja dodawania PKWiU w implementacji'); } }, "dodaj PKWiU"),
                react_1.default.createElement("button", { className: "px-4 py-2 bg-blue-500 text-white rounded", onClick: function () { return window.alert('Funkcja dodawania rabatu w implementacji'); } }, "dodaj Rabat"))),
        react_1.default.createElement("div", { className: "grid grid-cols-8 gap-4 font-semibold mb-2" },
            react_1.default.createElement("div", { className: "col-span-2" }, "Nazwa"),
            react_1.default.createElement("div", null, "Ilo\u015B\u0107"),
            react_1.default.createElement("div", null, "Jednostka"),
            react_1.default.createElement("div", null, "Cena netto"),
            react_1.default.createElement("div", null, "VAT %"),
            react_1.default.createElement("div", null, "Warto\u015B\u0107 netto"),
            react_1.default.createElement("div", null, "Warto\u015B\u0107 brutto")),
        items.map(function (item, index) { return (react_1.default.createElement("div", { key: item.id, className: "grid grid-cols-8 gap-4 items-center" },
            react_1.default.createElement("input", { className: "col-span-2 border rounded p-2", value: item.name, onChange: function (e) { return updateItem(index, { name: e.target.value }); }, placeholder: "Nazwa produktu/us\u0142ugi" }),
            react_1.default.createElement("input", { type: "number", className: "border rounded p-2", value: item.quantity, onChange: function (e) { return updateItem(index, { quantity: parseFloat(e.target.value) || 0 }); } }),
            react_1.default.createElement("select", { className: "border rounded p-2", value: item.unit, onChange: function (e) { return updateItem(index, { unit: e.target.value }); } }, units.map(function (unit) { return (react_1.default.createElement("option", { key: unit, value: unit }, unit)); })),
            react_1.default.createElement("input", { type: "number", className: "border rounded p-2", value: item.netPrice, onChange: function (e) { return updateItem(index, { netPrice: parseFloat(e.target.value) || 0 }); } }),
            react_1.default.createElement("select", { className: "border rounded p-2", value: item.vatRate, onChange: function (e) { return updateItem(index, { vatRate: parseFloat(e.target.value) }); } }, vatRates.map(function (rate) { return (react_1.default.createElement("option", { key: rate, value: rate },
                rate,
                "%")); })),
            react_1.default.createElement("div", { className: "p-2" }, item.netValue.toFixed(2)),
            react_1.default.createElement("div", { className: "p-2" }, item.grossValue.toFixed(2)),
            react_1.default.createElement("button", { className: "text-red-500 hover:text-red-700", onClick: function () { return removeItem(index); } }, "\u00D7"))); }),
        react_1.default.createElement("button", { className: "px-4 py-2 bg-green-500 text-white rounded mt-4", onClick: addNewItem }, "+ Nowa pozycja"),
        react_1.default.createElement("div", { className: "mt-8 space-y-2" },
            react_1.default.createElement("div", { className: "flex justify-between" },
                react_1.default.createElement("span", { className: "font-semibold" }, "Suma netto"),
                react_1.default.createElement("div", { className: "flex space-x-2" },
                    react_1.default.createElement("span", null, totals.netTotal.toFixed(2)),
                    react_1.default.createElement("span", null, "PLN"))),
            react_1.default.createElement("div", { className: "flex justify-between" },
                react_1.default.createElement("span", { className: "font-semibold" }, "Suma VAT"),
                react_1.default.createElement("div", { className: "flex space-x-2" },
                    react_1.default.createElement("span", null, totals.vatTotal.toFixed(2)),
                    react_1.default.createElement("span", null, "PLN"))),
            react_1.default.createElement("div", { className: "flex justify-between" },
                react_1.default.createElement("span", { className: "font-semibold" }, "Suma brutto"),
                react_1.default.createElement("div", { className: "flex space-x-2" },
                    react_1.default.createElement("span", null, totals.grossTotal.toFixed(2)),
                    react_1.default.createElement("span", null, "PLN"))))));
};
exports.default = InvoiceComponent;
