import Layout from "../components/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
import style from '../styles/Settings.module.css'
import {Button, createMuiTheme, MenuItem, Select, Snackbar} from "@material-ui/core";
import {buttonStyle, iconStyle} from "../styles/bar/BarMaterialStyles";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage, setCookiesLanguage} from "../config/Language";

export default function Settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)

    const changeLang = (event) => {
        const newLocale = event.target.value
        const newLang = getLanguage(newLocale, router.pathname)
        setCookiesLanguage(newLocale)
        router.push('/signin', '/signin', {locale: newLocale}).catch(r => console.log(r))
        setLang(newLang)
    }
    return (

            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={'Settings'} pageTitle={'Settings'} pageInfo={'INFORMATION'}/>
                        <div className={style.setting_row_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                            <p>Theme</p>
                            <Button style={{...{color: props.dark ? 'white' : '#111111'}}} onClick={() => props.changeTheme()} >
                                {!props.dark ? <Brightness7RoundedIcon  style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/> : <Brightness3RoundedIcon style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/>}
                            </Button>
                        </div>
                        <div className={style.setting_row_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                            <p>Language</p>
                            <Select
                                labelId="select-id"
                                disableUnderline
                                style={{
                                    textTransform: 'none',
                                    fontSize: '.8rem',
                                    color: props.dark ? 'white' : '#777777',
                                    fontWeight: '450'
                                }}
                                value={props.locale}
                                onChange={event => changeLang(event)}
                            >
                                <MenuItem key={"pt"} value="pt">
                                    Português
                                </MenuItem>
                                <MenuItem key={"en"} value="en">
                                    English
                                </MenuItem>
                                <MenuItem key={"es"} value="es">
                                    Español
                                </MenuItem>
                            </Select>
                        </div>

                    </ThemeProvider>
                }

            </Layout>

    )
}
