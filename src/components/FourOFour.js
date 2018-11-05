import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function FourOFour(props) {
  return (
    <div className="fourOFour">
      <Grid
        style={{
          margin: 0,
          width: "100%",
          marginTop: "100px"
        }}
        container
        spacing={40}
        direction={"row"}
        justify={"center"}
      >
        <Grid item>
          <Typography component="h2" variant="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="body1" gutterBottom>
            Looks like this page does't exist.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default FourOFour;
