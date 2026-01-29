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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var reactstrap_1 = require("reactstrap");
var TicketPrices_1 = require("./TicketPrices");
var WeekEndings_1 = require("./WeekEndings");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var react_plotly_js_1 = require("react-plotly.js");
var FiberManualRecord_1 = require("@material-ui/icons/FiberManualRecord");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var fetch_data_1 = require("../../../shared/utils/fetch_data");
var ResultsCount_1 = require("../ResultsCount");
var fetchWeeklyGamePenetration = fetch_data_1.fetch_data.fetchWeeklyGamePenetration, fetchWeeksInMarketPenetration = fetch_data_1.fetch_data.fetchWeeksInMarketPenetration, fetchRateOfSalesPenetration = fetch_data_1.fetch_data.fetchRateOfSalesPenetration, fetchRateOfSalesTrendPenetration = fetch_data_1.fetch_data.fetchRateOfSalesTrendPenetration, getSalesWeekEndings = fetch_data_1.fetch_data.getSalesWeekEndings, getTicketPrices = fetch_data_1.fetch_data.getTicketPrices;
var useStyles = styles_1.makeStyles(function (theme) { return ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}); });
function a11yProps(index) {
    return {
        id: "vertical-tab-" + index,
        "aria-controls": "vertical-tabpanel-" + index,
    };
}
var GamePenetration = function (props) {
    var _a = React.useState([]), activeData = _a[0], setActiveData = _a[1];
    var _b = React.useState(1), activeTotal = _b[0], setActiveTotal = _b[1];
    var _c = React.useState([]), marketWeeksData = _c[0], setMarketWeeksData = _c[1];
    var _d = React.useState(1), marketTotal = _d[0], setMarketTotal = _d[1];
    var _e = React.useState(false), isGamePenLoaded = _e[0], setIsGamePenLoaded = _e[1];
    var _f = React.useState([]), rosData = _f[0], setRosData = _f[1];
    var _g = React.useState([]), rosTrendData = _g[0], setRosTrendData = _g[1];
    var _h = React.useState("0.00"), price = _h[0], setPrice = _h[1];
    var _j = React.useState([]), ticketPrices = _j[0], setTicketPrices = _j[1];
    var _k = React.useState(null), week = _k[0], setWeek = _k[1];
    var _l = React.useState([]), weekEndings = _l[0], setWeekEndings = _l[1];
    var _m = React.useState(0), index = _m[0], setIndex = _m[1];
    var _o = React.useState(""), start = _o[0], setStart = _o[1];
    var _p = React.useState("0.00"), rosPrice = _p[0], setRosPrice = _p[1];
    var _q = React.useState(false), rosTrendLoaded = _q[0], setRosTrendLoaded = _q[1];
    var classes = useStyles();
    var fetchSearchData = function () {
        setIsGamePenLoaded(true);
        setActiveData([]);
        fetchWeeklyGamePenetration(week, price)
            .then(function (response) {
            var _a;
            var total = response
                .map(function (x) { return x.actualPrintRun; })
                .reduce(function (a, b) { return a + b; }, 0);
            setActiveTotal(total);
            var activeDataMapping = (_a = response === null || response === void 0 ? void 0 : response.map(function (v) { return ({
                x: [v.penPercentage * 100],
                y: [v.currentWeekValidations],
                mode: "markers",
                marker: {
                    color: "#1b9ddb",
                    line: { color: "#002EE5", width: 2 },
                    size: getActiveMarkerSize(v.actualPrintRun),
                },
                text: [v.tooltipInfo],
                name: v.gameName + " - " + v.gameNumber,
            }); })) !== null && _a !== void 0 ? _a : [];
            setActiveData(activeDataMapping || []);
        })
            .catch(function (error) { return console.error(error); });
        fetchWeeksInMarketPenetration(week, price)
            .then(function (response) {
            var _a;
            var total = response
                .map(function (x) { return x.invRemaining; })
                .reduce(function (a, b) { return a + b; }, 0);
            setMarketTotal(total);
            var resultMarketWeeksData = (_a = response === null || response === void 0 ? void 0 : response.map(function (v) { return ({
                x: [v.penPercentage * 100],
                y: [v.validationAmt],
                mode: "markers",
                marker: {
                    color: v.bubbleColor.toLowerCase(),
                    line: { color: "#555", width: 2 },
                    size: getMarketMarkerSize(v.invRemaining),
                },
                text: [v.tooltipInfo],
                name: v.gameName + " - " + v.gameNumber,
            }); })) !== null && _a !== void 0 ? _a : [];
            setMarketWeeksData(resultMarketWeeksData);
        })
            .catch(function (error) { return console.error(error); });
        fetchRateOfSalesPenetration(week, price)
            .then(function (response) {
            var rosData = (response === null || response === void 0 ? void 0 : response.length)
                ? [
                    {
                        x: __spreadArray([], response.map(function (x) { return x.gameName; })),
                        y: __spreadArray([], response.map(function (x) { return x.rate; })),
                        type: "bar",
                        text: __spreadArray([], response.map(function (x) { return x.tooltipInfo; })),
                        marker: {
                            color: __spreadArray([], response.map(function (x) {
                                return x.price.replace("$", "") == price ? "#ff902e" : "#002EE5";
                            })),
                        },
                    },
                ]
                : [];
            setRosData(rosData);
        })
            .catch(function (error) { return console.error(error); });
    };
    var fetchRosData = function () {
        fetchRateOfSalesTrendPenetration(start, rosPrice)
            .then(function (response) {
            var mapping = [];
            response = response || [];
            var games = response
                .map(function (x) { return x.gameNumber; })
                .filter(function (v, i, s) { return s.indexOf(v) === i; });
            var _loop_1 = function (i) {
                var filtered = response.filter(function (x) { return x.gameNumber == games[i]; });
                mapping.push({
                    y: filtered.map(function (x) { return x.rate; }),
                    x: Array.from({ length: filtered.length }, function (v, k) { return k + 1; }),
                    name: games[i] + " - " + filtered[0].gameName,
                    text: filtered.map(function (x) { return x.tooltipInfo; }),
                    type: "line",
                });
            };
            for (var i = 0; i < games.length; i++) {
                _loop_1(i);
            }
            setRosTrendData(mapping);
            setRosTrendLoaded(true);
        })
            .catch(function (error) { return console.error(error); });
    };
    var hasData = function (data) { return data && data.length; };
    var handleChange = function (event, newValue) { return setIndex(newValue); };
    var getActiveMarkerSize = function (value) {
        var size = (value / activeTotal) * 100 * 5;
        return size > 10 ? (size > 50 ? 50 : size) : 10;
    };
    var getMarketMarkerSize = function (value) {
        var size = (value / marketTotal) * 100 * 5;
        return size > 10 ? (size > 75 ? 75 : size) : 10;
    };
    React.useEffect(function () {
        getTicketPrices()
            .then(function (response) {
            setTicketPrices(response);
        })
            .catch(function (error) { return console.error(error); });
        getSalesWeekEndings()
            .then(function (response) {
            setWeekEndings(response);
        })
            .catch(function (error) { return console.error(error); });
    }, [setTicketPrices, setWeekEndings]);
    return (React.createElement("main", null,
        React.createElement(core_1.Card, { className: "dashboard-card" },
            React.createElement("h3", { className: "section-text pl-2" }, "Game Penetration"),
            React.createElement("form", { noValidate: true, className: classes.container + " py-2", style: { width: "100%" } },
                (ticketPrices.length && (React.createElement(TicketPrices_1.default, { style: { minWidth: "100px" }, ticketPrices: ticketPrices, onchange: function (e) {
                        setPrice(e.target.value);
                        if (isGamePenLoaded) {
                            fetchSearchData();
                        }
                    }, price: price }))) || (React.createElement(CircularProgress_1.default, { style: { width: "25px", height: "25px", margin: "15px" } })),
                (weekEndings.length && (React.createElement(WeekEndings_1.default, { style: { minWidth: "100px" }, weekEndings: weekEndings, onchange: function (e) {
                        setWeek(e.target.value);
                        if (isGamePenLoaded) {
                            fetchSearchData();
                        }
                    }, week: week }))) || (React.createElement(CircularProgress_1.default, { style: { width: "25px", height: "25px", margin: "15px" } })),
                React.createElement(reactstrap_1.Button, { disabled: !price || !week, color: "primary", className: "ml-auto", onClick: fetchSearchData }, "Generate Report"))),
        React.createElement("br", null),
        isGamePenLoaded ? (React.createElement(core_1.Card, { style: { height: "65vh" } },
            React.createElement("div", { style: {
                    height: "100vh",
                    width: "100%",
                    overflowY: "scroll",
                    display: "flex",
                    flexWrap: "nowrap",
                } },
                React.createElement(Tabs_1.default, { orientation: "vertical", variant: "scrollable", value: index, onChange: handleChange, style: {
                        height: "100%",
                        minWidth: "175px",
                        background: "#002EE5",
                    }, TabIndicatorProps: { style: { background: "#ff902e" } } },
                    React.createElement(Tab_1.default, __assign({ label: React.createElement(React.Fragment, null,
                            React.createElement("span", { style: { display: "block" } }, "Active Penetration"),
                            React.createElement("span", { style: { fontSize: "10px" } }, "Bubble Size: Print Run")) }, a11yProps(0), { style: { color: "#FFFFFF" } })),
                    React.createElement(Tab_1.default, __assign({}, a11yProps(1), { style: { color: "#FFFFFF" }, label: React.createElement(React.Fragment, null,
                            React.createElement("span", { style: { display: "block" } }, "Active Penetration"),
                            React.createElement("span", { style: { fontSize: "10px" } }, "Bubble Size: Remaining Inventory")) })),
                    React.createElement(Tab_1.default, __assign({}, a11yProps(2), { style: { color: "#FFFFFF" }, label: "Rate of Sale (" + week + ")" }))),
                React.createElement("div", { hidden: index !== 0, style: {
                        flexGrow: 1,
                        maxHeight: "65vh",
                        padding: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: index !== 0 ? "none" : "flex",
                    } }, hasData(activeData) ? (React.createElement(react_plotly_js_1.default, { style: { flexGrow: 1 }, data: activeData, layout: {
                        width: 1250,
                        height: 500,
                        title: "Active Penetration vs. Sales (validations)",
                        font: { family: "'Verlag A', 'Verlag B'" },
                        xaxis: {
                            title: "Active Penetration %",
                            tickvals: [20, 40, 60, 80],
                            ticktext: ["20%", "40%", "60%", "80%"],
                        },
                        yaxis: {
                            title: "Sales based on Validations",
                            tickvals: [-500000, 0, 500000, 1000000, 1500000],
                            ticktext: [
                                "  -$.5MM",
                                "  $0",
                                "  $.5MM",
                                "  $1MM",
                                "  $1.5MM",
                            ],
                        },
                    } })) : (React.createElement(React.Fragment, null))),
                React.createElement("div", { hidden: index !== 1, style: {
                        flexGrow: 1,
                        maxHeight: "65vh",
                        padding: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: index !== 1 ? "none" : "flex",
                        flexDirection: "column",
                    } }, hasData(marketWeeksData) ? (React.createElement(React.Fragment, null,
                    React.createElement(react_plotly_js_1.default, { style: { flexGrow: 1 }, data: marketWeeksData, layout: {
                            width: 1250,
                            height: 500,
                            title: "Active Penetration vs. Sales (validations)",
                            font: { family: "'Verlag A', 'Verlag B'" },
                            xaxis: {
                                title: "Active Penetration %",
                                tickvals: [20, 40, 60, 80],
                                ticktext: ["20%", "40%", "60%", "80%"],
                            },
                            yaxis: {
                                title: "Sales based on Validations",
                                tickvals: [-500000, 0, 500000, 1000000, 1500000],
                                ticktext: [
                                    "  -$.5MM",
                                    "  $0",
                                    "  $.5MM",
                                    "  $1MM",
                                    "  $1.5MM",
                                ],
                            },
                        } }),
                    React.createElement("br", null),
                    React.createElement("div", { style: {
                            display: "flex",
                            width: "600px",
                            paddingRight: "125px",
                        } },
                        React.createElement("span", { style: { flex: "1" } },
                            React.createElement(FiberManualRecord_1.default, { style: { color: "green" } }),
                            " 0-13 Weeks"),
                        React.createElement("span", { style: { flex: "1" } },
                            React.createElement(FiberManualRecord_1.default, { style: { color: "blue" } }),
                            " 14-26 Weeks"),
                        React.createElement("span", { style: { flex: "1" } },
                            React.createElement(FiberManualRecord_1.default, { style: { color: "yellow" } }),
                            " ",
                            "27-52 Weeks"),
                        React.createElement("span", { style: { flex: "1" } },
                            React.createElement(FiberManualRecord_1.default, { style: { color: "red" } }),
                            "53+ Weeks")))) : (React.createElement(React.Fragment, null))),
                React.createElement("div", { hidden: index !== 2, style: {
                        flexGrow: 1,
                        maxHeight: "65vh",
                        padding: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: index !== 2 ? "none" : "flex",
                    } },
                    React.createElement(react_plotly_js_1.default, { style: { flexGrow: 1 }, data: rosData, layout: {
                            width: 1250,
                            height: 540,
                            margin: { b: 140 },
                            title: "Rate of Sales for " + week,
                            font: { family: "'Verlag A', 'Verlag B'" },
                            showlegend: false,
                            bargap: 0.2,
                            xaxis: {
                                tickangle: -30,
                            },
                            yaxis: { title: "Sales/Retailer Activated ($)" },
                        } }))))) : (React.createElement(React.Fragment, null)),
        React.createElement(core_1.Card, { className: "dashboard-card" },
            React.createElement("h3", { className: "section-text pl-2" }, "Rate of Sale Trend By Game"),
            React.createElement("form", { noValidate: true, className: classes.container + " py-2", style: { width: "100%" } },
                (ticketPrices.length && (React.createElement(TicketPrices_1.default, { style: { minWidth: "100px" }, ticketPrices: ticketPrices, onchange: function (e) {
                        setRosPrice(e.target.value);
                        if (hasData(rosTrendData)) {
                            fetchRosData();
                        }
                    }, price: rosPrice }))) || (React.createElement(CircularProgress_1.default, { style: { width: "25px", height: "25px", margin: "15px" } })),
                React.createElement(core_1.TextField, { className: classes.textField, InputLabelProps: { shrink: true }, label: "Game Start From:", placeholder: "", type: "date", value: start, onChange: function (e) { return setStart(e.target.value); } }),
                React.createElement(reactstrap_1.Button, { disabled: !rosPrice || !start, color: "primary", className: "ml-auto", onClick: fetchRosData }, "Generate Report"))),
        rosTrendLoaded ? React.createElement(ResultsCount_1.default, { count: rosTrendData === null || rosTrendData === void 0 ? void 0 : rosTrendData.length }) : React.createElement("br", null),
        (hasData(rosTrendData) && (React.createElement("div", { style: { margin: "20px auto" } },
            React.createElement(core_1.Card, null,
                React.createElement(react_plotly_js_1.default, { style: { width: "100%", height: "100%", flexGrow: 1 }, data: rosTrendData, layout: {
                        width: 1250,
                        height: 500,
                        font: { family: "'Verlag A', 'Verlag B'" },
                        title: "Rate of Sales Trend by Game",
                        xaxis: { title: "Weeks after Launch" },
                        yaxis: { title: "Sales/Retailer Activated ($)" },
                        hovermode: "closest",
                    } }))))) ||
            ""));
};
exports.default = GamePenetration;
//# sourceMappingURL=GamePenetration.js.map