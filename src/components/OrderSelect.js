import React, { Component } from "react";

import ReactDOM from "react-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    float: "right",
    marginRight: "20px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class OrderSelect extends Component {
  state = {
    order: "voteScore",
    name: "hai",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    const { orderBy } = this.props;
    const order = event.target.value;

    this.setState({ [event.target.name]: event.target.value });

    orderBy(order);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="orderSelect">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-order-simple"
          >
            Order by
          </InputLabel>
          <Select
            value={this.state.order}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="order"
                id="outlined-order-simple"
              />
            }
          >
            <MenuItem value={"voteScore"}>Vote score</MenuItem>
            <MenuItem value={"timestamp"}>Time</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(OrderSelect);
