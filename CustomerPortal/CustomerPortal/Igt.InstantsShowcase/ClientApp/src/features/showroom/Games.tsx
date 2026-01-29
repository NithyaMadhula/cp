import * as React from "react";
import { fetch_data } from "../../shared/utils/fetch_data";
import {
  Grid,
  GridColumn as Column,
  GridColumnMenuCheckboxFilter,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { process, SortDescriptor } from "@progress/kendo-data-query";
import image_paths from "../../shared/utils/image_paths";
import {
  replacePipe,
  formatDate,
  ticketPrice,
  defaultify,
} from "../../shared/utils/table_conversions";
import IndexingGameDetails from "../analytics/IndexingGameDetails/IndexingGameDetails";

const Games = (props: any) => {
  const pageSizes = [20, 40, 100];
  const [data, setData] = React.useState<any>([]);
  const [skip, setSkip] = React.useState(0);
  const [sort, setSort] = React.useState<SortDescriptor[]>([
    { field: "startDate", dir: "desc" },
  ]);
  const [take, setTake] = React.useState(pageSizes[0]);
  const [gameData, setGameData] = React.useState<any>(null);
  const [prizeStructure, setPrizeStructure] = React.useState(null);

  const fetchGameData = (id: any) => {
    setGameData(null);

    setTimeout(() => setGameData({}), 150);

    setTimeout(() => {
      fetch_data
        .singlePublishedGame(id)
        .then((data: any) => setGameData(data))
        .catch((error: any) => console.error(error));

      fetch_data
        .fetchGamePrizeStructure(id)
        .then((data: any) => setPrizeStructure(data || []))
        .catch((error: any) => console.error(error));
    }, 750);
  };

  React.useEffect(() => {
    (props.search ? props.search : fetch_data.fetchGameSearch)(
      props.searchModel
    ).then((response: any) => setData(response));
  }, [setData, props.searchData, props.search, props.searchModel]);

  const hasGameData = () => gameData;

  const pageChange = (event: any) => {
    setSkip(event.page.skip);
    setTake(event.page.take);
  };

  const customerCode = sessionStorage.getItem("customerCode");

  const formatCell = (callback: any) => (props: any) => (
    <td>{callback(props.dataItem[props.field])}</td>
    );

    const gameTable = (tableData: any) => (
      <Grid
        style={{height: "650px", fontSize: "20px" }}
        data={process(tableData, {
          take: take,
          skip: skip,
          sort: sort,
        })}
        pageable={{
          buttonCount: 5,
          info: true,
          pageSizes: pageSizes,
        }}
        skip={skip}
        take={take}
        pageSize={pageSizes[0]}
        sortable
        onSortChange={(e: GridSortChangeEvent): void => {
          const desc: SortDescriptor = e.sort[0];
          desc.dir =
            sort[0].field === desc.field
              ? sort[0].dir === "asc"
                ? "desc"
                : "asc"
              : "asc";
          setSort([desc]);
        }}
        onPageChange={pageChange}
        onRowClick={(event) => {
          const id = event.dataItem.gameID;
          fetchGameData(id);
        }}
      >
        <Column
          field="gameName"
                title="Game Name"
                width = "300"
          cell={(props: any) => {
            const value = props.dataItem[props.field];
            return (
              <td
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                  fetchGameData(props.dataItem["gameID"]);
                }}
              >
                <div className="d-flex">
                  <div
                    className="d-flex"
                    style={{
                      width: "60px",
                      height: "60px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={image_paths.baseImageUrl(props.dataItem["imgName"])}
                      alt="main game view"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/60/FFF?text=%20";
                      }}
                      title={props.dataItem["gameID"]}
                                style={{ maxWidth: "55px", maxHeight: "55px"}}
                      className="m-auto"
                    />
                  </div>
                  <span className="my-auto" style={{ paddingLeft: "30px" }}>
                    {value}
                  </span>
                </div>
              </td>
            );
          }}
        />
        <Column field="businessName" title="Jurisdiction" width="214px" />
        <Column
          field="ticketPrice"
                title="Price"
                width="150"
          cell={formatCell(ticketPrice)}
        />
        <Column
          field="startDate"
            title="Launch Date"
            width="150"
          cell={formatCell(formatDate)}
            />
            {(customerCode === "WI" || customerCode === "IN") && (
                <Column
                    field="index"
                    title="Index"
                    width="150"
                    cell={formatCell(defaultify)}
                />
            )}
        <Column
          field={props.isFavorites ? "primaryThemeName" : "theme"}
            title="Theme"
            width="150"
          cell={formatCell(replacePipe)}
        />
        <Column
          field={props.isFavorites ? "primaryColorName" : "color"}
                title="Color"
                width="150"
          cell={formatCell(replacePipe)}
          filterable={true}
        />
        <Column
          field={props.isFavorites ? "primaryPlayStyleName" : "playStyle"}
                title="Play Style"
                width="150"
          cell={formatCell(replacePipe)}
        />
        <Column
          field={props.isFavorites ? "primaryFeatureName" : "feature"}
                title="Feature"
                width="150"
          cell={formatCell(replacePipe)}
        />
      </Grid>
  );

  return (
    <>
      {props.searchData ? gameTable(props.searchData) : gameTable(data)}
      {(hasGameData() && (
        <IndexingGameDetails
          gameData={gameData}
          prizeStructure={prizeStructure}
          hideSales={true}
          canFavorite={true}
        ></IndexingGameDetails>
      )) ||
        ""}
    </>
  );
};

export default Games;
