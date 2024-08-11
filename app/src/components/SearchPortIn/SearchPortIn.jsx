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
  portInDetailsColumns,
  portInMockData,
  portInLifeCycleColumns,
} from "../../utils/constants";

const SearchPortIn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedStepData, setSelectedStepData] = useState(null);

  const getSearchResults = async (searchTerm) => {
    try {
      const response = await axios.post(`${SERVICE_URL}/getSearchResults`, {
        orderId: searchQuery,
      });
      setSearchResults(portInMockData);
      console.log(response);
    } catch (error) {
      setSearchResults(portInMockData);
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
    if (searchResults?.port_in_details) {
      return searchResults.port_in_details;
    }
    return {};
  }, [searchResults]);

  const portStepDetails = useMemo(() => {
    if (searchResults?.port_in_life_cycle) {
      return searchResults.port_in_life_cycle;
    }
    return [];
  }, [searchResults]);
  return (
    <div className="SearchPortIn">
      <p className="info-text">
        Search through incoming Port requests by Order ID. Quickly locate and
        manage Port in Orders, ensuring a seamless transfer process for
        customers moving to our network.
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
        <div className="SearchPortIn__results-container">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port In Details
          </Typography>
          <div className="SearchPortIn__results-details">
            {portInDetailsColumns.map((portInDetailItem) => {
              return (
                <div className="SearchPortIn__results-details--item">
                  <div className="label">{portInDetailItem.label}</div>
                  <div className="value">
                    {portDetails[portInDetailItem.key] || "NA"}
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
            Port In Life Cycle
          </Typography>
          <div className="SearchPortIn__results-step-info">
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "transparent" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {portInLifeCycleColumns.map((piLifeCycleColumn) => {
                      return <TableCell>{piLifeCycleColumn.label}</TableCell>;
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
                        {portInLifeCycleColumns.map((piLifeCycleColumn) => {
                          return (
                            <TableCell>
                              {piLifeCycleColumn.key == "pi_stage" ? (
                                <span
                                  className={piLifeCycleColumn.key}
                                  onClick={() => handlePoStageClick(step)}
                                >
                                  {step[piLifeCycleColumn.key] || "NA"}
                                </span>
                              ) : (
                                <span>
                                  {step[piLifeCycleColumn.key] || "NA"}
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
          onClose={()=>handlePoStageClick(null)}
          aria-labelledby="customized-dialog-title"
          open={selectedStepData}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            PI Stage Details
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={()=>handlePoStageClick(null)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <b>Step ID:</b> <span>{selectedStepData.step_id}</span>
            </Typography>
            <Typography gutterBottom>
            <b>PI Stage:</b> <span>{selectedStepData.pi_stage}</span>
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

export default SearchPortIn;
