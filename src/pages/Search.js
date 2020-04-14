import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Grid, InputLabel,
  ListItemText,
  Checkbox, TextField, Select, MenuItem,
  FormControl
} from '@material-ui/core';
import Card from "../components/Card";
import { getData } from '../actions';

import "../assets/css/Search.css"

const keywordLabel = "Search Furniture";
const furnitureSLabel = "Furniture Style";
const deliveryTLabel = "Delivery Time";

const deliveryTChoice = { "1 week": 7, "2 weeks": 14, "1 month": 30, "more than 1 month": -1 };

const Search = props => {

  const [keyword, setKeyword] = React.useState('');
  const [datares, setDatares] = React.useState([]);
  const [furnitureStyle, setfurnitureStyle] = React.useState([]);
  const [deliveryTime, setdeliveryTime] = React.useState([]);

  //componentdidmount
  useEffect(() => {
    props.getData();
  }, []);

  //when props.product change
  useEffect(() => {
    filter();
  }, [props.products]);

  //on keyword, furnitureStyle, deliveryDay change
  useEffect(() => {
    filter();
  }, [keyword,
    furnitureStyle,
    deliveryTime]);

  const filter = () => {
    let result = props.products;
    if (keyword.length > 0) {
      result = result.filter(p => p.name.includes(keyword))
    }

    if (furnitureStyle.length > 0) {
      result = result.filter(p =>
        p.furniture_style.some(v => furnitureStyle.indexOf(v) !== -1)
      )
    }
    if (deliveryTime.length > 0) {
      const max = deliveryTime.reduce((acc, c) => {
        const curr = deliveryTChoice[c]
        if (curr == -1 || acc == -1) {
          return -1;
        }
        if (curr > acc) {
          return curr
        }
        return acc;
      }, 0);
      if (max > 0) {
        result = result.filter(p => parseInt(p.delivery_time) < max);
      }

      // const result2 = [];
      // for (var i in deliveryTime) {
      //   if (deliveryTime[i] == -1) {

      //   } else {

      //   }
      //   const filtered = result.filter(p => p.delivery_time > deliveryTime[i] - 7 && p.delivery_time < deliveryTime[i])
      //   result2 = [...result2, filtered]
      // }

      // result = result2;
    }
    setDatares(result);
  }
  return (
    //
    <div>
      <div style={{ "padding": "40px", background: "#106cc8" }} className="dark">
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              value={keyword}
              label={keywordLabel}
              placeholder={keywordLabel}
              onChange={(input) => setKeyword(input.target.value)}
              fullWidth
              style={{ color: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>

            <FormControl style={{ "width": "100%" }}>
              <InputLabel id="deliveryTimeL">{deliveryTLabel}</InputLabel>
              <Select
                multiple
                labelId="deliveryTimeL"
                value={deliveryTime}
                onChange={(e) => {
                  setdeliveryTime(e.target.value)

                  // let days = [];
                  // for (let i = 0; i < e.target.value.length; i++) {
                  //   var index = deliveryTChoice.indexOf(e.target.value[i]);
                  //   let day = 0
                  //   switch (index) {
                  //     case 0: day = 7; break;
                  //     case 1: day = 14; break;
                  //     case 2: day = 30; break;
                  //     case 3: day = -1; break;
                  //   }
                  //   days.push(day);
                  // }
                  //setdeliveryDay(days);
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {
                  Object.keys(deliveryTChoice).map(delivery => (
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
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Grid container
              spacing={4}
              alignItems="center">
              {datares && datares.map((h, i) =>
                <Grid item xs={12} sm={6} key={i}>
                  <Card data={h} />
                </Grid>
              )}
            </Grid>
          </Grid>
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
