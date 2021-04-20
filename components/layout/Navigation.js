import React, {useEffect, useState} from 'react'
import {Avatar, createMuiTheme, Divider, ThemeProvider} from '@material-ui/core';
import Cookies from 'universal-cookie/lib';
import {
    AccountTreeRounded,
    ArrowForwardRounded,
    ExitToAppRounded,
    ExtensionRounded, MenuOpenRounded,
    SettingsRounded,
    SupervisorAccountRounded
} from '@material-ui/icons';
import styles from '../../styles/shared/Bar.module.css'
import en from '../../locales/navigation/NavigationEN';
import {getLogo} from '../../utils/shared/Theme';
import PropTypes from 'prop-types'
import {readAccessProfile, readProfile} from "../../utils/shared/IndexedDB";
import mainStyles from '../../styles/shared/Main.module.css'
import {
    getBorder,
    getBoxShadow,
    getIconStyle,
    getSecondaryBackground,
    getSecondaryColor,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import NavigationButtonLayout from "./NavigationButtonLayout";
import getComponentLanguage from "../../utils/shared/GetLanguage";
import ImageHost from "../../utils/shared/ImageHost";
import NavigationProfile from "./NavigationProfile";

const cookies = new Cookies()

export default function Navigation(props) {

    const [lang, setLang] = useState(en)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    // const [props.reduced, setprops.Reduced] = useState(true)

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'navigation'}))
        if (profile === null)
            readProfile().then(res => setProfile(res))
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [props.locale])


    return (

        <div className={[styles.navigationContent, styles.navigationContainer].join(' ')}
             style={{
                 ...{
                     width: props.reduced ? '4vw' : '14vw',
                     transition: '.3s',
                     paddingRight: props.reduced ? ' 5px  ' : null,
                     paddingLeft: props.reduced ? '5px' : null,
                     backgroundColor: 'black',
                     color: 'white',
                     boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'

                 },
                 ...getBorder({dark: props.dark})
             }}>
            <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineSpaced}
                 style={{height: 'fit-content', position: 'absolute', width: props.reduced ? '100%' : 'calc(100% - 10px)', top: '-5px'}}>
                {props.reduced ? null :
                    <p style={{color: 'white', marginLeft: '20px'}}>LOGO</p>
                    // <img style={{height: '75px', marginLeft: '5px'}} src={getLogo(props.dark)} alt={'aeb'}/>
                }
                <NavigationButtonLayout
                    dark={props.dark} linkPath={null}
                    highlight={false} locale={props.locale}
                    reduced={props.reduced}
                    setToggle={props.setReduced}
                    initialValue={props.reduced}
                    icon={<MenuOpenRounded style={{
                        ...{
                            transition: '.3s',
                            transform: props.reduced ? 'rotate(180deg)' : null,
                            color: 'white',
                        }
                    }}/>}
                />
            </div>
            <div style={{ display: 'grid', alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'center'}}>
                {/*{accessProfile !== null && accessProfile.canViewActivityLog ?*/}
                {/*    <NavigationButtonLayout*/}
                {/*        dark={props.dark} linkPath={'/menu'}*/}
                {/*        highlight={props.path === '/menu'} locale={props.locale}*/}
                {/*        label={lang.menu} reduced={props.reduced}*/}
                {/*        icon={<SupervisorAccountRounded*/}
                {/*            style={{*/}
                {/*                ...{color: props.path === '/' ? 'white' : props.dark ? 'white' : 'black'},*/}
                {/*                ...props.reduced ? {margin: 'auto'} : null*/}
                {/*            }}/>}*/}
                {/*    />*/}
                {/*    : null}*/}
                {/*<Divider orientation={'horizontal'} style={{width: '100%'}}/>*/}
                <NavigationButtonLayout
                    dark={props.dark} linkPath={'/'} background={'262626'}
                    highlight={props.path === '/'} locale={props.locale}
                    label={lang.extensions} reduced={props.reduced}
                    icon={
                        <ExtensionRounded
                            style={{
                                ...{color: 'white'},
                                ...props.reduced ? {margin: 'auto'} : null
                            }}/>
                    }
                />
                <NavigationButtonLayout
                    dark={props.dark} linkPath={'/structure'}
                    highlight={props.path === '/structure'} locale={props.locale}
                    label={lang.structure} reduced={props.reduced}
                    icon={<AccountTreeRounded
                        style={{
                            ...{color: 'white'},
                            ...props.reduced ? {margin: 'auto'} : null
                        }}/>}
                />
                <Divider orientation={'horizontal'} style={{width: '100%'}}/>
                <NavigationButtonLayout
                    dark={props.dark} linkPath={'/settings'}
                    highlight={props.path === '/settings'} locale={props.locale}
                    label={lang.settings} reduced={props.reduced}
                    icon={<SettingsRounded
                        style={{
                            ...{color: 'white'},
                            ...props.reduced ? {margin: 'auto'} : null
                        }}/>}
                />

            </div>
            <NavigationProfile dark={props.dark} profile={profile} reduced={props.reduced} locale={{profile: lang.profile, signout: lang.signout, signin: lang.signin}}/>
        </div>
    )
}

Navigation.propTypes = {
    locale: PropTypes.string,
    dark: PropTypes.bool,
    path: PropTypes.string,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func
}
