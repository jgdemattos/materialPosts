import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    marginTop: "50px"
  },
  image: {
    position: "relative",
    height: 250,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    },
    boxShadow: "inset 0 0 20px #555;"
  },
  setImage: {
    position: "relative",
    height: 250,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    zIndex: 1,
    "& $imageBackdrop": {
      opacity: 0.15
    },
    "& $imageMarked": {
      opacity: 0
    },
    "& $imageTitle": {
      border: "4px solid currentColor"
    },
    boxShadow: "inset 0 0 20px #555;"
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    boxShadow: "inset 0px 0px 20px #555;"
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  cardHeaderLink: {
    textDecoration: "none",
    margin: 0,
    padding: 0
  }
});

const images = {
  react: {
    url:
      "https://d2l3jyjp24noqc.cloudfront.net/uploads/image/img/505/Testing_Common_Redux_Patterns_in_React_Using_AVA.png",
    title: "React",
    width: "33.33%"
  },
  redux: {
    url: "https://cdn-images-1.medium.com/max/1200/0*ngXgBNNdx6iiWP8q.png",
    title: "Redux",
    width: "33.33%"
  },
  udacity: {
    url:
      "https://l3apq3bncl82o596k2d1ydn1-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/Udacity-VR-Image-810x492.jpg",
    title: "Udacity",
    width: "33.33%"
  }
};

function CategoryDisplay(props) {
  const { classes, categories, currentCategory } = props;
  return (
    <div className={classes.root}>
      {/* ${postCategory} */}

      {categories.map(category => (
        <ButtonBase
          focusRipple
          key={category.name}
          className={
            category.name === currentCategory ? classes.setImage : classes.image
          }
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: images[category.name].width
          }}
        >
          <Link
            className={classes.cardHeaderLink}
            to={`/category/${category.path}/`}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${images[category.name].url})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {images[category.name].title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>{" "}
          </Link>
        </ButtonBase>
      ))}
    </div>
  );
}

CategoryDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string
};

function mapStateToProps({ categories }, { currentCategory }) {
  return {
    categories: Object.values(categories).map(category => category),
    currentCategory
  };
}

export default connect(mapStateToProps)(withStyles(styles)(CategoryDisplay));
