"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Card_1 = require("@material-ui/core/Card");
var TextField_1 = require("@material-ui/core/TextField");
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var replacePipe = function (value) {
    return value ? value.replace("|", ", ") : "";
};
var IndexingGameDetailsInformation = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Card_1.default, null,
            React.createElement("h3", { className: "section-text pl-2" }, "Summary"),
            React.createElement(TextField_1.default, { label: "Game Number", inputProps: { readonly: "true", value: props.data.gameNumber || "" } }),
            React.createElement(TextField_1.default, { label: "Game ID", inputProps: {
                    readonly: "true",
                    value: props.data.gameReferenceID || "",
                } }),
            React.createElement(TextField_1.default, { label: "Jurisdiction", inputProps: {
                    readonly: "true",
                    value: props.data.businessName || "",
                } }),
            //props.data.index ? (React.createElement(TextField_1.default, { label: "Performance Score", inputProps: {
            //        readonly: "true",
            //        value: props.data.index || "",
            //    } })) : (""),
            React.createElement(TextField_1.default, { label: "Launch Date", inputProps: { readonly: "true", value: props.data.startDate || "" } }),
            React.createElement(TextField_1.default, { label: "Ticket Price", inputProps: {
                    readonly: "true",
                    value: "$" + Number(props.data.ticketPrice || "").toFixed(2),
                } }),
            React.createElement(TextField_1.default, { label: "Tickets Ordered", inputProps: {
                    readonly: "true",
                    value: numberWithCommas(props.data.ticketsOrdered || 0),
                } }),
            React.createElement(TextField_1.default, { label: "Listed Odds", inputProps: {
                    readonly: "true",
                    value: props.data.odds || 0,
                } }),
            React.createElement(TextField_1.default, { label: "Listed Payout", inputProps: {
                    readonly: "true",
                    value: (props.data.prizePayoutPercent || 0) + "%",
                } }),
            React.createElement(TextField_1.default, { label: "Calculated Odds", inputProps: {
                    readonly: "true",
                    value: props.data.calcOdds || 0,
                } }),
            React.createElement(TextField_1.default, { label: "Calculated Payout", inputProps: {
                    readonly: "true",
                    value: (props.data.calcPrizePayoutPercent || 0) + "%",
                } }),
            React.createElement("div", { style: { margin: "10px" } },
                React.createElement("br", null))),
        React.createElement(Card_1.default, { style: { marginTop: "30px", width: "100%" } },
            React.createElement("h3", { className: "section-text pl-2" }, "Details"),
            props.data.numPlayStyle ? (React.createElement(TextField_1.default, { label: "# of Play Styles", inputProps: {
                    readonly: "true",
                    value: props.data.numPlayStyle || "",
                } })) : (React.createElement(React.Fragment, null)),
            React.createElement("div", { style: { margin: "10px" } },
                React.createElement("br", null)),
            React.createElement(TextField_1.default, { label: "Theme", multiline: true, inputProps: {
                    readonly: "true",
                    value: replacePipe(props.data.theme || ""),
                } }),
            React.createElement(TextField_1.default, { label: "Play Style", multiline: true, inputProps: {
                    readonly: "true",
                    value: replacePipe(props.data.playStyle || ""),
                } }),
            React.createElement(TextField_1.default, { label: "Feature", multiline: true, inputProps: {
                    readonly: "true",
                    value: replacePipe(props.data.feature || ""),
                } }),
            props.data.color ? (React.createElement(TextField_1.default, { label: "Color", multiline: true, inputProps: {
                    readonly: "true",
                    value: replacePipe(props.data.color),
                } })) : (React.createElement(React.Fragment, null)),
            React.createElement("div", { style: { margin: "10px" } },
                React.createElement("br", null)),
            React.createElement(TextField_1.default, { label: "Multiple Scenes", inputProps: {
                    readonly: "true",
                    value: props.data.multipleScenes || "",
                } }),
            React.createElement(TextField_1.default, { label: "Multi Color Imaging", inputProps: {
                    readonly: "true",
                    value: props.data.multiColorImaging || "",
                } }),
            React.createElement(TextField_1.default, { label: "Low Top Prize", inputProps: {
                    readonly: "true",
                    value: props.data.lowTopPrize || "",
                } }),
            React.createElement(TextField_1.default, { label: "Limited Tier", inputProps: {
                    readonly: "true",
                    value: props.data.limitedTier || "",
                } }),
            React.createElement(TextField_1.default, { label: "Low Marquee", inputProps: {
                    readonly: "true",
                    value: props.data.lowMarquee || "",
                } }),
            React.createElement(TextField_1.default, { label: "No-Breakeven", inputProps: {
                    readonly: "true",
                    value: props.data.noBreakeven || "",
                } }),
            React.createElement(TextField_1.default, { label: "Spotlight", inputProps: {
                    readonly: "true",
                    value: props.data.spotlight || "",
                } }),
            React.createElement("div", { style: { margin: "10px" } },
                React.createElement("br", null)))));
};
exports.default = IndexingGameDetailsInformation;
//# sourceMappingURL=IndexingGameDetailsInformation.js.map