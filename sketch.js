// adding a window listener fro loading the data
window.addEventListener("load", setup);

// The chart
async function setup() {
  const ctx = document.getElementById("myChart").getContext("2d");
  const dataTemps = await getData();
  const myChart = new Chart(ctx, {
    // type of chart
    type: "line",
    // data
    data: {
      labels: dataTemps.years,
      // datasets
      datasets: [
        {
          // average global temp
          // name
          label: "Global Temperature in °C",
          // type of data
          data: dataTemps.temps,
          fill: false,
          // colors and size
          borderColor: "rgba(255,255,0, 1)",
          backgroundColor: "rgba(255,255,0, 0.5)",
          borderWidth: 1,
        },
        {
          //average global temp in North
          // name
          label: "Northern Hemisphere Temperature in °C",
          // type of data
          data: dataTemps.northern,
          fill: false,
          // colors and size
          borderColor: "rgba(255, 0, 0, 1)",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          borderWidth: 1,
        },
        {
          //average global temp in South
          // name
          label: "Souther Hemisphere in °C",
          // type of data
          data: dataTemps.southern,
          fill: false,
          // colors and size
          borderColor: "rgba(0, 0, 255, 1)",
          backgroundColor: "rgba(0, 0, 255, 0.5)",
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });
}

// getting the data
async function getData() {
  // fetching the dta form a csv file
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  // turning it int a response
  const data = await response.text();
  // making arrays fro the chart
  const years = [];
  const temps = [];
  const northern = [];
  const southern = [];
  // parsing the data manually
  const rows = data.split("\n").slice(1);
  // making a froe ach loop for intiliizng the data
  rows.forEach((row) => {
    const cols = row.split(",");
    // adding data innto the array
    years.push(cols[0]);
    temps.push(14 + parseFloat(cols[1]));
    northern.push(14 + parseFloat(cols[2]));
    southern.push(14 + parseFloat(cols[3]));
  });
  // returning the values
  return { years, temps, northern, southern };
}
