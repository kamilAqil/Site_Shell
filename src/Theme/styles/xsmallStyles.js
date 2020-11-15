import { createStyles, makeStyles } from "@material-ui/core/styles";

import theme from "src/Theme/theme.js";


let xsmallStyles = makeStyles((theme) =>
  createStyles({
    mainContainerLandingScreen: {
      display: "flex",
      flexFlow: "column",
      position: "relative",
      width: "320px",
    },

    wireFrameBorderOne: {
      border: `1px solid ${theme.palette.limeGreen.main}`,
    },
    wireFrameBorderTwo: {
      border: `1px solid ${theme.palette.skyBlue.main}`,
    },
    wireFrameBorderThree: {
      border: `1px solid ${theme.palette.beetRed.main}`,
    },
  })
);

export default xsmallStyles;
