"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
//Components
var YtdTicketSales_1 = require("./Charts/YtdTicketSales/YtdTicketSales");
var YtdPercentSales_1 = require("./Charts/YtdPercentSales/YtdPercentSales");
var TotalSalesOverview_1 = require("./Charts/TotalSalesOverview/TotalSalesOverview");
var LegacyCharts_1 = require("./Charts/LegacyCharts/LegacyCharts");
var DashboardChartView = function (props) {
    return (React.createElement("main", null,
        React.createElement("h3", { className: "section-text pl-2" },
            props.lotteryName,
            " Metrics"),
        React.createElement("br", null),
        React.createElement(TotalSalesOverview_1.default, { lotteryName: props.lotteryName }),
        React.createElement(LegacyCharts_1.default, null),
        React.createElement("br", null),
        React.createElement(YtdTicketSales_1.default, null),
        React.createElement("br", null),
        React.createElement(YtdPercentSales_1.default, null),
        React.createElement("br", null),
        React.createElement("br", null)));
};
//End
exports.default = DashboardChartView;
//# sourceMappingURL=DashboardChartView.js.map