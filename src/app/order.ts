export interface Order {
  invoiceNo: number;
  date: Date;
  total: number;
  items: { name: string; rate: number; quantity: number; price: number }[];
}
