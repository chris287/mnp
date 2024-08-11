import Chart from "react-apexcharts";
import "./style.scss";

const PolarAreaChart = ({ chartOptions, title }) => {
  const getTotalCount = () => {
    const {series} = chartOptions
    return series.reduce((accumilator, currentValue) => {
      return accumilator + currentValue
    })
  }
  return (
    <Chart
      options={{...chartOptions, title: {...chartOptions.title, text: `${title} (${getTotalCount()})`}}}
      type="polarArea"
      series={chartOptions.series}
      height={350}
    />
  );
};

export default PolarAreaChart;
