import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../../packages/locales/InfrastructurePT";
import Form from "../../shared/core/form/Form";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";
import {TextField} from "sis-aeb-core";
import Selector from "../../shared/core/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ActionForm from "../action/ActionForm";
import ClassificationForm from "../classification/ClassificationForm";


export default function ComponentForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = InfrastructurePT
    const [open, setOpen] = useState(false)
    useEffect(() => {
        props.handleChange({name: 'infrastructure', value: props.infrastructure.id})
    }, [])
    return (
        <>

            <Form
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newComponent : lang.component}
                dependencies={{
                    fields: [
                        {name: 'situation', type: 'string'},
                        {name: 'classification', type: 'object'}
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitComponent({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={lang.situation}
                                label={lang.situation}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange(
                                        {name: 'situation', value: event.target.value}
                                    )
                                }} value={props.data === null ? null : props.data.situation}
                                required={true}
                                width={'calc(50% - 16px)'} />
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    props.handleChange({name: 'classification', value: entity})
                                }} label={'Vincular componente'}
                                setChanged={() => null}
                                selected={props.data === null || !props.data.classification ? null : props.data.classification}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {name: 'classification', type: 'string'},
                                    {name: 'type', type: 'string'},
                                ]} required={true}
                                labels={['classificação', 'tipo']}
                                fetchUrl={Host() + 'list/classification'}
                                fetchToken={(new Cookies()).get('jwt')}

                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <ClassificationForm create={true} returnToMain={() => setOpen(false)}/>
                            </Selector>
                        </>
                    )
                }]}/>
        </>
    )

}

ComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object
}
