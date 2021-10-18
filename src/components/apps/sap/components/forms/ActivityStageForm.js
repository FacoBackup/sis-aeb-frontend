import React from "react";
import Form from "../../../../core/inputs/form/Form";
import {FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import GoalPT from "../../locales/GoalPT";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";

export default function ActivityStageForm(props) {
    const lang = GoalPT
    const formHook = useDataWithDraft({
        initialData: props.data,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })
    return (
        <Form
            hook={formHook}
            initialData={props.data}
            create={props.create} title={props.create ? lang.newStage : lang.stage}
            dependencies={
                [
                    {key: 'stage', type: 'string'},
                    {key: 'description', type: 'string'},
                    {key: 'representation', type: 'number'},
                    {key: 'goal', type: 'number'},
                ]
            }
            returnButton={props.create}
            noHeader={!props.create}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'activity',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (res.success && props.create)
                        props.redirect(res.data)
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>

                    <TextField
                        type={'number'}
                        placeholder={lang.stage} label={lang.stage}
                        handleChange={event => {
                            handleChange({key: 'stage', event: event.target.value})
                        }} value={data.stage}
                        required={true}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }} value={data.description}
                        required={true}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.representation} label={lang.representation}
                        handleChange={event => {

                            handleChange({key: 'representation', event: event.target.value})
                        }} currencyMask={true}
                        value={data.representation}
                        required={true} type={'number'}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>
                </FormRow>
            )}
        </Form>
    )

}

ActivityStageForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object
}
