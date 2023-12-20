import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { StopCircle } from "@mui/icons-material";

export default function BasicCard(stock) {
  return (
    <Card sx={{ minWidth: 275 }} class="h-3 m-2">
      <CardContent>
        <Typography variant="h5" component="div">
          {stock.StockName}
        </Typography>
        <Typography variant="body2">{stock.price}</Typography>
        <Typography color="text.secondary">{stock.changeAmount}</Typography>
        <Typography color="text.secondary">{stock.changePercent}</Typography>
      </CardContent>
    </Card>
  );
}
