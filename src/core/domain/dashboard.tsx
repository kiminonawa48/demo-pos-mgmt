export interface ILocationMarker {
  lat: number;
  long: number;
  merchant_name: string;
  machine_name: string;
}

export interface ISummaryInfo {
  type: string
  label: string;
  value: number;
}
