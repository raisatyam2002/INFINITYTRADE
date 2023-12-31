// // import React from "react";
// // import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// // import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// // import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// // import { StopCircle } from "@mui/icons-material";

export default function BasicCard(stock: any) {
  return (
    // <Card sx={{ minWidth: 275 }} className="h-3 m-2">
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {stock.StockName}
    //     </Typography>
    //     <Typography variant="body2">{stock.price}</Typography>
    //     <Typography color="text.secondary">{stock.changeAmount}</Typography>
    //     <Typography color="text.secondary">{stock.changePercent}</Typography>
    //   </CardContent>
    // </Card>
    <div>
      <h4>{stock.StockName}</h4>
      <h4>{stock.price}</h4>
      <h4>{stock.changeAmount}</h4>
      <h4>{stock.changePercent}</h4>
    </div>
  );
}
