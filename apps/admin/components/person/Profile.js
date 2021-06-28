import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/Person.module.css'
import PersonPersona from "../shared/PersonAvatar";
import {Avatar} from "@material-ui/core";

export default function Profile(props) {
    return (
        <div className={styles.profileContainer}>
            <Avatar src={props.person.image} alt={'profile_pic'} style={{width: '80px', height: '80px',}}
                    variant={'circle'}/>

            <div style={{
                display: 'grid',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                justifyItems: 'flex-start'
            }}>
                <h3 style={{marginTop: '0', marginBottom: '0'}}>
                    {props.person.name}
                </h3>
                {props.member !== null ?
                    <h5 style={{marginTop: '8px'}}>
                        {props.member.corporate_email}
                    </h5>
                    :
                    null
                }
            </div>
        </div>

    )
}

Profile.proptypes = {
    person: PropTypes.object,
    member: PropTypes.object
}
