import * as React from "react";
import { fetch_data } from "../../shared/utils/fetch_data";
import {
  Grid,
  GridColumn as Column,
  GridColumnMenuCheckboxFilter,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
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
  const [totalCount, setTotalCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [skip, setSkip] = React.useState(0);
  const [sort, setSort] = React.useState<SortDescriptor[]>([
    { field: "startDate", dir: "desc" },
  ]);
  const [take, setTake] = React.useState(pageSizes[0]);
  const [gameData, setGameData] = React.useState<any>(null);
  const [prizeStructure, setPrizeStructure] = React.useState(null);
  const normalizeTableData = (value: any) => (Array.isArray(value) ? value : []);

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
    setSkip(0);
  }, [props.searchModel, props.search]);

  React.useEffect(() => {
    const searchModel = {
      ...(props.searchModel || {}),
      pageIndex: Math.floor(skip / take) + 1,
      pageSize: take,
      sortColumn: sort[0]?.field === "businessName" ? "Jurisdiction" :
        sort[0]?.field === "ticketPrice" ? "Ticket Price" :
        sort[0]?.field === "startDate" ? "Launch Date" :
        sort[0]?.field === "theme" || sort[0]?.field === "primaryThemeName" ? "Theme" :
        sort[0]?.field === "color" || sort[0]?.field === "primaryColorName" ? "Color" :
        sort[0]?.field === "playStyle" || sort[0]?.field === "primaryPlayStyleName" ? "Play Style" :
        sort[0]?.field === "feature" || sort[0]?.field === "primaryFeatureName" ? "Feature" :
        (props.searchModel || {}).sortColumn,
      sortDirection: sort[0]?.dir?.toUpperCase() || (props.searchModel || {}).sortDirection,
    };

    const fetcher = props.search ? props.search : fetch_data.fetchGameSearch;
    setLoading(true);
    fetcher(searchModel).then((response: any) => {
      const results = Array.isArray(response) ? response : response?.results;
      const total = Array.isArray(response)
        ? Number((response as any).totalCount || response.length || 0)
        : Number(response?.totalCount || 0);
      setData(normalizeTableData(results));
      setTotalCount(total);
      setLoading(false);
    }).catch((error: any) => {
      console.error(error);
      setData([]);
      setTotalCount(0);
      setLoading(false);
    });
  }, [skip, take, sort, props.searchData, props.search, props.searchModel]);

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
        data={normalizeTableData(tableData)}
        pageable={{
          buttonCount: 5,
          info: true,
          pageSizes: pageSizes,
        }}
        skip={skip}
        take={take}
        total={totalCount}
        pageSize={pageSizes[0]}
        sortable
        onSortChange={(e: GridSortChangeEvent): void => {
          const desc: SortDescriptor = e.sort[0];
          const nextSort: SortDescriptor = {
            field: desc.field,
            dir:
              sort[0].field === desc.field
                ? sort[0].dir === "asc"
                  ? "desc"
                  : "asc"
                : "asc",
          };
          setSort([nextSort]);
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
                          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='%23fff'/></svg>";
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
      {loading ? (
        <div style={{ height: "650px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Loading games...
        </div>
      ) : (
        gameTable(data)
      )}
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

export default React.memo(Games);
