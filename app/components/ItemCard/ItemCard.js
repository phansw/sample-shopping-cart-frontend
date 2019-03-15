import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles } from '@material-ui/core/styles';

const ItemCard = (
  {
    id, image, name, price, isSoldOut, cartQty, onAddItem, onRemoveItem, classes,
  }
) => (
  <Grid item key={id} sm={6} md={4} lg={3}>
    <CssBaseline />
    <Card
      className={classes.card}
      style={isSoldOut ? { opacity: 0.5 } : {}}
    >
      <CardMedia
        className={classes.cardMedia}
        image={image}
        title={name}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {`Price: ${price.toFixed(2)}`}
        </Typography>
      </CardContent>
      <CardActions>
        {isSoldOut ? null : (
          <React.Fragment>
            <IconButton
              className={classes.button}
              aria-label="Remove"
              onClick={() => {
                onRemoveItem(id);
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography gutterBottom variant="h6">
              {isSoldOut ? 'Sold Out' : cartQty}
            </Typography>
            <IconButton
              className={classes.button}
              aria-label="Add"
              onClick={() => {
                onAddItem(id);
              }}
            >
              <AddIcon />
            </IconButton>
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  </Grid>
);

const styles = () => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isSoldOut: PropTypes.bool.isRequired,
  cartQty: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);
