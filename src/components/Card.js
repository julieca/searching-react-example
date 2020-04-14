import React from 'react';
import "../assets/css/Card.css"
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
const CardTemplate = ({ data }) => {
  return (
    <Grid item xs={6}>

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
              {/* <Typography className="time bold" color="primary"> */}
              <Typography className="time bold">
                Delivery Days {data.delivery_time}.
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>


  );
}
export default CardTemplate;
