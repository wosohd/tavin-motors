export function formatVehiclePrice(
  value: number,
) {
  return `KES ${value.toLocaleString("en-KE")}`;
}


export function formatMileage(
  value: number,
) {
  return value.toLocaleString("en-KE");
}