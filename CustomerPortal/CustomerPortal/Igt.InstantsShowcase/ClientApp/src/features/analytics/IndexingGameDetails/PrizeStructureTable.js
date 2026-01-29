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
var CheckCircleOutline_1 = require("@material-ui/icons/CheckCircleOutline");
var currency_conversion_1 = require("../../../shared/utils/currency_conversion");
var useStyles = styles_1.makeStyles({
    table: {
        minWidth: 650,
    },
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function PrizeStructureTable(props) {
    var classes = useStyles();
    var counter = 0;
    return (React.createElement(TableContainer_1.default, { component: Paper_1.default, style: { maxHeight: "80vh" } },
        React.createElement(Table_1.default, { stickyHeader: true, className: classes.table },
            React.createElement(TableHead_1.default, null,
                React.createElement(TableRow_1.default, null,
                    React.createElement(TableCell_1.default, { align: "right" }, "Prize Amount"),
                    React.createElement(TableCell_1.default, { align: "right" }, "Number of Prizes"),
                    React.createElement(TableCell_1.default, null, "Prize Description"),
                    React.createElement(TableCell_1.default, { align: "center" }, "Top Prize"),
                    React.createElement(TableCell_1.default, null, "Prize Type"))),
            React.createElement(TableBody_1.default, null, props.data.map(function (row) { return (React.createElement(TableRow_1.default, { key: counter++ },
                React.createElement(TableCell_1.default, { align: "right" }, currency_conversion_1.currency_conversion.currencyFormat(row.prizeAmount)),
                React.createElement(TableCell_1.default, { align: "right" }, numberWithCommas(row.numberOfPrizes)),
                React.createElement(TableCell_1.default, { align: "center" }, row.topPrize ? (React.createElement(CheckCircleOutline_1.default, { style: { color: "#4DAA57" } })) : (React.createElement("span", null))),
                React.createElement(TableCell_1.default, null, row.prizeTypeName))); })))));
}
exports.default = PrizeStructureTable;
//# sourceMappingURL=PrizeStructureTable.js.map