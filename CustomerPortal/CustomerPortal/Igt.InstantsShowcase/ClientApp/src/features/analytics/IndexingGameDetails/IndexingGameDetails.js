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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Drawer_1 = require("@material-ui/core/Drawer");
var styles_1 = require("@material-ui/core/styles");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var PrizeStructureTable_1 = require("./PrizeStructureTable");
var IndexingGameDetailsInformation_1 = require("./IndexingGameDetailsInformation");
//Styles
var styles_2 = require("./styles");
var reactstrap_1 = require("reactstrap");
//Components
var GameAnalytics_1 = require("./ContentBlocks/GameAnalytics/GameAnalytics");
var GamePhotos_1 = require("./ContentBlocks/GamePhotos/GamePhotos");
var fetch_data_1 = require("../../../shared/utils/fetch_data");
function a11yProps(index) {
    return {
        id: "vertical-tab-" + index,
        "aria-controls": "vertical-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: 224,
    },
    tabs: {
        borderRight: "1px solid " + theme.palette.divider,
    },
}); });
var textFieldStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "24ch",
        },
        "& .MuiInputLabel-root": {
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#5E5E5E",
        },
        "& .MuiInputBase-root input": {
            textTransform: "capitalize",
        },
    },
}); });
var IndexingGameDetails = function (props) {
    var classes = useStyles();
    var textClasses = textFieldStyles();
    var _a = React.useState(0), index = _a[0], setIndex = _a[1];
    var _b = React.useState(true), open = _b[0], setOpen = _b[1];
    var _c = React.useState(null), favoriteId = _c[0], setFavoriteId = _c[1];
    React.useEffect(function () {
        fetch_data_1.fetch_data.fetchFavoriteGames().then(function (x) {
            var fav = x.filter(function (y) { return y.gameID == props.gameData.gameID; });
            if (fav === null || fav === void 0 ? void 0 : fav.length) {
                setFavoriteId(fav[0].favoriteID);
            }
        });
    }, [props.gameData.gameID]);
    var handleChange = function (event, newValue) {
        setIndex(newValue);
    };
    return (React.createElement(Drawer_1.default, { anchor: "bottom", open: open },
        React.createElement("div", { style: {
                height: "100vh",
                width: "100%",
                overflowY: "scroll",
                display: "flex",
                flexWrap: "nowrap",
            } },
            React.createElement(Tabs_1.default, { orientation: "vertical", variant: "scrollable", value: index, onChange: handleChange, "aria-label": "Vertical tabs example", className: classes.tabs, style: { height: "100%", minWidth: "175px" }, TabIndicatorProps: { style: { background: "#ff682e" } } },
                React.createElement(Tab_1.default, __assign({ label: "Game Details" }, a11yProps(0), { style: { color: index !== 0 ? "#002EE5" : "#ff682e" } })),
                React.createElement(Tab_1.default, __assign({ label: "Historical Sales" }, a11yProps(1), { style: {
                        color: index !== 1 ? "#002EE5" : "#ff682e",
                        display: props.hideSales ? "none" : "initial",
                    } })),
                props.prizeStructure && props.prizeStructure.length ? (React.createElement(Tab_1.default, __assign({ label: "Prize Structure" }, a11yProps(2), { style: { color: index !== 2 ? "#002EE5" : "#ff682e" } }))) : (""),
                React.createElement(Tab_1.default, { label: "Back To Results", color: "primary", onClick: function () { return setOpen(false); }, style: { color: "#002EE5", fontWeight: 700 } })),
            React.createElement("div", { hidden: index !== 0, style: { flexGrow: 1, background: "#EEEEEE" } },
                React.createElement(styles_2.GameMainContainer, null,
                    React.createElement(styles_2.GameTitle, { className: "header-text" }, props.gameData.gameName),
                    React.createElement(styles_2.GameDetailsContainer, null,
                        React.createElement("div", { style: { minWidth: 300 } },
                            React.createElement(GamePhotos_1.default, { concept: false, gameData: props.gameData }),
                            React.createElement("br", null),
                            props.canFavorite ? (React.createElement(reactstrap_1.Button, { onClick: function () {
                                    if (!favoriteId) {
                                        fetch_data_1.fetch_data
                                            .saveFavorite(props.gameData.gameID)
                                            .then(function (favs) {
                                            var favorite = favs.filter(function (x) { return x.gameID == props.gameData.gameID; })[0];
                                            setFavoriteId(favorite.favoriteID);
                                        });
                                    }
                                    else {
                                        fetch_data_1.fetch_data
                                            .deleteFavorite(favoriteId)
                                            .then(function (x) { return setFavoriteId(null); });
                                    }
                                } }, favoriteId ? "Remove from Favorites" : "Add to Favorites")) : (React.createElement(React.Fragment, null))),
                        React.createElement(styles_2.GameInfoContainer, { className: textClasses.root },
                            React.createElement(IndexingGameDetailsInformation_1.default, { data: props.gameData }))))),
            React.createElement("div", { hidden: index !== 1, style: { flexGrow: 1 } },
                React.createElement(styles_2.GameAnalyticContainer, null, props.gameData ? (React.createElement(GameAnalytics_1.default, { gameData: props.gameData })) : (React.createElement(React.Fragment, null, " ")))),
            React.createElement("div", { hidden: index !== 2, style: { flexGrow: 1 } }, props.prizeStructure && props.prizeStructure.length ? (React.createElement(PrizeStructureTable_1.default, { data: props.prizeStructure })) : ("")))));
};
exports.default = IndexingGameDetails;
//# sourceMappingURL=IndexingGameDetails.js.map