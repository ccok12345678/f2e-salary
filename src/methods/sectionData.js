export default function sectionData(data, newSection) {
  const dataTotal = data.length;
  const perSection = 8;
  const sectionTotal = Math.ceil(dataTotal / perSection);

  let currentSection = newSection;
  if (currentSection > sectionTotal) {
    currentSection = sectionTotal;
  } else if (currentSection < 1) {
    currentSection = 1;
  }

  // 該section第一筆資料
  const minData = (currentSection * perSection) - perSection + 1;
  // 該section最後一筆資料
  const maxData = (currentSection * perSection);

  const section = {
    sectionTotal,
    currentSection,
    hasPre: currentSection > 1,
    hasNext: currentSection < sectionTotal,
    sectionNum: 0,
    sectionData: [],
  };

  data.forEach((item, index) => {
    const num = index + 1;
    if (num >= minData && num <= maxData) {
      section.sectionData.push(item);
    }

    if (num % perSection === 0) {
      section.sectionNum += 1;
    }
  });

  return section;
}
