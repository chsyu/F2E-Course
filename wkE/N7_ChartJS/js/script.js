let ctx_bar = document.querySelector("#barChartCanvas").getContext("2d");
let ctx_v_bar = document
  .querySelector("#verticalBarChartCanvas")
  .getContext("2d");
let ctx_pie = document.querySelector("#pieChartCanvas").getContext("2d");
let ctx_radar = document.querySelector("#radarChartCanvas").getContext("2d");
let ctx_line = document.querySelector("#lineChartCanvas").getContext("2d");
let ctx_doughnut = document
  .querySelector("#doughnutChartCanvas")
  .getContext("2d");

let data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

new Chart(ctx_bar, {
  type: "bar",
  data: data,
});

new Chart(ctx_v_bar, {
  type: "bar",
  data: data,
  options: {
    indexAxis: "y",
  },
});

new Chart(ctx_pie, {
  type: "pie",
  data: data,
});

new Chart(ctx_radar, {
  type: "radar",
  data: data,
});

new Chart(ctx_line, {
  type: "line",
  data: data,
});

new Chart(ctx_doughnut, {
  type: "doughnut",
  data: data,
});
