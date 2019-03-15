import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
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
import LoadingIndicator from 'components/LoadingIndicator';

class HomePage extends Component {
  constructor(props) {
    super(props);
    props.getItemsFromServer(props.userToken);
  }

  render() {
    const { classes, items, isLoadingItems } = this.props;

    if (isLoadingItems) {
      return LoadingIndicator();
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Home</title>
          <meta
            name="Home Page"
            content="Home Page of The Corner Bookstore"
          />
        </Helmet>
        <CssBaseline />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {items.toJS().map((item) => {
                const isSoldOut = item.qty === 0;
                const { _id: id } = item;

                // @TODO refactor to a separate component
                return (
                  <Grid item key={id} sm={6} md={4} lg={3}>
                    <Card
                      className={classes.card}
                      style={isSoldOut ? { opacity: 0.5 } : {}}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={item.images[0]}
                        title={item.name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          {`Price: ${item.price.toFixed(2)}`}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {isSoldOut ? null : (
                          <React.Fragment>
                            <IconButton
                              className={classes.button}
                              aria-label="Remove"
                              disabled={isSoldOut}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography gutterBottom variant="h6">
                              {isSoldOut ? 'Sold Out' : '0'}
                            </Typography>
                            <IconButton
                              className={classes.button}
                              aria-label="Add"
                              disabled={isSoldOut}
                            >
                              <AddIcon />
                            </IconButton>
                          </React.Fragment>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  getItemsFromServer: PropTypes.func.isRequired,
  userToken: PropTypes.string,
  items: PropTypes.array,
  isLoadingItems: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

HomePage.defaultProps = {
  userToken: null,
  items: [],
  isLoadingItems: false,
};

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
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

export default withStyles(styles)(HomePage);
