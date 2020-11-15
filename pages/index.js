import Head from 'next/head'
import styles from '../styles/Home.module.css'
//third party
import {Grid} from '@material-ui/core'
import classNames from 'classnames'
import mstyles from 'src/PageStyles/homepageStyles.js'
export default function Home() {
  let s = mstyles()
  return (
    <Grid
      className={classNames(`${s.wireFrameBorderOne}`)}
      id='indexContainer'
    >
      index
    </Grid>
  )
}
