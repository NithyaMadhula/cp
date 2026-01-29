import * as React from "react";
import { fetch_data } from "../../shared/utils/fetch_data";
import {
  Grid,
  GridColumn as Column,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { process, SortDescriptor } from "@progress/kendo-data-query";
import image_paths from "../../shared/utils/image_paths";
import {
  replacePipe,
  formatDate,
  ticketPrice,
} from "../../shared/utils/table_conversions";
import IndexingGameDetails from "../analytics/IndexingGameDetails/IndexingGameDetails";

const GameLaunches = (props: any) => {
  const pageSizes = [20, 40, 100];
  const [data, setData] = React.useState([]);
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
    fetch_data.fetchGameSearch().then((response) => setData(response));
  }, [setData]);

  const hasGameData = () => gameData;

  const pageChange = (event: any) => {
    setSkip(event.page.skip);
    setTake(event.page.take);
  };

  const formatCell = (callback: any) => (props: any) => (
    <td>{callback(props.dataItem[props.field])}</td>
  );
  return (
    <>
      <div className="d-flex">
        <Grid
          className="mx-auto"
          style={{ width: "1920px", height: "70vh" }}
          data={process(data, {
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
                ? desc.dir === "asc"
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
            title="Game Number"
            width="400px"
            cell={(props: any) => {
              const value = props.dataItem[props.field];
              return (
                <td>
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
                        src={image_paths.baseImageUrl(
                          props.dataItem["imgName"]
                        )}
                        alt="main game view"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/60/FFF?text=%20";
                        }}
                        title={props.dataItem["gameID"]}
                        style={{ maxWidth: "55px", maxHeight: "55px" }}
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
          <Column field="businessName" title="State" width="214px" />
          <Column
            field="ticketPrice"
            title="Ticket Price"
            width="144px"
            cell={formatCell(ticketPrice)}
          />
          <Column
            field="startDate"
            title="Launch Date"
            width="192px"
            cell={formatCell(formatDate)}
          />
          <Column field="index" title="Index" width="192px" />
          <Column
            field="theme"
            title="Theme"
            width="192px"
            cell={formatCell(replacePipe)}
          />
          <Column
            field="color"
            title="Color"
            width="192px"
            cell={formatCell(replacePipe)}
            filterable={true}
          />
          <Column
            field="playStyle"
            title="Play Style"
            width="192px"
            cell={formatCell(replacePipe)}
          />
          <Column
            field="feature"
            title="Feature"
            width="192px"
            cell={formatCell(replacePipe)}
          />
        </Grid>
      </div>
      {(hasGameData() && (
        <IndexingGameDetails
          gameData={gameData}
          prizeStructure={prizeStructure}
        ></IndexingGameDetails>
      )) ||
        ""}
    </>
  );
};

export default GameLaunches;
