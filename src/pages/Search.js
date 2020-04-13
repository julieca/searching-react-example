import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Grid, IconButton, TextField, Select, MenuItem
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import Card from "../components/Card";
import { getData } from '../actions';

const keywordLabel = "Search Furniture";
const Search = props => {

  const [keyword, setKeyword] = React.useState('');
  const [datares, setDatares] = React.useState([]);

  useEffect(() => {
    props.getData();
  }, []);

  useEffect(() => {
    filter();
  });

  const filter = () => {
    const result = props.data.productPromo.filter(
      product => product.title.includes(keyword));
    setDatares(result);
  }

  return (
    //
    <div>
      <div>
        {/* <TextField
          value={keyword}
          label={keywordLabel}
          placeholder={keywordLabel}
          onChange={(input) => setKeyword(input.target.value)}
        /> */}

        {/* <Select
          multiple
          label={keywordLabel}
          placeholder={keywordLabel}
          value={keyword}
          onChange={() =>{}}
        >
          {
            furnitures.map((furniture) => (
              <MenuItem></MenuItem>
            ));
        }

        </Select> */}

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
