"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var NorthAmericanLotteryTable_1 = require("./NorthAmericanLotteryTable");
var ExpansionPanel_1 = require("@material-ui/core/ExpansionPanel");
var ExpansionPanelSummary_1 = require("@material-ui/core/ExpansionPanelSummary");
var ExpansionPanelDetails_1 = require("@material-ui/core/ExpansionPanelDetails");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var fetch_data_1 = require("../../../shared/utils/fetch_data");
var currency_conversion_1 = require("../../../shared/utils/currency_conversion");
var fetchNaloLotterySales = fetch_data_1.fetch_data.fetchNaloLotterySales, fetchNaloYtdSales = fetch_data_1.fetch_data.fetchNaloYtdSales, ticketBreakdown = fetch_data_1.fetch_data.ticketBreakdown;
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
var getStyle = function (value) {
    if (!value)
        return {};
    value = value.replace("%", "");
    return {
        fontWeight: 700,
        color: Number(value) > 0 ? "green" : !Number(value) ? "black" : "red",
    };
};
var NorthAmericanLottery = function (props) {
    var _a = React.useState(false), init = _a[0], setInit = _a[1];
    var _b = React.useState({}), naloSalesData = _b[0], setNaloSalesData = _b[1];
    var _c = React.useState({}), naloYtdData = _c[0], setNaloYtdData = _c[1];
    var _d = React.useState(null), ticketData = _d[0], setTicketData = _d[1];
    var _e = React.useState("1/1/" + (new Date().getFullYear()).toString()), start = _e[0], setStart = _e[1];
    var hasData = function (data) { return data && data.length; };
    React.useEffect(function () {
        setNaloSalesData({});
        fetchNaloLotterySales(start)
            .then(function (response) {
            setNaloSalesData(response);
        })
            .catch(function (error) { return console.error(error); })
            .finally(function () { return setInit(true); });
        fetchNaloYtdSales(start)
            .then(function (response) {
            setNaloYtdData(response[0]);
        })
            .catch(function (error) { return console.error(error); });
        ticketBreakdown(null, 0)
            .then(function (response) {
            //removes rows when data is missing
            var filtered = response.filter(function (x) { return x.percentChangeYear || x.currWeekSales; });
            setTicketData(filtered);
            if (!filtered.length) {
                console.warn("NALO - missing data, ticketBreakdown[].percentChangeYear not returned from API.");
            }
        })
            .catch(function (error) { return console.error(error); });
    }, [setNaloSalesData, setInit, setNaloYtdData, setTicketData]);
    return (React.createElement("main", null,
        !hasData(naloSalesData) ||
            !(naloYtdData && naloYtdData.currWeek) ||
            !hasData(ticketData) ? (React.createElement(core_1.LinearProgress, null)) : (React.createElement(React.Fragment, null)),
        naloYtdData && naloYtdData.currWeek ? (React.createElement(React.Fragment, null,
            React.createElement(ExpansionPanel_1.default, null,
                React.createElement(ExpansionPanelSummary_1.default, { expandIcon: React.createElement(ExpandMore_1.default, null) },
                    React.createElement("div", { style: { display: "block" } },
                        React.createElement("h3", { className: "section-text pl-2" },
                            props.lotteryName,
                            " Instants CYTD Sales"),
                        React.createElement("br", null),
                        React.createElement(TableContainer_1.default, { style: { maxWidth: "510px" } },
                            React.createElement(Table_1.default, null,
                                React.createElement(TableHead_1.default, null,
                                    React.createElement(TableRow_1.default, null,
                                        React.createElement(TableCell_1.default, { align: "center" }, "Current Week Ending"),
                                        React.createElement(TableCell_1.default, { align: "center" }, "Prior CYTD Sales"),
                                        React.createElement(TableCell_1.default, { align: "center" }, "CYTD Sales"),
                                        React.createElement(TableCell_1.default, { align: "center" }, "Percent Change"))),
                                React.createElement(TableBody_1.default, null,
                                    React.createElement(TableRow_1.default, null,
                                        React.createElement(TableCell_1.default, { align: "center" }, new Date(naloYtdData.currWeek).toLocaleDateString()),
                                        React.createElement(TableCell_1.default, { align: "center" }, currency_conversion_1.currency_conversion.currencyFormat(naloYtdData.priorYearYTDSales, 0, true)),
                                        React.createElement(TableCell_1.default, { align: "center" }, currency_conversion_1.currency_conversion.currencyFormat(naloYtdData.ytdSales, 0, true)),
                                        React.createElement(TableCell_1.default, { align: "center", style: getStyle(naloYtdData.percentChangeYear) }, naloYtdData.percentChangeYear
                                            ? naloYtdData.percentChangeYear
                                            : "N/A"))))))),
                React.createElement(ExpansionPanelDetails_1.default, null,
                    React.createElement(TableContainer_1.default, { style: {
                            width: "100%",
                        } }, hasData(ticketData) ? (React.createElement(Table_1.default, null,
                        React.createElement(TableHead_1.default, null,
                            React.createElement(TableRow_1.default, null,
                                React.createElement(TableCell_1.default, { align: "center" }, "Ticket Price"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Week Sales"),
                                React.createElement(TableCell_1.default, { align: "right" }, "CYTD Sales"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Percent of Total"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Prior Year Week Sales"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Prior Year CYTD Sales"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Week Difference"),
                                React.createElement(TableCell_1.default, { align: "right" }, "% Change Week"),
                                React.createElement(TableCell_1.default, { align: "right" }, "CYTD Difference"),
                                React.createElement(TableCell_1.default, { align: "right" }, "% Change Year"))),
                        React.createElement(TableBody_1.default, null, (ticketData || []).map(function (x) { return (React.createElement(TableRow_1.default, null,
                            React.createElement(TableCell_1.default, { align: "center" }, currency_conversion_1.currency_conversion.currencyFormat(x.ticketPrice)),
                            React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(x.currWeekSales, 0, true)),
                            React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(x.ytdSales, 0, true)),
                            React.createElement(TableCell_1.default, { align: "right" }, x.percentSalesYTD),
                            React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(x.priorYearWeekSales, 0, true)),
                            React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(x.priorYearYTDSales, 0, true)),
                            React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(x.weekDifference, 0, true)),
                            React.createElement(TableCell_1.default, { align: "right", style: getStyle(x.percentChangeWeek) }, x.percentChangeWeek),
                            React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(x.ytdDifference, 0, true)),
                            React.createElement(TableCell_1.default, { align: "right", style: getStyle(x.percentChangeYear) }, x.percentChangeYear ? x.percentChangeYear : 'N/A'))); })))) : (React.createElement(React.Fragment, null))))))) : (React.createElement(React.Fragment, null)),
        React.createElement("br", null),
        hasData(naloSalesData) ? (React.createElement(NorthAmericanLotteryTable_1.default, { data: naloSalesData })) : (React.createElement(React.Fragment, null))));
};
exports.default = NorthAmericanLottery;
//# sourceMappingURL=NorthAmericanLottery.js.map