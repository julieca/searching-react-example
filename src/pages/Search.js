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

  useEffect(() => {
    props.getData();
  }, []);

  useEffect(() => {
    filter();
  });

  const filter = () => {
    // const result = props.data.productPromo.filter(
    //   product => product.title.includes(keyword));
    // setDatares(result);
  }

  console.log(props)
  return (
    //
    <div>
      <div>
        <TextField
          value={keyword}
          label={keywordLabel}
          placeholder={keywordLabel}
          onChange={(input) => setKeyword(input.target.value)}
        />
        <FormControl>

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
        <FormControl>

        <InputLabel id="deliveryTimeL">{deliveryTLabel}</InputLabel>
        <Select
          multiple
          labelId="deliveryTimeL"
          value={deliveryTime}
          onChange={(e) => { setdeliveryTime(e.target.value) }}
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
      </div>

      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={9} md={6}>

          {datares && datares.map((h, i) =>
            <Card key={i}
              id={h.id}
              imageUrl={h.imageUrl}
              title={h.title}
              price={h.price} />
          )}

        </Grid>
      </Grid>
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
