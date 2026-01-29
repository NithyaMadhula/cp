import * as React from "react";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Games from "./Games";
import { fetch_data } from "../../shared/utils/fetch_data";
import { Button } from "reactstrap";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme: any) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.primary,
    },
}));

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const getIconStyle = (rightPx: number, text: string): any => {
    return {
        position: "absolute",
        transform: "translateY(-35px)",
        fontWeight: 700,
        right: `${rightPx}px`,
        cursor: "pointer",
        fontFamily: "'Verlag A', 'Verlag B', Arial, sans-serif",
        "&::after": {
            content: text,
        },
    };
};

const getValueArray = (array: string[]) =>
    array.indexOf("all") > -1 ? [] : array;

const getFormControl = (
    label: string,
    v: any,
    vCallback: any,
    options: any[]
): any => {
    return (
        <FormControl
            style={{
                minWidth: "415px",
                maxWidth: "415px",
                margin: "0 10px",
            }}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                style={{ maxHeight: "50vh" }}
                multiple
                value={v}
                onChange={vCallback}
                input={<Input />}
                renderValue={(selected: any) =>
                    options
                        .filter((x: any) => selected.indexOf(x.key) > -1)
                        .map((x: any) => x.value)
                        .join(", ")
                }
            >
                <MenuItem key={"all"} value={"all"}>
                    <ListItemText primary={"All"} />
                </MenuItem>
                {options?.map((x: any) => (
                    <MenuItem key={x.key} value={x.key}>
                        <Checkbox color="primary" checked={v.indexOf(x.key) > -1} />
                        <ListItemText primary={x.value} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const Showroom = (props: any) => {
    const FAVS_ID = 1; //tab count + 1
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [favs, setFavs] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [searchData, setSearchData] = React.useState<any>(null);
    const [metadata, setMetadata] = React.useState<any>({});
    const [term, setTerm] = React.useState<any>(null);
    const [perfMin, setPerfMin] = React.useState<any>(null);
    const [start, setStart] = React.useState<any>(null);
    const [end, setEnd] = React.useState<any>(null);
    const [color, setColor] = React.useState<any>([]);
    const [feature, setFeature] = React.useState<any>([]);
    const [stock, setStock] = React.useState<any>([]);
    const [style, setStyle] = React.useState<any>([]);
    const [option, setOption] = React.useState<any>([]);
    const [theme, setTheme] = React.useState<any>([]);
    const [jurisdiction, setJurisdiction] = React.useState<any>([]);
    const [price, setPrice] = React.useState<any>(null);
    const [searchModel, setSearchModel] = React.useState<any>({ pageSize: 5000 });

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
        if (newValue != FAVS_ID) setFavs(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#002EE5" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: "#ff902e" } }}
                >
                    <Tab label="Printed Games" {...a11yProps(0)} />
                    {/* hiding this to control with icon button below AppBar */}
                    <Tab label="Favorites" {...a11yProps(FAVS_ID)} />
                </Tabs>
            </AppBar>

            <span
                style={{
                    ...getIconStyle(210, ""),
                    color: "white",
                    display: searchData ? "initial" : "none",
                }}
                onClick={(e): void => {
                    setSearchData(null);
                    setTerm(null);
                    setPerfMin(null);
                    setStart(null);
                    setEnd(null);
                    setColor([]);
                    setFeature([]);
                    setStock([]);
                    setStyle([]);
                    setOption([]);
                    setTheme([]);
                    setJurisdiction([]);
                    setPrice(null);
                    setSearchModel({ pageSize: 5000 });
                }}
            >
                CLEAR SEARCH
      </span>

            <span
                style={{
                    ...getIconStyle(50, ""),
                    color: "white",
                }}
                onClick={(e): void => {
                    setSearch(!search);

                    fetch_data.fetchSearchMetadata().then((response: any) => {
                        setMetadata(response);
                    });
                }}
            >
                {searchData ? "UPDATE SEARCH" : "SEARCH BRIGHTSTAR GAMES"}
            </span>

            <TabPanel value={value} index={0}>
                <Games searchModel={searchModel} searchData={searchData} />
            </TabPanel>
            <TabPanel value={value} index={FAVS_ID}>
                <Games search={fetch_data.fetchFavoriteGames} isFavorites={true} />
            </TabPanel>

            {metadata ? (
                <Drawer anchor="right" open={search} style={{ display: "block" }}>
                    <h2 className="header-text pt-4 ml-2" style={{ color: "black" }}>
                        Search
          </h2>
                    <div
                        className="pt-3"
                        style={{
                            height: "100vh",
                            width: "30%",
                            minWidth: "500px",
                            overflowY: "auto",
                            display: "flex",
                            flexWrap: "nowrap",
                        }}
                    >
                        <ul style={{ listStyle: "none" }}>
                            <li className="m-2">
                                <TextField
                                    style={{ width: "415px" }}
                                    className={classes.textField}
                                    InputLabelProps={{ shrink: true }}
                                    label="Game Name Contains:"
                                    value={term}
                                    onChange={(e: any) => setTerm(e.target.value)}
                                />
                            </li>

                            <li className="m-2">
                                <TextField
                                    className={classes.textField}
                                    InputLabelProps={{ shrink: true }}
                                    label="Performance Minimum:"
                                    value={perfMin}
                                    onChange={(e: any) => setPerfMin(e.target.value)}
                                />
                            </li>

                            <li className="m-2">
                                <TextField
                                    className={classes.textField}
                                    InputLabelProps={{ shrink: true }}
                                    label="Game Start From:"
                                    placeholder=""
                                    type="date"
                                    value={start}
                                    onChange={(e: any) => setStart(e.target.value)}
                                />
                                <TextField
                                    className={classes.textField}
                                    InputLabelProps={{ shrink: true }}
                                    label="Game Start To:"
                                    placeholder=""
                                    type="date"
                                    value={end}
                                    onChange={(e: any) => setEnd(e.target.value)}
                                />
                            </li>
                            <li className="m-2">
                                <FormControl style={{ minWidth: "200px", margin: "0 10px" }}>
                                    <InputLabel>Ticket Price</InputLabel>
                                    <Select
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value == "all" ? null : e.target.value)
                                        }
                                    >
                                        <MenuItem key={"all"} value={"all"}>
                                            <ListItemText primary={"All"} />
                                        </MenuItem>
                                        {metadata.ticketPrice?.map((x: any) => (
                                            <MenuItem value={x.value}>{x.key}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Jurisdiction",
                                    jurisdiction,
                                    (e: any) => {
                                        setJurisdiction(getValueArray(e.target.value));
                                    },
                                    metadata.jurisdiction
                                )}
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Color",
                                    color,
                                    (e: any) => {
                                        setColor(getValueArray(e.target.value));
                                    },
                                    metadata.color
                                )}
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Feature",
                                    feature,
                                    (e: any) => setFeature(getValueArray(e.target.value)),
                                    metadata.feature
                                )}
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Paper Stock",
                                    stock,
                                    (e: any) => setStock(getValueArray(e.target.value)),

                                    metadata.paperStockCategory
                                )}
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Play Style",
                                    style,
                                    (e: any) => setStyle(getValueArray(e.target.value)),

                                    metadata.playStyle
                                )}
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Specialty Option",
                                    option,
                                    (e: any) => setOption(getValueArray(e.target.value)),

                                    metadata.specialtyOption
                                )}
                            </li>
                            <li className="m-2">
                                {getFormControl(
                                    "Theme",
                                    theme,
                                    (e: any) => setTheme(getValueArray(e.target.value)),
                                    metadata.theme
                                )}
                            </li>
                            <li className="m-2 d-flex">
                                <Button
                                    className="ml-auto mr-4"
                                    color="warn"
                                    onClick={(e): void => {
                                        setSearch(false);
                                    }}
                                >
                                    <ClearIcon />
                                </Button>
                                <Button
                                    className=""
                                    color="primary"
                                    onClick={(e: any): void => {
                                        setSearch(false);
                                        setSearchModel({
                                            gameName: term,
                                            minimumPerformance: Number(perfMin),
                                            ticketPrice: price ? Number(price) : null,
                                            startDate: start || null,
                                            endDate: end || null,
                                            themeIDs: theme?.length ? theme.join(",") : null,
                                            colorIDs: color?.length ? color.join(",") : null,
                                            playStyleIDs: style?.length ? style.join(",") : null,
                                            featureIDs: feature?.length ? feature.join(",") : null,
                                            paperStockCategoryIDs: stock?.length
                                                ? stock.join(",")
                                                : null,
                                            specialtyOptionIDs: option?.length
                                                ? option.join(",")
                                                : null,
                                            jurisdictionIDs: jurisdiction?.length
                                                ? jurisdiction.join(",")
                                                : null,
                                            pageSize: 5000,
                                        });
                                        fetch_data
                                            .fetchGameSearch({
                                                gameName: term,
                                                minimumPerformance: Number(perfMin),
                                                ticketPrice: price ? Number(price) : null,
                                                startDate: start || null,
                                                endDate: end || null,
                                                themeIDs: theme?.length ? theme.join(",") : null,
                                                colorIDs: color?.length ? color.join(",") : null,
                                                playStyleIDs: style?.length ? style.join(",") : null,
                                                featureIDs: feature?.length ? feature.join(",") : null,
                                                paperStockCategoryIDs: stock?.length
                                                    ? stock.join(",")
                                                    : null,
                                                specialtyOptionIDs: option?.length
                                                    ? option.join(",")
                                                    : null,
                                                jurisdictionIDs: jurisdiction?.length
                                                    ? jurisdiction.join(",")
                                                    : null,
                                                pageSize: 5000,
                                            })
                                            .then((response) => setSearchData(response));
                                        setValue(0);
                                    }}
                                >
                                    <SearchIcon />
                                </Button>
                            </li>
                        </ul>
                    </div>
                </Drawer>
            ) : (
                    ""
                )}
        </div>
    );
};

export default Showroom;
