import React, {useState} from "react";
import PropTypes from 'prop-types'
import {DropDownField, TextField} from "sis-aeb-inputs";
import {Alert} from "sis-aeb-misc";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EntityLayout from "../shared/misc/form/EntityLayout";
import Selector from "../shared/misc/selector/Selector";
import WorkPlanPT from "../../packages/locales/WorkPlanPT";
import submitWorkPlan from "../../utils/submit/SubmitWorkPlan";


export default function WorkPlanForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = WorkPlanPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })

    return (
        <div style={{width: '100%'}}>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title}
                dependencies={{
                    fields: [
                        {name: 'responsible', type: 'string'},
                        {name: 'object', type: 'string'},
                        {name: 'additive', type: 'number'},
                        {name: 'ted', type: 'number'}
                    ],
                    changed: changed
                }} noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() =>
                    submitWorkPlan({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)

                        if (!props.create && res)
                            setChanged(false)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.responsible} label={lang.responsible}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'responsible', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.responsible}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.apostille}
                                label={lang.apostille}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'apostille', value: event})
                                }} value={props.data === null ? null : props.data.apostille} required={true}
                                width={'calc(50% - 16px)'} choices={lang.apostilleOptions}/>


                            <TextField

                                placeholder={lang.object} label={lang.object}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'object', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.object}
                                required={true} variant={'area'}
                                width={'100%'}/>
                        </>

                    )
                }]}/>
        </div>
    )

}

WorkPlanForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}
