import React, {useEffect, useState} from 'react'
import {Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
import Cookies from 'universal-cookie/lib';
import {
    AccountTreeRounded,
    ExitToAppRounded,
    ExtensionRounded,
    SettingsRounded,
    SupervisorAccountRounded
} from '@material-ui/icons';
import styles from '../../../styles/shared/Bar.module.css'
import {buttonStyle, logoStyle, secondaryButtonStyle} from '../../../styles/shared/BarMaterialStyles';
import en from '../../../locales/navigation/NavigationEN';
import es from '../../../locales/navigation/NavigationES';
import pt from '../../../locales/navigation/NavigationPT';
import Link from 'next/link'
import {getLogo} from '../../../utils/shared/Theme';
import SimpleProfileCardLayout from '../layout/SimpleProfileCardLayout';
import PropTypes from 'prop-types'
import {readAccessProfile, readProfile} from "../../../utils/shared/IndexedDB";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getBoxShadow, getIconStyle, getPrimaryColor, getSecondaryBackground} from "../../../styles/shared/MainStyles";

const cookies = new Cookies()

export default function Navigation(props) {

    const [lang, setLang] = useState(en)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        setLanguage(props.locale)
        if (profile === null)
            readProfile().then(res => setProfile(res))
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [props.locale])

    function setLanguage(locale) {
        switch (locale) {
            case 'en': {
                setLang(en)
                break
            }
            case 'es': {
                setLang(es)
                break
            }
            case 'pt': {
                setLang(pt)
                break
            }
            default: {
                break
            }
        }
    }

    return (
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: props.dark ? "dark" : "light"
            }
        })}>
            <div className={styles.nav_bar_container}>
                <div style={{gridRow: 1, alignItems: 'flex-start'}}>
                    <img style={logoStyle} src={getLogo(props.dark)} alt={'aeb'}/>
                </div>

                <div style={{gridRow: 2, display: 'grid', justifyContent: 'flex-start', alignContent: 'center'}}>
                    {accessProfile !== null && accessProfile.canViewActivityLog ?
                        <div className={styles.button_container}
                             style={{...props.path === '/menu' ? getSecondaryBackground({dark: props.dark}) : null, ...getBoxShadow({dark: props.dark})}}>
                            <Link href={{pathname: '/menu', locale: props.locale}}>
                                <Button
                                    style={{...buttonStyle, ...{color: props.path === '/menu' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                                    <SupervisorAccountRounded
                                        style={getIconStyle({dark: props.dark, highlight: props.path === '/menu'})}/>
                                    {lang.menu}
                                </Button>
                            </Link>
                        </div> : null}

                    <div className={styles.button_container}
                         style={{...props.path === '/' ? getSecondaryBackground({dark: props.dark}) : null, ...getBoxShadow({dark: props.dark})}}>

                        <Link href={{pathname: '/', locale: props.locale}}>
                            <Button
                                style={{...buttonStyle, ...{color: props.path === '/' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                                <ExtensionRounded
                                    style={getIconStyle({dark: props.dark, highlight: props.path === '/'})}/>
                                {lang.extensions}
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.button_container}
                         style={props.path === '/structure' ? getSecondaryBackground({dark: props.dark}) : null}>
                        <Link href={{pathname: '/structure', locale: props.locale}}>
                            <Button
                                style={{...buttonStyle, ...{color: props.path === '/structure' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                                <AccountTreeRounded
                                    style={getIconStyle({dark: props.dark, highlight: props.path === '/structure'})}/>
                                {lang.structure}
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.button_container}
                         style={{...props.path === '/settings' ? getSecondaryBackground({dark: props.dark}) : null, ...getBoxShadow({dark: props.dark})}}>
                        <Link href={{pathname: '/settings', locale: props.locale}}>
                            <Button
                                style={{...buttonStyle, ...{color: props.path === '/settings' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                                <SettingsRounded
                                    style={getIconStyle({dark: props.dark, highlight: props.path === '/settings'})}/>
                                {lang.settings}
                            </Button>
                        </Link>
                    </div>


                    {cookies.get('jwt') !== undefined ?
                        <>
                            <div className={styles.button_container}>
                                <Link href={{pathname: '/signin', locale: props.locale}}>
                                    <Button style={{...buttonStyle, ...{color: props.dark ? 'white' : '#111111'}}}>
                                        <ExitToAppRounded
                                            style={getIconStyle({dark: props.dark})}/>
                                        {lang.signout}
                                    </Button>
                                </Link>
                            </div>

                        </>
                        :
                        null
                    }
                </div>
                <div className={styles.bar_profile_container} style={{gridRow: 3}}>
                    {profile === null ?
                        <>
                            <Link href={{pathname: '/signin', locale: props.locale}}>
                                <Button style={{
                                    ...{
                                        marginRight: '10px'
                                    },
                                    ...getPrimaryColor({dark: props.dark})
                                }}
                                >{lang.signin}</Button>
                            </Link>
                        </>
                        :
                        (
                            <Link href={{pathname: '/person', locale: props.locale, query: {id: profile.id}}}>
                                <a>
                                    <SimpleProfileCardLayout name={profile.name} image={profile.pic} dark={props.dark} email={profile.corporateEmail}/>
                                </a>
                            </Link>
                        )
                    }
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button className={mainStyles.tertiaryParagraph}
                                style={{...secondaryButtonStyle, ...getPrimaryColor({dark: props.dark})}}>{lang.help}</Button>
                        <Button
                            style={{...secondaryButtonStyle, ...getPrimaryColor({dark: props.dark})}}>{lang.about}</Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

Navigation.propTypes = {
    locale: PropTypes.string,
    dark: PropTypes.bool,
    path: PropTypes.string,
}