import React from 'react'
import Cookies from 'universal-cookie/lib';
import {ExitToApp, HomeRounded, MenuOpenRounded, PersonAddRounded, TuneRounded} from '@material-ui/icons';
import styles from '../../styles/Navigation.module.css'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import NavigationProfile from "./NavigationProfile";
import animations from '../../styles/shared/Animations.module.css'
import NavigationButton from "../layout/NavigationButton";
import {Button} from "@material-ui/core";
import NavigationPT from "../../packages/locales/others/NavigationPT";


export default function Navigation(props) {

    const lang = NavigationPT

    return (
        <div className={[styles.navigationContainer, animations.slideInLeftAnimation].join(' ')}
             style={{
                 borderRadius: props.reduced ? '0' : '0 8px 8px 0',
                 width: props.reduced ? '75px' : '250px',
             }}>

            <div className={styles.navigationButtonsHalf}>
                <div className={styles.logoContainer}
                     style={{justifyContent: props.reduced ? 'center' : 'space-between'}}>
                    {props.reduced ? null :
                        <img className={animations.fadeIn}
                             style={{width: '50%', marginLeft: '16px'}}
                             src={'/dark.png'} alt={'logo'}/>
                    }

                    <Button onClick={() => props.setReduced(!props.reduced)}
                            style={{width: '55px', height: '55px', borderRadius: '8px', padding: 'unset'}}>
                        <MenuOpenRounded style={{
                            color: '#f2f2f2',
                            transform: props.reduced ? 'rotate(180deg)' : null,
                        }}/>
                    </Button>
                </div>

                <NavigationButton
                    dark={props.dark} linkPath={'/'}
                    highlight={props.path === '/'}
                    label={lang.management} reduced={props.reduced}
                    icon={
                        <HomeRounded/>
                    }
                />


                <NavigationButton
                    dark={props.dark} linkPath={'/create'}
                    highlight={props.path === '/create'}
                    label={lang.createPerson} reduced={props.reduced}
                    icon={
                        <PersonAddRounded/>
                    }
                />


                <NavigationButton
                    dark={props.dark} linkPath={'/settings'}
                    highlight={props.path === '/settings'}
                    label={(new Cookies()).get('jwt') !== undefined ? lang.adjustments : lang.settings}
                    reduced={props.reduced}
                    icon={
                        <TuneRounded/>
                    }
                />

                <NavigationButton
                    dark={props.dark} linkPath={'/authenticate'}
                    highlight={false}
                    label={lang.signout} reduced={props.reduced}
                    icon={
                        <ExitToApp style={{transform: 'rotate(180deg)'}}/>
                    }
                />
            </div>

            <div className={mainStyles.displayInlineCenter}
                 style={{height: '33.333%', alignItems: 'flex-end', paddingBottom: '4px'}}>
                {(props.profile !== null && (new Cookies()).get('jwt') !== undefined) ?
                    <NavigationProfile dark={props.dark} profile={{
                        id: props.profile.id,
                        image: props.profile.image,
                        corporate_email: props.profile.corporate_email,
                        name: props.profile.name
                    }} reduced={props.reduced}
                                       setReduced={props.setReduced} accessProfile={props.accessProfile}
                                       locale={{
                                           profile: lang.profile,
                                           signout: lang.signout,
                                           signin: lang.signin
                                       }}/>
                    :
                    null
                }
            </div>
        </div>
    )

}

Navigation.propTypes = {
    dark: PropTypes.bool,
    path: PropTypes.string,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func,
    query: PropTypes.object,
    profile: PropTypes.object,
    accessProfile: PropTypes.object
}
