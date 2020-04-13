import React from 'react';
import "../assets/css/Card.css"
import { Card, CardContent, Typography } from '@material-ui/core';
const CardTemplate = ({ data }) =>
  <Card>
    <CardContent>
      <Typography component="h2">
        {data.name}
      </Typography>
      <Typography className="price bold">
        {data.price}
      </Typography>
      <Typography variant="body2" component="p">
        {data.description}
      </Typography>
      <Typography color="primary">
        {data.furniture_style.join(", ")}
      </Typography>
      <Typography className="time bold" color="primary">
        {data.delivery_time}
      </Typography>
    </CardContent>
  </Card>

export default CardTemplate;
