export default function BasicCard(stock: any) {
  return (
    <div>
      <h4>{stock.StockName}</h4>
      <h4>{stock.price}</h4>
      <h4>{stock.changeAmount}</h4>
      <h4>{stock.changePercent}</h4>
    </div>
  );
}
