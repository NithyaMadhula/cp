// import React, { useState, useEffect } from "react";
// import { Card, LinearProgress } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import styles from "../Dashboard.module.css";
// import NorthAmericanLotteryTable from "./NorthAmericanLotteryTable";

// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

// import { fetch_data } from "../../../utils/fetch_data/fetch_data";
// import IconButton from "@material-ui/core/IconButton";
// import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
// import ViewColumnIcon from "@material-ui/icons/ViewColumn";
// import { currency_conversion } from "../../../utils/currency/currency_conversion";

// const LOI_KEY = "nalo-lotteries-of-interest";

// const { fetchLotteries, fetchNaloAverageSales } = fetch_data;

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

// const getStyle = (value) => {
//   value = value.replace("%", "");

//   return {
//     fontWeight: "700",
//     color: Number(value) > 0 ? "green" : !Number(value) ? "black" : "red",
//   };
// };

// const LotteriesOfInterest = (props) => {
//   const [lotteries, setLotteries] = useState(localStorage.getItem(LOI_KEY));
//   const [averageData, setAverageData] = useState([]);

//   const hasData = (data) => data && data.length;

//   useEffect(() => {
    
//     fetchLotteries()
//       .then((response) => {
//         setLotteries(response);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <Card style={{display: 'flex', height: '65vh'}}>
//         <h2>Selected Lotteries' Average Sales</h2>
//         <div style={{flex: "1", height:"100%"}}>
//         <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-chip-label">Lotteries used in calculation</InputLabel>
//         <Select
//           labelId="demo-mutiple-chip-label"
//           id="demo-mutiple-chip"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<Input id="select-multiple-chip" />}
//           renderValue={(selected) => (
//             <div className={classes.chips}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} className={classes.chip} />
//               ))}
//             </div>
//           )}
//           MenuProps={MenuProps}
//         >
//           {lotteries.map((lottery) => (
//             <MenuItem key={lottery.code} value={lottery.code}>
//               {lottery.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//         </div>
//         <div style={{flex: "3", height:"100%"}}></div>
//     </Card>

//     <main>
//       {/* <Card
//         className={styles["dashboard-card"]}
//         style={{ display: "flex", alignItems: "center" }}
//       >
//         <form
//           noValidate
//           className={classes.container}
//           style={{ width: "100%" }}
//         >
//           <FormControl style={{ minWidth: "100px", margin: "0 10px" }}>
//             <InputLabel>Calendar Year</InputLabel>
//             <Select
//               value={start}
//               onChange={(e) => {
//                 setStart(e.target.value);
//                 fetchSearchData(e.target.value);
//               }}
//             >
//               <MenuItem value={"1/1/2020"}>2020</MenuItem>
//               <MenuItem value={"1/1/2019"}>2019</MenuItem>
//               <MenuItem value={"1/1/2018"}>2018</MenuItem>
//               <MenuItem value={"1/1/2017"}>2017</MenuItem>
//               <MenuItem value={"1/1/2016"}>2016</MenuItem>
//             </Select>
//           </FormControl>
//         </form>
//         <IconButton
//           style={
//             showMap
//               ? {}
//               : {
//                   borderRadius: 0,
//                   borderBottom: "2px solid #ff682e",
//                 }
//           }
//           onClick={(e) => setShowMap(false)}
//         >
//           <ViewColumnIcon style={{ color: showMap ? "#0D51A1" : "#ff682e" }} />
//         </IconButton>
//         {/* <IconButton
//           style={
//             !showMap
//               ? {}
//               : {
//                   borderRadius: 0,
//                   borderBottom: "2px solid #ff682e",
//                 }
//           }
//           onClick={(e) => {
//             setShowMap(true);
//             const handle = window.open(
//               "https://observablehq.com/@d3/non-contiguous-cartogram",
//               "_newtab"
//             );
//           }}
//         >
//           <MapOutlinedIcon
//             style={{ color: !showMap ? "#0D51A1" : "#ff682e" }}
//           />
//         </IconButton> 
//         <span style={{ marginRight: "10px" }}>&nbsp;</span>
//       </Card>
//       <br /> */}

//       {!hasData(naloSalesData) ||
//       !(naloYtdData && naloYtdData.currWeek) ||
//       !hasData(ticketData) ? (
//         <LinearProgress />
//       ) : (
//         <></>
//       )}

//       {naloYtdData && naloYtdData.currWeek ? (
//         <ExpansionPanel>
//           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//             <Card style={{ minWidth: "700px" }}>
//               <h2>Virginia Lottery Instants YTD Sales</h2>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell align="center">Current Week Ending</TableCell>
//                       <TableCell align="center">Prior YTD Sales</TableCell>
//                       <TableCell align="center">YTD Sales</TableCell>
//                       <TableCell align="center">Percent Change</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell align="center">
//                         {new Date(naloYtdData.currWeek).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell align="center">
//                         {currency_conversion.currencyFormat(
//                           naloYtdData.priorYearYTDSales,
//                           0,
//                           true
//                         )}
//                       </TableCell>
//                       <TableCell align="center">
//                         {currency_conversion.currencyFormat(
//                           naloYtdData.ytdSales,
//                           0,
//                           true
//                         )}
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={getStyle(naloYtdData.percentChangeYear)}
//                       >
//                         {naloYtdData.percentChangeYear}
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Card>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails>
//             <Card style={{ width: "100%" }}>
//               <h2>Ticket Breakdown</h2>
//               <TableContainer
//                 style={{
//                   width: "100%",
//                 }}
//               >
//                 {hasData(ticketData) ? (
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell align="center">Ticket Price</TableCell>
//                         <TableCell align="right">Week Sales</TableCell>
//                         <TableCell align="right">YTD Sales</TableCell>
//                         <TableCell align="right">Percent of Total</TableCell>
//                         <TableCell align="right">
//                           Prior Year Week Sales
//                         </TableCell>
//                         <TableCell align="right">
//                           Prior Year YTD Sales
//                         </TableCell>
//                         <TableCell align="right">Week Difference</TableCell>
//                         <TableCell align="right">% Change Week</TableCell>
//                         <TableCell align="right">YTD Difference</TableCell>
//                         <TableCell align="right">% Change Year</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {ticketData.map((x) => (
//                         <TableRow>
//                           <TableCell align="center">
//                             {currency_conversion.currencyFormat(x.ticketPrice)}
//                           </TableCell>
//                           <TableCell align="right">
//                             {currency_conversion.currencyFormat(
//                               x.currWeekSales,
//                               0,
//                               true
//                             )}
//                           </TableCell>
//                           <TableCell align="right">
//                             {currency_conversion.currencyFormat(
//                               x.ytdSales,
//                               0,
//                               true
//                             )}
//                           </TableCell>
//                           <TableCell align="right">
//                             {x.percentSalesYTD}
//                           </TableCell>
//                           <TableCell align="right">
//                             {currency_conversion.currencyFormat(
//                               x.priorYearWeekSales,
//                               0,
//                               true
//                             )}
//                           </TableCell>
//                           <TableCell align="right">
//                             {currency_conversion.currencyFormat(
//                               x.priorYearYTDSales,
//                               0,
//                               true
//                             )}
//                           </TableCell>
//                           <TableCell align="right">
//                             {currency_conversion.currencyFormat(
//                               x.weekDifference,
//                               0,
//                               true
//                             )}
//                           </TableCell>
//                           <TableCell
//                             align="right"
//                             style={getStyle(x.percentChangeWeek)}
//                           >
//                             {x.percentChangeWeek}
//                           </TableCell>
//                           <TableCell align="right">
//                             {currency_conversion.currencyFormat(
//                               x.ytdDifference,
//                               0,
//                               true
//                             )}
//                           </TableCell>
//                           <TableCell
//                             align="right"
//                             style={getStyle(x.percentChangeYear)}
//                           >
//                             {x.percentChangeYear}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 ) : (
//                   <></>
//                 )}
//               </TableContainer>
//             </Card>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//       ) : (
//         <></>
//       )}
//       <br />
//       {hasData(naloSalesData) ? (
//         <NorthAmericanLotteryTable
//           data={naloSalesData}
//         ></NorthAmericanLotteryTable>
//       ) : (
//         <></>
//       )}
//     </main>
//   );
// };

// export default LotteriesOfInterest;
