export const users = [
  // MARKET ADMIN
  {
    id: 1,
    username: "market_admin",
    password: "123",
    role: "admin",
    company: "Fresh Market",
  },

  // CHEVARXONA ADMIN
  {
    id: 2,
    username: "sewing_admin",
    password: "123",
    role: "admin",
    company: "Chevarxona",
  },
  {
    id: 3,
    username: "admin",
    password: "123",
    role: "admin",
    company: "bags",
  },
];

export const employees = [
  {
    id: 101,
    username: "ali",
    password: "123",
    role: "employee",
    company: "Fresh Market",

    name: "Ali",
    position: "Sotuvchi",

    salaryType: "daily", // daily | weekly | monthly
    salaryAmount: 300000,

    bonus: 0,
    fine: 0,
  },

  {
    id: 102,
    username: "vali",
    password: "123",
    role: "employee",
    company: "Fresh Market",

    name: "Vali",
    position: "Kassir",

    salaryType: "weekly",
    salaryAmount: 800000,

    bonus: 0,
    fine: 0,
  },
];