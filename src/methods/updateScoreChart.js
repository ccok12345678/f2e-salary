/* eslint-disable no-param-reassign */
export default function updateScoreChart(chart, sectionData) {
  const labels = sectionData.map((data) => data.category);
  const salaryDatas = sectionData.map((data) => data.salary);
  const scoreDatas = sectionData.map((data) => data.score);

  chart.data.labels = labels;
  chart.data.datasets[0].data = salaryDatas;
  chart.data.datasets[1].data = scoreDatas;

  chart.update();
}
