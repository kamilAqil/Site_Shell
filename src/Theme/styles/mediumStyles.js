import { createStyles, makeStyles } from '@material-ui/core/styles'

import theme from 'src/Theme/theme.js'

let mediumStyles = makeStyles((theme) => createStyles({
    
    wireFrameBorderOne: {
        border: `1px solid ${theme.palette.limeGreen.main}`
    },
    wireFrameBorderTwo: {
        border: `1px solid ${theme.palette.skyBlue.main}`
    },
    wireFrameBorderThree: {
        border: `1px solid ${theme.palette.beetRed.main}`
    }
}))


export default mediumStyles