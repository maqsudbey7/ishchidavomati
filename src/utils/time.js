export function calculateHours(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;

  const [inH, inM] = checkIn.split(":");
  const [outH, outM] = checkOut.split(":");

  const start = parseInt(inH) * 60 + parseInt(inM);
  const end = parseInt(outH) * 60 + parseInt(outM);

  return ((end - start) / 60).toFixed(2);
}