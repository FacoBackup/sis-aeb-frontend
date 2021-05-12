import PropTypes from 'prop-types'
import React, {useCallback, useEffect, useState} from "react";
import {Button, Modal} from "@material-ui/core";

import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import {FilterListRounded} from "@material-ui/icons";
import Head from "next/head";
import HorizontalTabs from "./navigation/HorizontalTabs";
import Stepper from "./navigation/Stepper";
import styles from '../../styles/component/Component.module.css'

export default function HeaderLayout(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scrolledHeight, setScrolledHeight] = useState(0)
    const handleButtonClick = useCallback(() => {
        // Toggle the `isModalVisible` value:
        setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
    }, []);

    function RenderModalTest() {

        return (
            <Modal

                open={isModalVisible}
                onClose={handleButtonClick}
            >
                <div className={[styles.FilterModal, animations.slideInRightAnimation].join(' ')}>
                    {props.filterComponent}
                </div>
            </Modal>
        )
    }

    useEffect(() => {
        document.getElementById('scrollableDiv').addEventListener('scroll', () => {
            if (document.getElementById('r').offsetTop <= 50)
                setScrolledHeight(document.getElementById('r').offsetTop)
        })
        return () => {
            document.getElementById('scrollableDiv').removeEventListener('scroll', () => {
                if (document.getElementById('r').offsetTop <= 50)
                    setScrolledHeight(document.getElementById('r').offsetTop)
            })
        }
    })

    return (
        <div style={{
            position: 'sticky',
            top: 0,
            background: scrolledHeight > 0 ? 'white' : 'transparent',
            transition: '300ms ease-in-out',
            zIndex: '100',
            boxShadow: scrolledHeight > 0 ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'unset'
        }} id={'r'}>
            {RenderModalTest()}
            <Head>
                <title>{props.pageTitle}</title>
            </Head>

            <div className={styles.HeaderLayout} style={{
                width: props.width
            }}>

                <div className={mainStyles.displayInlineSpaced} style={{width: '100%', marginTop: '10px'}}>
                    <div className={mainStyles.displayInlineStart} style={{width: '100%', marginTop: '10px'}}>


                        <div style={{
                            display: 'grid',
                            gap: '.4rem',
                            width: typeof (props.title) === 'string' ? 'initial' : '100%'
                        }}>
                            {typeof (props.title) === 'string' ?
                                <h2 style={{
                                    marginBottom: !props.information ? '16px' : 0,
                                }}>
                                    {props.title}
                                </h2>
                                :
                                <div style={{width: '100%'}}>
                                    {props.title}
                                </div>
                            }
                            {props.information !== undefined ?
                                <div className={mainStyles.tertiaryParagraph}
                                     style={{color: '#555555', paddingBottom: '8px'}}>
                                    {props.information}
                                </div>
                                :
                                null
                            }
                        </div>

                        {props.filterComponent !== undefined ?
                            <Button onClick={handleButtonClick}>
                                <FilterListRounded style={{color: 'black'}}/>
                            </Button>
                            : null
                        }
                    </div>
                    {props.searchComponent !== undefined ?
                        props.searchComponent
                        : null
                    }
                </div>

                {props.activeFiltersComponent !== undefined ?

                    props.activeFiltersComponent

                    : null}
                {props.availableTabs !== undefined ?
                    <HorizontalTabs buttons={props.availableTabs.tabs} setOpenTab={props.availableTabs.setOpenTab}
                                    openTab={props.availableTabs.openTab} highlight={scrolledHeight < 50}/>

                    :
                    null
                }
                {props.stepper !== undefined ?
                    <Stepper buttons={props.stepper.tabs} setOpenTab={props.stepper.setOpenTab}
                             openTab={props.stepper.openTab}/>

                    : null}
            </div>

        </div>
    )
}
HeaderLayout.propTypes = {
    title: PropTypes.any,
    searchComponent: PropTypes.object,
    filterComponent: PropTypes.object,
    availableTabs: PropTypes.shape({
        tabs: PropTypes.array,
        openTab: PropTypes.number,
        setOpenTab: PropTypes.func
    }),
    pageTitle: PropTypes.string,
    information: PropTypes.string,
    activeFiltersComponent: PropTypes.object,
    stepper: PropTypes.bool,
    width: PropTypes.string
}