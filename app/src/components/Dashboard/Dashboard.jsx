import React, { useState, useEffect, useMemo } from "react";
import "./style.scss";
import PolarAreaChart from "../PolarAreaChart/PolarAreaChart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  SERVICE_URL,
  mockDashboardResponse,
  portInPacColumns,
  portOutPacColumns,
  portInStacColumns,
  portOutStacColumns
} from "../../utils/constants";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dashboardData, setDashboardData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    series: [],
    labels: [],
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: "Chart",
      align: "left",
      margin: 20,
      offsetX: 50,
      style: {
        fontSize: "20px",
        color: "#c17c05",
      },
    },
  });

  const createChartData = (chartData, key) => {
    const labels = [];
    const series = [];
    let statusKey = "status";
    let countKey = "statuscount";
    if (key == "portout") {
      statusKey = "po" + statusKey;
      countKey = "po" + countKey;
    }
    chartData.forEach((dataItem) => {
      labels.push(dataItem[statusKey]);
      series.push(parseInt(dataItem[countKey]));
    });

    return { labels, series };
  };

  const getChartDataByDate = async () => {
    try {
      const response = await axios.post(
        `${SERVICE_URL}/get-dashboard-for-day`,
        {
          selectedDate,
        }
      );
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
      setDashboardData(mockDashboardResponse);
    }
  };

  const portInChartData = useMemo(() => {
    if (!dashboardData) return null;
    const { portInPie } = dashboardData;
    return createChartData(portInPie, "portin");
  }, [dashboardData]);

  const portOutChartData = useMemo(() => {
    if (!dashboardData) return null;
    const { portOutPie } = dashboardData;
    return createChartData(portOutPie, "portout");
  }, [dashboardData]);

  const portOutPACData = useMemo(() => {
    if (!dashboardData) return null;
    return dashboardData.portOutPACData;
  }, [dashboardData]);

  const portInSTACData = useMemo(() => {
    if (!dashboardData) return null;
    return dashboardData.portInSTACData;
  }, [dashboardData]);

  const portOutSTACData = useMemo(() => {
    if (!dashboardData) return null;
    return dashboardData.portOutSTACData;
  }, [dashboardData]);

  const portInPACData = useMemo(() => {
    if (!dashboardData) return null;
    return dashboardData.portInPACData;
  }, [dashboardData]);

  useEffect(() => {
    getChartDataByDate();
  }, [selectedDate]);
  return (
    <div className="Dashboard">
      <p className="info-text">
        Get clear overview of the daily porting activities, helping you monitor
        and analyze the trends efficiently. Select a date to view detailed pie
        chart showing the status of Port In and Port Out orders for that day.
      </p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select Date"
            defaultValue={selectedDate}
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <div className="Dashboard__chart-container">
        {portInChartData && (
          <PolarAreaChart
            chartOptions={{
              ...chartOptions,
              series: portInChartData?.series,
              labels: portInChartData?.labels,
            }}
            title="Port In"
          />
        )}
        {portOutChartData && (
          <PolarAreaChart
            chartOptions={{
              ...chartOptions,
              series: portOutChartData?.series,
              labels: portOutChartData?.labels,
            }}
            title="Port Out"
          />
        )}
      </div>
      <div className="Dashboard__pastac-container">
        {/* PORT IN PAC TABLE */}
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port In PAC
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "transparent" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {portInPacColumns?.map((column) => {
                    return <TableCell>{column.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {portInPACData?.map((step, stepMapIndex) => {
                  return (
                    <TableRow
                      key={stepMapIndex}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {portInPacColumns?.map((column) => {
                        return (
                          <TableCell>
                            {column.key == "pi_stage" ? (
                              <span className={column.key}>
                                {step[column.key] || "NA"}
                              </span>
                            ) : (
                              <span>{step[column.key] || "NA"}</span>
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

        {/* PORT OUT PAC TABLE */}
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port Out PAC
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "transparent" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {portOutPacColumns?.map((column) => {
                    return <TableCell>{column.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {portOutPACData?.map((step, stepMapIndex) => {
                  return (
                    <TableRow
                      key={stepMapIndex}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {portOutPacColumns?.map((column) => {
                        return (
                          <TableCell>
                            {column.key == "pi_stage" ? (
                              <span className={column.key}>
                                {step[column.key] || "NA"}
                              </span>
                            ) : (
                              <span>{step[column.key] || "NA"}</span>
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

        {/* PORT IN STAC TABLE */}
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port In STAC
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "transparent" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {portInStacColumns?.map((column) => {
                    return <TableCell>{column.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {portInSTACData?.map((step, stepMapIndex) => {
                  return (
                    <TableRow
                      key={stepMapIndex}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {portInStacColumns?.map((column) => {
                        return (
                          <TableCell>
                            {column.key == "pi_stage" ? (
                              <span className={column.key}>
                                {step[column.key] || "NA"}
                              </span>
                            ) : (
                              <span>{step[column.key] || "NA"}</span>
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

        {/* PORT OUT STAC TABLE */}
        <div>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#ffffff", marginBlock: "12px", marginLeft: "8px" }}
          >
            Port Out STAC
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "transparent" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {portOutStacColumns?.map((column) => {
                    return <TableCell>{column.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {portOutSTACData?.map((step, stepMapIndex) => {
                  return (
                    <TableRow
                      key={stepMapIndex}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {portOutStacColumns?.map((column) => {
                        return (
                          <TableCell>
                            {column.key == "pi_stage" ? (
                              <span className={column.key}>
                                {step[column.key] || "NA"}
                              </span>
                            ) : (
                              <span>{step[column.key] || "NA"}</span>
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
    </div>
  );
};

export default Dashboard;
