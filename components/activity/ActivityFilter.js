import PropTypes from 'prop-types'
import styles from "../../styles/activity/Activity.module.css";
import InputLayout from "../shared/layout/InputLayout";
import {
    Button,
    Checkbox,
    createMuiTheme,
    Divider, FormControl,
    FormControlLabel, FormGroup,
    FormHelperText, FormLabel,
    ThemeProvider
} from "@material-ui/core";
import React from "react";
import fetchActivityData from "../../utils/activity/FetchData";
import mainStyles from '../../styles/shared/Main.module.css'
import shared from '../../styles/shared/Shared.module.css'

export default function ActivityFilterComponent(props) {
    return (
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: "light"
            }
        })}>
            <div className={shared.filterContainer}>
                <div style={{
                    height: '5vh',
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'uppercase'
                }}>{props.lang.filters}</div>
                <InputLayout inputName={props.lang.search} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'path'}
                             disabled={props.disabled} size={90} initialValue={props.filters.path}
                             key={"path"} setChanged={props.setChanged} margin={false}
                />

                <InputLayout inputName={props.lang.startDate} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'startDate'}
                             disabled={props.disabled} size={90} initialValue={props.filters.startDate}
                             key={"start-date"} setChanged={props.setChanged} margin={false}
                />
                <InputLayout inputName={props.lang.endDate} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'endDate'}
                             disabled={props.disabled} size={90} initialValue={props.filters.endDate}
                             key={"end-date"} setChanged={props.setChanged} margin={false}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">{props.lang.method}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={props.filters.method === 'GET'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'GET'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="GET"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={props.filters.method === 'PATCH'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'PATCH'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="PATCH"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={props.filters.method === 'PUT'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'PUT'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="PUT"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={props.filters.method === 'POST'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'POST'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="POST"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={props.filters.method === 'DELETE'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'DELETE'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="DELETE"
                        />
                    </FormGroup>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">{props.lang.machine}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.thisMachine}
                                    onChange={() => {
                                        props.setThisMachine(!props.thisMachine)
                                        props.setChanged(true)
                                        props.setMaxID(null)
                                    }
                                    }
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={'YES'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!props.thisMachine}
                                    onChange={() => {
                                        props.setThisMachine(!props.thisMachine)
                                        props.setChanged(true)
                                        props.setMaxID(null)
                                    }
                                    }
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={'NO'}
                        />
                    </FormGroup>
                </FormControl>

                <div className={mainStyles.displayInlineSpaced} style={{width: '93%'}}>
                    <Button disabled={!props.changed} variant={'contained'} color={'primary'} onClick={() => {
                        props.setChanged(false)
                        fetchActivityData({
                            type: 1,
                            setLastFetchedSize: props.setLastFetchedSize,
                            setData: props.setResponseData,
                            data: props.data,
                            setMaxID: props.setMaxID,
                            maxID: props.maxID,
                            setError: props.setError,
                            setErrorMessage: props.setErrorMessage,
                            thisMachine: props.thisMachine,
                            startDate: props.filters.date,
                            method: props.filters.method,
                            path: props.filters.path,
                        }).catch(error => console.log(error))

                    }}>
                        filter
                    </Button>
                    <Button disabled={!props.changed} variant={'contained'} color={'secondary'} onClick={() => {
                        props.setChanged(false)
                        props.setMaxID(null)
                        props.setLastFetchedSize(null)
                        props.setThisMachine(false)
                        props.handleChange({
                            name: 'method',
                            value: null
                        })
                        props.handleChange({
                            name: 'path',
                            value: ''
                        })
                        props.handleChange({
                            name: 'startDate',
                            value: null
                        })
                        props.handleChange({
                            name: 'endDate',
                            value: null
                        })
                        fetchActivityData({
                            type: 1,
                            setLastFetchedSize: props.setLastFetchedSize,
                            setData: props.setResponseData,
                            data: props.data,
                            setMaxID: props.setMaxID,
                            maxID: props.maxID,
                            setError: props.setError,
                            setErrorMessage: props.setErrorMessage,
                            thisMachine: props.thisMachine,
                            startDate: props.filters.date,
                            method: props.filters.method,
                            path: props.filters.path,
                        }).catch(error => console.log(error))

                    }}>
                        Clear
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    )
}

ActivityFilterComponent.propTypes = {
    changed: PropTypes.bool,
    dark: PropTypes.bool,
    lang: PropTypes.object,
    setChanged: PropTypes.func,
    thisMachine: PropTypes.bool,
    setThisMachine: PropTypes.bool,
    method: PropTypes.string,

    setResponseData: PropTypes.func,
    setLastFetchedSize: PropTypes.func,
    setMaxID: PropTypes.func,
    startDate: PropTypes.string,
    filters: PropTypes.object,
    handleChange: PropTypes.func
}