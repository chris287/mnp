import React, { useState, useEffect, useMemo } from "react";
import "./style.scss";
import PolarAreaChart from "../PolarAreaChart/PolarAreaChart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { SERVICE_URL } from "../../utils/constants";
import dayjs from "dayjs";
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [portInChartData, setPortInChartData] = useState(null);
  const [portOutChartData, setPortOutChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    labels: [
      "In progress",
      "Cancelled",
      "Open",
      "Completed",
      "Pending Approval",
      "Rejected",
      "On Hold",
      "Failed",
      "Closed",
    ],
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

  const getMockValues = () => {
    const randomNumbers = []
    while(randomNumbers.length < 9) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  }

  const getChartDataByDate = async() => {
    try {
      const response = await axios.post(`${SERVICE_URL}/get-dashboard-for-day`, {
        selectedDate
      })

    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    setChartOptions({...chartOptions, series: getMockValues()})

    getChartDataByDate()
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
          <DatePicker label="Select Date" defaultValue={selectedDate} value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)}/>
        </DemoContainer>
      </LocalizationProvider>
      <div className="Dashboard__chart-container">
        <PolarAreaChart chartOptions={{...chartOptions, series: getMockValues()}} title="Port In" />
        <PolarAreaChart chartOptions={{...chartOptions, series: getMockValues()}} title="Port Out" />
      </div>
    </div>
  );
};

export default Dashboard;
