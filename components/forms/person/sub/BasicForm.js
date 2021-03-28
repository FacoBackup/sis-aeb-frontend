import styles from '../../../../styles/form/Form.module.css';
import {Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import Cookies from 'universal-cookie/lib';
import {Skeleton} from '@material-ui/lab';
import PropTypes from 'prop-types'

export default class BasicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            changed: false,
            name: null,
            birth: null,
            education: null,
            gender: null,
            marital: null,
            extension: null,
            registration: null,
            corporateEmail: null,
            mother: null,
            father: null,
            disabledPerson: null,
            birthPlace: null,
            pic: null,
            nationality: null,
            admin: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData() {
        const response = await this.props.fetchData('')

        if (response !== null)
            this.setState({
                name: response.name,
                birth: response.birth,
                education: response.education,
                gender: response.gender,
                marital: response.marital_status,
                extension: response.extension,
                registration: response.registration,
                corporateEmail: response.corporate_email,
                father: response.father_name,
                mother: response.mother_name,
                disabledPerson: response.disabled_person,
                birthPlace: response.birth_place,
                pic: response.pic,
                nationality: response.nationality,
                admin: response.is_administrator,
                loading: false
            })
    }

    async saveChanges() {
        const response = await this.props.saveChanges(
            {
                id: this.props.id,
                pic: this.state.pic,
                name: this.state.name,
                birth: this.state.birth,
                birth_place: this.state.birthPlace,
                education: this.state.education,
                gender: this.state.gender,
                marital_status: this.state.marital,
                extension: this.state.extension,
                registration: this.state.registration,
                corporate_email: this.state.corporateEmail,
                father_name: this.state.father,
                mother_name: this.state.mother,
                disabled_person: this.state.disabledPerson,
                nationality: this.state.nationality,
                is_administrator: this.state.admin
            }, '')
        if (response)
            this.setState({changed: false})
    }

    handleDateChange(event) {
        this.setState({
            birth: event.getTime()
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,

        })
        if (!this.state.changed)
            this.setState({
                changed: true
            })
    }

    render() {
        if (!this.state.loading)
            return (
                <>
                    <div className={styles.form_container}
                         style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                        <legend style={{width: '100%'}}>
                            <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
                        </legend>
                        <div className={styles.form_row}>
                            <Button>
                                <Avatar src={this.state.pic} style={{width: '125px', height: '125px'}}/>
                            </Button>
                            <TextField label={'Name'} value={this.state.name} variant={'outlined'}
                                       style={{
                                           width: '50%',
                                           backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38')
                                       }}
                                       onChange={this.handleChange}
                                       name={'name'}
                                       required/>
                            <FormControl variant='outlined' disabled={this.props.disabled}
                                         style={{
                                             ...this.props.selectStyle, ...{
                                                 width: '32%',
                                                 marginLeft: 'auto',
                                                 marginTop: 'auto',
                                                 marginBottom: 'auto'
                                             }
                                         }}>
                                <InputLabel id='disabled-select'>Administrator</InputLabel>
                                <Select
                                    labelId='disabled-select'
                                    id='disabled-select'
                                    value={this.state.admin}
                                    onChange={this.handleChange}
                                    name={'admin'}
                                    label='Administrator'
                                >
                                    <MenuItem value={true}>yes</MenuItem>
                                    <MenuItem value={false}>no</MenuItem>
                                </Select>
                            </FormControl>

                        </div>

                        <TextField label={'Father name'} value={this.state.father} variant={'outlined'}
                                   style={this.props.mediumContainer}
                                   onChange={this.handleChange}
                                   name={'father'}
                                   required/>
                        <TextField label={'Mother name'} value={this.state.mother} variant={'outlined'}
                                   style={this.props.mediumContainer}
                                   onChange={this.handleChange}
                                   name={'mother'}
                                   required/>
                        <TextField label={'Birth place'} value={this.state.birthPlace} variant={'outlined'}
                                   style={this.props.mediumContainer}
                                   onChange={this.handleChange}
                                   name={'birthPlace'}
                                   required/>
                        <TextField label={'Nationality'} value={this.state.nationality} variant={'outlined'}
                                   style={this.props.mediumContainer}
                                   onChange={this.handleChange}
                                   name={'nationality'}
                                   required/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify='space-around'
                                  style={{width: '49%', marginTop: '0vh', marginBottom: 'auto'}}>
                                <KeyboardDatePicker
                                    style={{
                                        width: '100%',
                                        margin: 'auto',
                                        backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38')
                                    }}
                                    inputVariant='outlined'
                                    margin='normal'
                                    id='birth-picker'
                                    disabled={this.props.disabled}
                                    label='Birth'
                                    format='dd/MM/yyyy'
                                    value={this.state.birth == null ? null : (new Date(this.state.birth)).toLocaleDateString()}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <FormControl variant='outlined' disabled={this.props.disabled}
                                     style={{...this.props.selectStyle, ...{width: '49%'}}}>
                            <InputLabel id='disabled-select'>Disabled person</InputLabel>
                            <Select
                                labelId='disabled-select'
                                id='disabled-select'
                                value={this.state.disabledPerson}
                                onChange={this.handleChange}
                                name={'disabledPerson'}
                                label='Disabled person'
                            >
                                <MenuItem value={true}>yes</MenuItem>
                                <MenuItem value={false}>no</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant='outlined' disabled={this.props.disabled}
                                     style={this.props.selectStyle}>
                            <InputLabel id='education-select'>Education</InputLabel>
                            <Select
                                labelId='education-select'
                                id='education-select'
                                value={this.state.education}
                                onChange={this.handleChange}
                                name={'education'}
                                label='Education'
                            >
                                <MenuItem value={null}>None</MenuItem>
                                <MenuItem value={'FUNDAMENTAL'}>Fundamental</MenuItem>
                                <MenuItem value={'MEDIO'}>Medium</MenuItem>
                                <MenuItem value={'MEDIO_COMPLETO'}>MediumCompleto</MenuItem>
                                <MenuItem value={'SUPERIOR'}>Graduated</MenuItem>
                                <MenuItem value={'POS-GRAD'}>Pos graduated</MenuItem>
                                <MenuItem value={'MASTER'}>Master's degree</MenuItem>
                                <MenuItem value={'DOCTOR'}>Doctorate degree</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl variant='outlined' disabled={this.props.disabled}
                                     style={this.props.selectStyle}>
                            <InputLabel id='gender-select'>Gender</InputLabel>
                            <Select
                                labelId='gender-select'
                                id='gender-select'
                                name={'gender'}
                                value={this.state.gender}
                                label='Gender'
                                onChange={this.handleChange}
                            >
                                <MenuItem value={'m'}>Male</MenuItem>
                                <MenuItem value={'f'}>Female</MenuItem>
                                <MenuItem value={'n'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant='outlined' disabled={this.props.disabled}
                                     style={this.props.selectStyle}>
                            <InputLabel id='marital-select'>Marital status</InputLabel>
                            <Select
                                labelId='marital-select'
                                id='marital-select'
                                value={this.state.marital}
                                onChange={this.handleChange}
                                name={'marital'}
                                label='Marital status'
                            >
                                <MenuItem value={'SINGLE'}>Single</MenuItem>
                                <MenuItem value={'DIVORCED'}>Divorced</MenuItem>
                                <MenuItem value={'MARRIED'}>Married</MenuItem>
                                <MenuItem value={'WIDOWED'}>Widowed</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField disabled={this.props.disabled} label={'Corp Email'}
                                   value={this.state.corporateEmail}
                                   name={'corporateEmail'}
                                   onChange={this.handleChange}
                                   variant={'outlined'} style={this.props.smallContainer} required/>
                        <TextField disabled={this.props.disabled} label={'Extension'}
                                   name={'extension'}
                                   onChange={this.handleChange}
                                   value={this.state.extension}
                                   variant={'outlined'} style={this.props.smallContainer} required/>
                        <TextField disabled={this.props.disabled} label={'Registration'}
                                   name={'registration'}
                                   onChange={this.handleChange}
                                   value={this.state.registration}
                                   variant={'outlined'} style={this.props.smallContainer}/>

                        <Button style={{width: '100%'}} disabled={!this.state.changed}
                                onClick={() => this.saveChanges()}>Save</Button>

                    </div>
                </>
            )
        else
            return (
                <div className={styles.form_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
                    </legend>
                    <div className={styles.form_row}>
                        <Skeleton variant='circle' style={{
                            width: '125px',
                            height: '125px',
                            backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                        }}/>
                        <Skeleton variant='rect' style={{
                            borderRadius: '8px',
                            width: '82%',
                            height: '6vh',
                            backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                        }}/>
                    </div>
                    <Skeleton variant='rect' style={{
                        borderRadius: '8px',
                        marginBottom: '2vh',
                        width: '45vw',
                        height: '6vh',
                        backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                    <Skeleton variant='rect' style={{
                        borderRadius: '8px',
                        marginBottom: '2vh',
                        width: '45vw',
                        height: '6vh',
                        backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                </div>
            )
    }
}

BasicForm.propTypes = {
    id: PropTypes.number,
    dark: PropTypes.bool,
    mediumContainer: PropTypes.object,
    smallContainer: PropTypes.object,
    selectStyle: PropTypes.object,
    disabled: PropTypes.bool
}