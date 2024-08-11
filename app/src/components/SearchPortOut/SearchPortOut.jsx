import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";
import axios from "axios";
import {
  SERVICE_URL,
  portOutDetailsColumns,
  portOutMockData,
  portOutLifeCycleColumns,
} from "../../utils/constants";

const SearchPortOut = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedStepData, setSelectedStepData] = useState(null);

  const getSearchResults = async (searchTerm) => {
    try {
      const response = await axios.post(`${SERVICE_URL}/getSearchResults`, {
        orderId: searchQuery,
      });
      setSearchResults(portOutMockData);
      console.log(response);
    } catch (error) {
      setSearchResults(portOutMockData);
      console.error(error);
    }
  };

  const handleSearchQueryChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handlePoStageClick = (stepData) => {
    setSelectedStepData(stepData);
  };

  const handleSearch = () => {
    if (!searchQuery.length) return;
    getSearchResults();
  };

  const portDetails = useMemo(() => {
    if (searchResults?.port_out_details) {
      return searchResults.port_out_details;
    }
    return {};
  }, [searchResults]);

  const portStepDetails = useMemo(() => {
    if (searchResults?.port_out_life_cycle) {
      return searchResults.port_out_life_cycle;
    }
    return [];
  }, [searchResults]);
  return (
    <div className="SearchPortOut">
      <p className="info-text">
        Find outgoing port requests by searching with Order ID. Helps you
        efficiently manage Port Out orders, ensuring a smooth transition for
        customers leaving our network.
      </p>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
          display: "flex",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Enter Reference number"
          variant="outlined"
          onChange={(e) => {
            handleSearchQueryChange(e);
          }}
        />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          sx={{ margin: "0px", width: "15ch !important" }}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </Box>
      {searchResults && (
        <div className="SearchPortOut__results-container">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port Out Details
          </Typography>
          <div className="SearchPortOut__results-details">
            {portOutDetailsColumns.map((portOutDetailItem) => {
              return (
                <div className="SearchPortOut__results-details--item">
                  <div className="label">{portOutDetailItem.label}</div>
                  <div className="value">
                    {portDetails[portOutDetailItem.key] || "NA"}
                  </div>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port Out Life Cycle
          </Typography>
          <div className="SearchPortOut__results-step-info">
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "transparent" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {portOutLifeCycleColumns.map((poLifeCycleColumn) => {
                      return <TableCell>{poLifeCycleColumn.label}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portStepDetails.map((step, stepMapIndex) => {
                    return (
                      <TableRow
                        key={stepMapIndex}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {portOutLifeCycleColumns.map((poLifeCycleColumn) => {
                          return (
                            <TableCell>
                              {poLifeCycleColumn.key == "po_stage" ? (
                                <span
                                  className={poLifeCycleColumn.key}
                                  onClick={() => handlePoStageClick(step)}
                                >
                                  {step[poLifeCycleColumn.key] || "NA"}
                                </span>
                              ) : (
                                <span>
                                  {step[poLifeCycleColumn.key] || "NA"}
                                </span>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
      {selectedStepData && (
        <Dialog
          onClose={() => handlePoStageClick(null)}
          aria-labelledby="customized-dialog-title"
          open={selectedStepData}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            PO Stage Details
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => handlePoStageClick(null)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <b>Step ID:</b> <span>{selectedStepData.step_id}</span>
            </Typography>
            <Typography gutterBottom>
              <b>PO Stage:</b> <span>{selectedStepData.po_stage}</span>
            </Typography>
            <Typography gutterBottom>
              <b>Status:</b> <span>{selectedStepData.status}</span>
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SearchPortOut;
