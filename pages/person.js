import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {createMuiTheme} from "@material-ui/core";
import styles from '../styles/form/Form.module.css'

import Profile from "../components/forms/person/profile/Profile";
import Layout from "../components/layout/Layout";
import {useRouter} from "next/router";
import Collaborations from "../components/forms/person/profile/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import axios from "axios";
import Host from "../config/Host";
import BasicForm from "../components/forms/person/profile/BasicForm";

const cookies = new Cookies()

export default function person() {

    const router = useRouter()
    const id = router.query.id
    const disabled = (new Cookies()).get('adm_token') !== undefined
    const [dark, setDark] = useState(false)
    const [mediumContainer, setMediumContainer] = useState({})
    const [selectStyle, setSelectStyle] = useState({})
    const [smallContainer, setSmallContainer] = useState({})

    useEffect(() => {
        setDark(cookies.get('theme') === '0')
        setMediumContainer({width: '49%', backgroundColor: !dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'})
        setSelectStyle({
            width: '32%',
            backgroundColor: !dark ? '#f7f8fa' : '#272e38',
            marginBottom: '2vh'
        })
        setSmallContainer({width: '32%', backgroundColor: !dark ? '#f7f8fa' : '#272e38', marginBottom: '2vh'})
    }, [])

    async function fetchData(path, params) {
        let response = null
        try {
            await axios({
                method: 'get',
                url: Host() + path,
                headers: {'authorization': cookies.get('jwt')},
                params: params
            }).then(res => {
                response = res.data
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }

        return response
    }

    async function saveChanges(path, params, method) {
        let response = false
        try {
            await axios({
                method: method,
                url: Host() + path,
                headers: {'authorization': cookies.get('jwt')},
                data: params
            }).then(() => {
                response = true
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        return response
    }

    return (
        <Layout>
            {props =>
                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        type: dark ? "dark" : "light"
                    }
                })}>
                    <props.getTitle pageName={'Person'} pageTitle={'Person'} pageInfo={'INFORMATION'}/>
                    <div>
                        <Profile
                            dark={dark}
                            disabled={disabled}
                            id={id}
                            fetchData={fetchData}
                            saveChanges={saveChanges}
                            mediumContainer={mediumContainer}
                            smallContainer={smallContainer}
                            selectStyle={selectStyle}
                        />
                    </div>
                </ThemeProvider>
            }
        </Layout>


    )
}