const degreeMap = {
  'B.Tech': 'Bachelor of Technology',
};

export function standardizeParsedData(data: any) {
  data.education = data.education.map((e: any) => {
    const degreeKey = e.degree as keyof typeof degreeMap; // tell TS this is a key of degreeMap (maybe)
    return {
      ...e,
      degree: degreeMap[degreeKey] || e.degree, // fallback to original degree if not found
    };
  });
  return data;
}
