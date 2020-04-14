import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Grid, InputLabel,
  ListItemText,
  Checkbox, TextField, Select, MenuItem,
  FormControl
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import Card from "../components/Card";
import { getData } from '../actions';

const keywordLabel = "Search Furniture";
const furnitureSLabel = "Furniture Style";
const deliveryTLabel = "Delivery Time";

const deliveryTChoice = ["1 week", "2 weeks", "1 month", "more than 1 month"];

const Search = props => {

  const [keyword, setKeyword] = React.useState('');
  const [datares, setDatares] = React.useState([]);
  const [furnitureStyle, setfurnitureStyle] = React.useState([]);
  const [deliveryTime, setdeliveryTime] = React.useState([]);
  const [deliveryDay, setdeliveryDay] = React.useState([]);

  useEffect(() => {
    props.getData();
  }, []);

  useEffect(() => {
    filter();
  });

  const filter = () => {
    const result = props.products;
    if (keyword.length > 0) {
      result.filter(p => p.name.includes(keyword))
    }
    if (furnitureStyle.length > 0) {
      result.filter(p => furnitureStyle.some(v => p.furniture_style.indexOf(v) !== -1))
    }
    // if (deliveryTime.length > 0) {
    //   const result2 = [];
    //   for (var i in deliveryTime) {
    //     if (deliveryTime[i] == -1) {

    //     } else {

    //     }
    //     const filtered = result.filter(p => p.delivery_time > deliveryTime[i] - 7 && p.delivery_time < deliveryTime[i])
    //     result2 = [...result2, filtered]
    //   }

    //   result = result2;
    // }
    setDatares(result);
  }

  console.log(props)
  return (
    //
    <div>
      <div style={{ "margin": "40px" }}>
        <Grid container
          spacing={2}
          justify="center"
          alignItems="center" >
          <Grid item xs={6}>
            <TextField
              value={keyword}
              label={keywordLabel}
              placeholder={keywordLabel}
              onChange={(input) => setKeyword(input.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>

            <FormControl style={{ "width": "100%" }}>
              <InputLabel id="furniturStyleL">{furnitureSLabel}</InputLabel>
              <Select
                multiple
                labelId="furniturStyleL"
                value={furnitureStyle}
                onChange={(e) => { setfurnitureStyle(e.target.value) }}
                renderValue={(selected) => selected.join(', ')}
              >
                {
                  props.furnitureStyles && props.furnitureStyles.map((furniture) => (
                    <MenuItem
                      key={furniture} value={furniture}
                    >
                      <ListItemText primary={furniture} />
                      <Checkbox checked={furnitureStyle.indexOf(furniture) > -1} />
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>

            <FormControl style={{ "width": "100%" }}>
              <InputLabel id="deliveryTimeL">{deliveryTLabel}</InputLabel>
              <Select
                multiple
                labelId="deliveryTimeL"
                value={deliveryTime}
                onChange={(e) => {
                  setdeliveryTime(e.target.value)

                  let days = [];
                  for (let i = 0; i < e.target.value.length; i++) {
                    var index = deliveryTChoice.indexOf(e.target.value[i]);
                    let day = 0
                    switch (index) {
                      case 0: day = 7; break;
                      case 1: day = 14; break;
                      case 2: day = 30; break;
                      case 3: day = -1; break;
                    }
                    days.push(day);
                  }
                  setdeliveryDay(days);
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {
                  deliveryTChoice.map((delivery) => (
                    <MenuItem
                      key={delivery} value={delivery}
                    >
                      <ListItemText primary={delivery} />
                      <Checkbox checked={deliveryTime.indexOf(delivery) > -1} />
                    </MenuItem>
                  )
                  )
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>

      </div>
      <div style={{ "margin": "40px" }}>

        <Grid container
          spacing={4}
          // justify="center" 
          alignItems="center" >
          {/* <Grid item xs={12} sm={9} md={6}> */}

          {datares && datares.map((h, i) =>
            <Card key={i}
              data={h}
            // id={h.id}
            // name={h.name}
            // description={h.description}
            // furniture_style={h.furniture_style}
            // delivery_time={h.delivery_time}
            // // imageUrl={h.imageUrl}
            // // title={h.title}
            // price={h.price} 
            />
          )}

        </Grid>
      </div>
    </div>

  );
}

const mapStateToProps = ({ data }) => {
  const { furniture_styles: furnitureStyles, products } = data;
  return {
    furnitureStyles,
    products
  }
}
const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
