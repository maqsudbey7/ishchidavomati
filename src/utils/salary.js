export function calculateSalary(employee) {
  let totalHours = 0;

  employee.attendance?.forEach((a) => {
    if (a.workHours) {
      totalHours += Number(a.workHours);
    }
  });

  const base =
    totalHours * employee.salaryPerHour;

  const bonus = employee.bonus || 0;
  const fine = employee.fine || 0;

  return base + bonus - fine;
}