"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var Paper_1 = require("@material-ui/core/Paper");
var TableSortLabel_1 = require("@material-ui/core/TableSortLabel");
var useStyles = styles_1.makeStyles({
    table: {
        minWidth: 650,
    },
});
var formatDate = function (date) { return new Date(date).toLocaleDateString(); };
function IndexingTable(props) {
    var _a = React.useState(false), isSorted = _a[0], setIsSorted = _a[1];
    var _b = React.useState(""), order = _b[0], setOrder = _b[1];
    var _c = React.useState(""), orderBy = _c[0], setOrderBy = _c[1];
    var _d = React.useState(props.data), sortedData = _d[0], setSortedData = _d[1];
    var classes = useStyles();
    React.useEffect(function () {
        setIsSorted(false);
        setOrder("");
        setOrderBy("");
        setSortedData(props.data);
    }, [props]);
    var handleRequestSort = function (event, property, converter) {
        setIsSorted(orderBy === property);
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        setSortedData(stableSort(props.data, getComparator(converter)));
    };
    var createSortHandler = function (property, converter) { return function (event) {
        return handleRequestSort(event, property, converter);
    }; };
    function descendingComparator(a, b, orderBy, converter) {
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
            ? function (a, b) { return -descendingComparator(a, b, orderBy, converter); }
            : function (a, b) { return descendingComparator(a, b, orderBy, converter); };
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
        return (React.createElement(TableSortLabel_1.default, { active: orderBy === id && isSorted, direction: (orderBy === id ? order : "asc"), onClick: createSortHandler(id, converter) }, React.createElement("span", { style: { color: "#3f51b5" } }, label)));
    };
    var rosTotal = props.data
        .map(function (x) { return Number(x.averageRoS); })
        .reduce(function (a, b) {
        return a + b;
    }, 0);
    var onGameClick = function (row) { return function () { return props.onGameSelect(row.gameID); }; };
    return (React.createElement(TableContainer_1.default, { component: Paper_1.default, style: { maxHeight: "65vh" } },
        React.createElement(Table_1.default, { stickyHeader: true, className: classes.table },
            React.createElement(TableHead_1.default, null,
                React.createElement(TableRow_1.default, null,
                    React.createElement(TableCell_1.default, null, getSortCell("startDate", "Start Date")),
                    React.createElement(TableCell_1.default, null, "Game"),
                    React.createElement(TableCell_1.default, null, getSortCell("averageSales", "Average Sales", function (x) {
                        var value = (x || "").replace(/[$,]*/g, "");
                        return value ? Number(value) : 0;
                    })),
                    React.createElement(TableCell_1.default, null, getSortCell("standardIndex", "Standard Index", function (x) {
                        return Number(x);
                    })),
                    React.createElement(TableCell_1.default, null, getSortCell("averageRoS", "Average RoS", function (x) { return Number(x); })),
                    React.createElement(TableCell_1.default, null, getSortCell("rosIndex", "RoS Index", function (x) { return Number(x); })),
                    React.createElement(TableCell_1.default, null, "Active Penetration"),
                    React.createElement(TableCell_1.default, null, getSortCell("sellThru", "Sell-Thru", function (x) { return Number(x); })))),
            React.createElement(TableBody_1.default, null, sortedData.map(function (row) { return (React.createElement(TableRow_1.default, { key: row.gameRefNumber },
                React.createElement(TableCell_1.default, null, formatDate(row.startDate)),
                React.createElement(TableCell_1.default, { onClick: onGameClick(row), style: { color: "#002EE5" } },
                    row.gameRefNumber,
                    " ",
                    row.gameName),
                React.createElement(TableCell_1.default, null, row.averageSales),
                React.createElement(TableCell_1.default, null, row.standardIndex),
                React.createElement(TableCell_1.default, null,
                    "$",
                    row.averageRoS),
                React.createElement(TableCell_1.default, null, row.rosIndex),
                React.createElement(TableCell_1.default, null,
                    row.activePenetration,
                    "%"),
                React.createElement(TableCell_1.default, null, row.sellThru))); })))));
}
exports.default = IndexingTable;
//# sourceMappingURL=IndexingTable.js.map