import React, {useState} from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie/lib";
import EntitiesPT from "../../locales/EntitiesPT";
import {TextField, useQuery} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../utils/getQuery";
import Selector from "../../../../core/inputs/selector/Selector";
import submit from "../../utils/submit";
import Host from "../../utils/host";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function UnitForm(props) {
    const lang = EntitiesPT
    const unitHook = useQuery(getQuery('unit'))

    return (
        <FormTemplate
            keys={associativeKeys.responsible}
            endpoint={'unit'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newUnit : lang.unit}
            returnButton={true}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'unit',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={'Nome'} label={'Nome'}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'name'
                            })
                        }} value={data.name}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <TextField
                        placeholder={lang.acronym} label={lang.acronym}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'acronym'
                            })
                        }} value={data.acronym}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <Selector
                        hook={unitHook} keys={associativeKeys.responsible}
                        width={'calc(33.333% - 21.5px'}

                        value={data.responsible}
                        title={'Responsável'}
                        placeholder={'Responsável'}
                        handleChange={entity => handleChange({key: 'responsible', event: entity})}
                        createOption={true}
                    >
                        {handleClose => (
                            <UnitForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                        )}
                    </Selector>
                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

UnitForm.propTypes = {
    data: PropTypes.object,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
}
