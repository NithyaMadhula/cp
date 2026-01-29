"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var ActiveGamesSellThruTable_1 = require("./ActiveGamesSellThruTable");
var fetch_data_1 = require("../../../shared/utils/fetch_data");
var GetApp_1 = require("@material-ui/icons/GetApp");
var react_csv_1 = require("react-csv");
var ResultsCount_1 = require("../ResultsCount");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var fetchActiveGamesSellThru = fetch_data_1.fetch_data.fetchActiveGamesSellThru;
var ActiveGamesSellThru = function (props) {
    var _a = React.useState([]), data = _a[0], setData = _a[1];
    var hasData = function () { return !!(data && data.length); };
    React.useEffect(function () {
        fetchActiveGamesSellThru()
            .then(function (response) {
            var d = response || [];
            d.sort(function (a, b) { return b.salesToDate - a.salesToDate; });
            setData(d);
        })
            .catch(function (error) { return console.error(error); });
    }, [setData]);
    return (React.createElement("main", null,
        hasData() ? (React.createElement(React.Fragment, null,
            React.createElement(ResultsCount_1.default, { count: data.length, pStyle: { float: "right" } }),
            React.createElement(Tooltip_1.default, { title: "Download report.", arrow: true, placement: "bottom", style: { fontSize: "16px", margin: "6px 1px", float: "right" } },
                React.createElement(react_csv_1.CSVLink, { data: data, filename: "active-games-" + new Date().toLocaleDateString() + ".csv" },
                    React.createElement(GetApp_1.default, { style: {
                            color: "rgb(21, 156, 219)",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            position: "relative",
                            right: "10px",
                            top: "-10px",
                            float: "right",
                        } }))))) : (""),
        console.log(data),
        hasData() ? (React.createElement(ActiveGamesSellThruTable_1.default, { data: data })) : (React.createElement(core_1.LinearProgress, null))));
};
exports.default = ActiveGamesSellThru;
//# sourceMappingURL=ActiveGamesSellThru.js.map