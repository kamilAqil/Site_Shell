import { createStyles, makeStyles } from "@material-ui/core/styles";

import theme from "src/Theme/theme";

let styles = makeStyles((theme) => createStyles({
    
    wireFrameBorderOne: {
        border: `1px solid ${theme.palette.limeGreen.main}`
    },
    wireFrameBorderThree: {
        border: `1px solid ${theme.palette.beetRed.main}`
    },
    wireFrameBorderTwo: {
        border: `1px solid ${theme.palette.skyBlue.main}`
    }
}))

export default styles;