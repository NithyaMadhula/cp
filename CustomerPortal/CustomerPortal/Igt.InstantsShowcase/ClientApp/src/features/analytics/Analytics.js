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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var styles_1 = require("@material-ui/core/styles");
var AppBar_1 = require("@material-ui/core/AppBar");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var Typography_1 = require("@material-ui/core/Typography");
var Box_1 = require("@material-ui/core/Box");
var Indexing_1 = require("./Indexing/Indexing");
var ActiveGamesSellThru_1 = require("./ActiveGamesSellThru/ActiveGamesSellThru");
var ClosedGamesSalesSellThru_1 = require("./ClosedGamesSalesSellThru/ClosedGamesSalesSellThru");
var DashboardChartView_1 = require("./DashboardChartView/DashboardChartView");
var PrizeStructureProfile_1 = require("./PrizeStructureProfile/PrizeStructureProfile");
var GamePenetration_1 = require("./GamePenetration/GamePenetration");
var NorthAmericanLottery_1 = require("./NorthAmericanLottery/NorthAmericanLottery");
var fetch_data_1 = require("../../shared/utils/fetch_data");
var react_router_dom_1 = require("react-router-dom"); // Import useHistory for redirection
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement(Typography_1.default, __assign({ component: "div", role: "tabpanel", hidden: value !== index, id: "simple-tabpanel-" + index, "aria-labelledby": "simple-tab-" + index }, other), value === index && React.createElement(Box_1.default, { p: 3 }, children)));
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: "simple-tab-" + index,
        "aria-controls": "simple-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.primary,
    },
}); });
var Analytics = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), value = _a[0], setValue = _a[1];
    var _b = React.useState([]), weekEndings = _b[0], setWeekEndings = _b[1];
    var _c = React.useState(""), currentLottery = _c[0], setCurrentLottery = _c[1];
    var history = react_router_dom_1.useHistory(); // Initialize useHistory
    React.useEffect(function () {
        fetch_data_1.fetch_data
            .fetchLotteries()
            .then(function (response) {
            fetch_data_1.fetch_data.getUser().then(function (user) {
                var organizationCode = user.organizationCode;
                sessionStorage.setItem("customerCode", organizationCode);
                var lottery = response.filter(function (x) { return x.customerCode == organizationCode; });
                if (lottery && lottery.length) {
                    setCurrentLottery(lottery[0].businessName);
                }
            });
        })
            .catch(function (error) { return console.error(error); });
        fetch_data_1.fetch_data
            .getSalesWeekEndings()
            .then(function (response) {
            setWeekEndings(response);
        })
            .catch(function (error) { return console.error(error); });
    }, [props.source]);
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar_1.default, { position: "static", style: { backgroundColor: "#002EE5" } },
            React.createElement(Tabs_1.default, { value: value, onChange: handleChange, TabIndicatorProps: { style: { background: "#ff902e" } }, variant: "scrollable", scrollButtons: "auto" },
                React.createElement(Tab_1.default, __assign({ label: "Dashboard" }, a11yProps(0))),
                React.createElement(Tab_1.default, __assign({ label: "Indexing" }, a11yProps(1))),
                React.createElement(Tab_1.default, __assign({ label: "Sales - Active Games" }, a11yProps(2))),
                React.createElement(Tab_1.default, __assign({ label: "Sales - Closed Games" }, a11yProps(3))),
                React.createElement(Tab_1.default, __assign({ label: "Game Penetration" }, a11yProps(4), { style: { display: (weekEndings === null || weekEndings === void 0 ? void 0 : weekEndings.length) ? "inherit" : "none" } })),
                React.createElement(Tab_1.default, __assign({ label: "Prize Structure Profile" }, a11yProps(5))))),
        React.createElement(TabPanel, { value: value, index: 0 },
            React.createElement(DashboardChartView_1.default, { lotteryName: currentLottery })),
        React.createElement(TabPanel, { value: value, index: 1 },
            React.createElement(Indexing_1.default, { lotteryName: currentLottery })),
        React.createElement(TabPanel, { value: value, index: 2 },
            React.createElement(ActiveGamesSellThru_1.default, { lotteryName: currentLottery })),
        React.createElement(TabPanel, { value: value, index: 3 },
            React.createElement(ClosedGamesSalesSellThru_1.default, { lotteryName: currentLottery })),
        React.createElement(TabPanel, { value: value, index: 4 },
            React.createElement(GamePenetration_1.default, { lotteryName: currentLottery })),
        React.createElement(TabPanel, { value: value, index: 5 },
            React.createElement(PrizeStructureProfile_1.default, { lotteryName: currentLottery })),
        React.createElement(TabPanel, { value: value, index: 6 },
            React.createElement(NorthAmericanLottery_1.default, { lotteryName: currentLottery }))));
};
exports.default = Analytics;
//# sourceMappingURL=Analytics.js.map