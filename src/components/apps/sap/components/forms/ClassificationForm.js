import React, {useState} from "react";
import {FormRow, Selector, TextField} from "sis-aeb-core";
import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import EntitiesPT from "../../locales/EntitiesPT";
import TypeForm from "./TypeForm";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/shared/hooks/useQuery";
import getQuery from "../../queries/getQuery";

export default function ClassificationForm(props) {

    const lang = EntitiesPT
    const formHook = useDataWithDraft({
        initialData: props.data,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })
    const typeHook = useQuery(getQuery('type'))

    return (
        <Form
            hook={formHook}
            initialData={props.data}
            create={props.create} title={props.create ? lang.newClassification : lang.classification}
            dependencies={
                [
                    {name: 'classification', type: 'string'},
                    {name: 'type', type: 'object'},
                ]} noAutoHeight={!props.asDefault}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                ProjectRequests.submitClassification({
                    pk: data.id,
                    data: data,

                    create: props.create
                }).then(res => {
                    if (props.create && res) {
                        props.returnToMain()
                        clearState()
                    }
                })}
            handleClose={() => props.returnToMain()}>
            {(data, handleChange) => (
                <FormRow>


                    <TextField
                        placeholder={lang.classification} label={lang.classification}
                        handleChange={event => {

                            handleChange({
                                event: event.target.value,
                                key: 'classification'
                            })
                        }} value={data.classification}
                        required={true}
                        width={'calc(50% - 16px'}/>
                    <Selector
                        hook={typeHook}
                        placeholder={'Tipo'}
                        title={'Tipo'}
                        handleChange={e => handleChange({event: e, key: 'type'})}
                        value={data.type} width={'calc(50% - 16px)'} required={true}
                        keys={associativeKeys.type}
                    />

                </FormRow>
            )}
        </Form>
    )

}

ClassificationForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
