export default function sortData(rawData, isMoreToLess) {
  const industries = [];
  const industryCount = [];

  rawData.forEach((people) => {
    const { industry } = people.company;
    const salary = Number(people.company.salary
      .replace(/[\u4e00-\u9fa5]/g, '')
      .split('~')
      .reduce((x, y) => (Number(x) + Number(y)) / 2));
    const score = Number(people.company.salary_score);

    if (!industries.includes(industry)) {
      industries.push(industry);
      industryCount.push({
        category: industry,
        count: 1,
        salary,
        score,
      });
    } else {
      industryCount[industries.indexOf(industry)].count += 1;
      industryCount[industries.indexOf(industry)].salary += salary;
      industryCount[industries.indexOf(industry)].score += score;
    }
  });

  // get average
  industryCount.forEach((industry, index) => {
    const salaryAverage = Math.round(
      (industry.salary / industry.count) * 10,
    );
    const scoreAverage = Math.round(
      (industry.score / industry.count),
    );

    industryCount[index].salary = salaryAverage;
    industryCount[index].score = scoreAverage;
  });

  // sort
  const len = industryCount.length;
  if (isMoreToLess) {
    for (let i = 0; i < len - 1; i += 1) {
      for (let j = 0; j < len - 1 - i; j += 1) {
        if (industryCount[j].count < industryCount[j + 1].count) {
          const temp = industryCount[j];
          industryCount[j] = industryCount[j + 1];
          industryCount[j + 1] = temp;
        }
      }
    }
  } else {
    for (let i = 0; i < len - 1; i += 1) {
      for (let j = 0; j < len - 1 - i; j += 1) {
        if (industryCount[j].count > industryCount[j + 1].count) {
          const temp = industryCount[j];
          industryCount[j] = industryCount[j + 1];
          industryCount[j + 1] = temp;
        }
      }
    }
  }

  return industryCount;
}
