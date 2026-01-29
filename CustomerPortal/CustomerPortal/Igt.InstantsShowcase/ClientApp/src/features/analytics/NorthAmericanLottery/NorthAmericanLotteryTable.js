"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var TableSortLabel_1 = require("@material-ui/core/TableSortLabel");
var Paper_1 = require("@material-ui/core/Paper");
var GetApp_1 = require("@material-ui/icons/GetApp");
var currency_conversion_1 = require("../../../shared/utils/currency_conversion");
var react_csv_1 = require("react-csv");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var useStyles = styles_1.makeStyles({
    table: {
        minWidth: 650,
    },
});
function NorthAmericanLotteryTable(props) {
    var _a = React.useState(""), order = _a[0], setOrder = _a[1];
    var _b = React.useState(""), orderBy = _b[0], setOrderBy = _b[1];
    var _c = React.useState(props.data), sortedData = _c[0], setSortedData = _c[1];
    var classes = useStyles();
    var counter = 0;
    var handleRequestSort = function (event, property, converter) {
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        setSortedData(stableSort(props.data, getComparator(converter)));
    };
    var createSortHandler = function (property, converter) { return function (event) {
        return handleRequestSort(event, property, converter);
    }; };
    function descendingComparator(a, b, orderBy, converter) {
        if (a.lotteryId === 0) {
            return 10;
        }
        else if (b.lotteryId === 0) {
            return -10;
        }
        var v1 = converter ? converter(a[orderBy]) : a[orderBy];
        var v2 = converter ? converter(b[orderBy]) : b[orderBy];
        if (v2 < v1) {
            return -1;
        }
        if (v2 > v1) {
            return 1;
        }
        return 0;
    }
    function getComparator(converter) {
        return order === "desc"
            ? function (a, b) { return descendingComparator(a, b, orderBy, converter); }
            : function (a, b) { return -descendingComparator(a, b, orderBy, converter); };
    }
    function stableSort(array, comparator) {
        var stabilizedThis = array.map(function (el, index) { return [el, index]; });
        stabilizedThis.sort(function (a, b) {
            var order = comparator(a[0], b[0]);
            if (order !== 0)
                return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(function (el) { return el[0]; });
    }
    var getSortCell = function (id, label, converter) {
        return (React.createElement(TableSortLabel_1.default, { active: orderBy === id, direction: orderBy === id ? order : "asc", onClick: createSortHandler(id, converter) }, React.createElement("span", { style: { color: "#3f51b5" } }, label)));
    };
    function naloTable(props) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Tooltip_1.default, { title: "Download report.", arrow: true, placement: "bottom", style: { fontSize: "16px", margin: "6px 1px", float: "right" } },
                React.createElement(react_csv_1.CSVLink, { data: sortedData, filename: "nalo-" + new Date().toLocaleDateString() + ".csv" },
                    React.createElement(GetApp_1.default, { style: {
                            color: "rgb(21, 156, 219)",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            position: "relative",
                            top: "6px",
                            left: "10px",
                            float: "right",
                        } }))),
            " ",
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(core_1.Card, null,
                React.createElement(TableContainer_1.default, { component: Paper_1.default, style: { maxHeight: "60vh" } },
                    React.createElement(Table_1.default, { stickyHeader: true, className: classes.table },
                        React.createElement(TableHead_1.default, null,
                            React.createElement(TableRow_1.default, null,
                                React.createElement(TableCell_1.default, null, getSortCell("businessName", "Jurisdiction")),
                                React.createElement(TableCell_1.default, { align: "right" }, getSortCell("revenueYTDPrior", "Prior Year")),
                                React.createElement(TableCell_1.default, { align: "right" }, getSortCell("revenueYTDCurrent", "Current Year")),
                                React.createElement(TableCell_1.default, { align: "right" }, getSortCell("percentChange", "Percent Change", function (x) {
                                    return Number(x);
                                })))),
                        React.createElement(TableBody_1.default, null, sortedData
                            .filter(function (row) { return !!row; })
                            .map(function (row) { return (React.createElement(TableRow_1.default, { key: row.lotteryId },
                            React.createElement(TableCell_1.default, { style: {
                                    fontWeight: row.lotteryId === 0 ? 700 : 400,
                                } }, row.businessName),
                            React.createElement(TableCell_1.default, { align: "right", style: {
                                    fontWeight: row.lotteryId === 0 ? 700 : 400,
                                } }, currency_conversion_1.currency_conversion.currencyFormat(row.revenueYTDPrior, 0)),
                            React.createElement(TableCell_1.default, { align: "right", style: {
                                    fontWeight: row.lotteryId === 0 ? 700 : 400,
                                } }, currency_conversion_1.currency_conversion.currencyFormat(row.revenueYTDCurrent, 0)),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement("strong", { style: {
                                        color: Number(row.percentChange) > 0
                                            ? "green"
                                            : !Number(row.percentChange)
                                                ? "black"
                                                : "red",
                                    } },
                                    row.percentChange.toFixed(1),
                                    "%")))); })))))));
    }
    return React.createElement(React.Fragment, null, naloTable(props));
}
exports.default = NorthAmericanLotteryTable;
//# sourceMappingURL=NorthAmericanLotteryTable.js.map