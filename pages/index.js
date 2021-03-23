import Layout from "../components/layout/Layout";
import React, {useState} from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
import styles from '../styles/Index.module.css'
import Persona from "../components/layout/PersonaLayout";
import Head from "next/head";
import {
    Button,
    createMuiTheme,
    IconButton,
    InputBase,
    Paper,
    Popover,
    ThemeProvider,
    Typography
} from "@material-ui/core";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {InfoRounded, SearchRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";

export default function Index() {
  const router = useRouter()
  const { locale } = router
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
      return (
          <div>
            <Head>
              <title>Ramais</title>
            </Head>
            <Layout>
              {props => (
                  <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                      <div className={styles.header_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                          <div className={shared.title_container}>
                              <h2>Ramais</h2>

                             <ThemeProvider theme={createMuiTheme({
                                 palette: {
                                     type: props.dark ? "dark" : "light"
                                 }
                             })}>
                                 <Button onClick={handleClick}>
                                     <InfoRounded style={{color: !props.dark ? '#777777' : '#ededed', fontSize: '1.8rem'}}/>
                                 </Button>
                                 <Popover
                                     open={open}
                                     anchorEl={anchorEl}
                                     id={id}
                                     onClose={handleClose}
                                     anchorOrigin={{
                                         vertical: 'center',
                                         horizontal: 'center',
                                     }}
                                     transformOrigin={{
                                         vertical: 'center',
                                         horizontal: 'center',
                                     }}
                                 >
                                     <div style={{padding: '10px'}}>
                                         <p>TESTETESfadadasdasdasdsdadsasdsda</p>

                                     </div>
                                 </Popover>
                             </ThemeProvider>

                          </div>
                          <div className={styles.paper_container}>
                              <Paper component="form" style={{...searchFieldStyle, ...{backgroundColor: props.dark ? '#272e38' : '#f4f8fb', boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0'}}}>
                                  <IconButton aria-label="search">
                                      <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                                  </IconButton>
                                  <InputBase
                                      style={{width: '93%', color: (props.dark ? 'white' : null)}}
                                      placeholder={'Search'}
                                  />
                              </Paper>
                          </div>
                      </div>
                      <div className={shared.unity_collaborators_container} >
                          <div>
                              <Persona
                                  pic={'https://rollingstone.uol.com.br/media/_versions/marcos_jeeves_teaser_reprod_widemd.jpg'}
                                  name={'Gustavo Micael Barbosa Roque'}
                                  admin={false}
                                  email={' gustavo.roque@aeb.gov.br'}
                                  phone={'123123-1231'}
                                  id={1}
                                  dark={props.dark}
                                  birth={(new Date()).getTime()}
                              />
                              <Persona
                                  pic={'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg'}
                                  name={'Romulo!'}
                                  admin={false}
                                  email={'romulo.doboxe@aeb.gov.br'}
                                  phone={'42069-6969'}
                                  id={2}
                                  dark={props.dark}
                                  birth={1}
                              />

                          </div>
                      </div>

                  </div>
              )
              }

            </Layout>
          </div>
      )
}


// {
//     "unities": [
//         {
//             "ID": 1
//             "name": "DPOA",
//             "collaborators": [
//                 {
//                     "name": "gustavo"
//                 },
//                 {
//                     "name": "arthur"
//                 }
//             ]
//         },
//         {
//             "ID": 2
//             "name": "CTIC",
//             "collaborators": [
//                 {
//                     "name": "jean"
//                 },
//                 {
//                     "name": "neil"
//                 }
//             ]
//         }
//     ]
// }