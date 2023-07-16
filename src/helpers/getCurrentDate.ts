const getCurrentDate = (): { year: number; month: number; day: number } => {
  return {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  };
};

export default getCurrentDate;
