import Layout from "../components/shared/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
import style from '../styles/Settings.module.css'
import {
    Button,
    createMuiTheme,
    FormControl,
    FormControlLabel,
    Menu,
    MenuItem, Paper, Radio,
    RadioGroup,
    Select,
    Snackbar
} from "@material-ui/core";
import {buttonStyle, iconStyle} from "../styles/bar/BarMaterialStyles";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage, setCookiesLanguage} from "../utils/Language";
import Cookies from "universal-cookie/lib";
import InputLayout from "../components/shared/InputLayout";
import AccordionLayout from "../components/shared/AccordionLayout";

export default function Settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        const currentLocale = (new Cookies()).get('lang')

        if (currentLocale !== undefined && currentLocale !== router.locale) {
            router.push('/settings', '/settings', {locale: currentLocale}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])

    const changeLang = (event) => {
        const newLocale = event
        setCookiesLanguage(newLocale)
        router.push('/settings', '/settings', {locale: newLocale}).catch(r => console.log(r))
        setLang(getLanguage(router.locale, router.pathname))
    }
    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.settings} pageTitle={lang.settings} pageInfo={lang.information}/>
                        <div className={style.settings_components_container}>
                            <AccordionLayout
                                content={
                                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                                        <RadioGroup onChange={event => changeLang(event.target.value)}
                                                    value={props.locale}>
                                            {[{value: 'Português', key: 'pt'}, {
                                                value: 'English',
                                                key: 'en'
                                            }, {value: 'Español', key: 'es'}].map(choice => {
                                                return <FormControlLabel value={choice.key} control={<Radio/>}
                                                                         label={choice.value}/>
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                }
                                summary={
                                    <legend>{lang.language}</legend>
                                }
                                closedSize={21.5}
                                openSize={21.5}
                            />


                            <AccordionLayout
                                content={
                                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                                        <RadioGroup onChange={() => props.changeTheme()} value={props.dark}>
                                           <FormControlLabel value={false} control={<Radio/>} label={
                                             <div className={style.theme_container}>
                                                 <p>Light</p>
                                                 <Brightness7RoundedIcon style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/>
                                             </div>
                                           }/>
                                            <FormControlLabel value={true} control={<Radio/>} label={
                                                <div className={style.theme_container}>
                                                    <p>Dark</p>
                                                    <Brightness3RoundedIcon style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/>
                                                </div>
                                            }/>
                                        </RadioGroup>
                                    </FormControl>
                                    }
                                summary={
                                    <legend>{lang.theme}</legend>
                                }
                                closedSize={22.5}
                                openSize={22.5}
                            />

                        </div>

                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}
