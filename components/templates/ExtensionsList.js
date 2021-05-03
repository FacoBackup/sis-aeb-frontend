import PropTypes from 'prop-types'
import React, {useState} from "react";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import Accordion from "../layout/Accordion";
import ProfilePersona from "../elements/profile/ProfilePersona";
import {Button} from "@material-ui/core";

export default function ExtensionsList(props) {
    const currentDate = new Date()
    const [hovered, setHovered] = useState(false)
    return (


        <Button key={props.data.profile.id} onClick={() => props.redirect(props.data.profile.id)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{
                    animationDelay: props.index * 200 + 'ms',
                    width: '100%',
                    height: '100%',
                    textTransform: 'none',
                    color: 'initial',
                    borderRadius: '8px',
                    border: hovered ? '#0095ff .7px solid' : 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : null,
                    backgroundColor: hovered ? 'rgba(0, 0, 0, 0.05)' : null,
                    transition: '300ms ease-in-out',
                    paddingBottom: 0,
                    paddingTop: 0
                }}>
            <div className={mainStyles.rowContainer} style={{height: '90px'}}>
                <div
                    className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                >
                    <ProfilePersona dark={false} key={props.data.profile.id}
                                    image={props.data.profile.image} size={'70px'} variant={'circle'}
                                    elevation={false}
                                    cakeDay={((new Date(props.data.profile.birth)).getDay() === currentDate.getDay() && (new Date(props.data.profile.birth)).getMonth() === currentDate.getMonth())}/>
                    <p className={mainStyles.secondaryParagraph}
                       style={{
                           marginLeft: '5px',
                           textTransform: 'capitalize'
                       }}>{props.data.profile.name}</p>
                </div>
                <div
                    className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter, mainStyles.overflowEllipsis].join(' ')}
                    style={getTertiaryColor({dark: false})}>
                    {props.data.profile.corporate_email}
                </div>
                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                     style={getTertiaryColor({dark: false})}>
                    {props.data.profile.extension}
                </div>
                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                     style={getTertiaryColor({dark: false})}>
                    {props.data.unit === undefined || props.data.unit === null ? null : props.data.unit.acronym}
                </div>
                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}>
                    <div style={{
                        width: "fit-content",
                        height: 'auto',
                        padding: '0px 10px 0px 10px',
                        borderRadius: '5px',
                        backgroundColor: props.data.unit !== undefined && props.data.unit !== null ? '#4ad862' : '#f54269',
                        color: 'white'
                    }}>
                        {props.data.unit !== undefined && props.data.unit !== null ? 'Active' : 'Inactive'}
                    </div>
                </div>

            </div>
        </Button>
    )
}
ExtensionsList.propTypes = {
    data: PropTypes.object,
    sorterMethod: PropTypes.string,
    redirect: PropTypes.func,
    index: PropTypes.number,
    inactiveLocale: PropTypes.string,
}