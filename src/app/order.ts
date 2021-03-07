export interface Order {
  invoiceNo: number;
  customer: string;
  date: Date;
  items: { name: string; rate: number; quantity: number; price: number }[];
  total: number;
}
