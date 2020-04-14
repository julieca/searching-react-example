import React from 'react';
import "../assets/css/Card.css"
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
const CardTemplate = ({ data }) => {
  return (


    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography className="bold">
              {data.name}
            </Typography>
          </Grid>
          <Grid item xs={3} >
            <Typography className="price bold">
              {data.price}
            </Typography>
          </Grid>
          <Grid item xs={12}>

            <Typography variant="body2" component="p">

              {data.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>


            <Typography color="primary">
              {data.furniture_style.join(", ")}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography className="time bold">
              Delivery {data.delivery_time} days
              </Typography>
          </Grid>

        </Grid>
      </CardContent>
    </Card>


  );
}
export default CardTemplate;
