import React, {useState} from "react";
import PropTypes from "prop-types";
import {Alert} from "sis-aeb-misc";
import {FormLayout, DropDownField, TextField} from "sis-aeb-inputs";
import AccessProfilePT from "../../packages/locales/organizational/AccessProfilePT";


export default function AccessProfileForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = AccessProfilePT
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'bool'},
                        {name: 'can_manage_person', type: 'bool'},
                        {name: 'can_manage_membership', type: 'bool'},
                        {name: 'can_manage_structure', type: 'bool'}
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create:  props.data === null || props.data.id === undefined,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.closeModal()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                dark={true}
                                placeholder={lang.denomination} label={lang.denomination}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'denomination', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.denomination} required={true}
                                width={'100%'}
                            />


                        </>
                    )
                },
                    {
                        title: lang.access,
                        child: (
                            <>
                                <DropDownField
                                    dark={true}
                                    placeholder={lang.person}
                                    label={lang.person}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'can_manage_person', value: event})
                                    }}
                                    locale={props.locale}

                                    value={props.data === null ? null : props.data.can_manage_person} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.options}/>

                                <DropDownField
                                    dark={true}
                                    placeholder={lang.membership}
                                    label={lang.membership}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'can_manage_membership', value: event})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.can_manage_membership} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.options}/>

                                <DropDownField
                                    dark={true}
                                    placeholder={lang.structure}
                                    label={lang.structure}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'can_manage_structure', value: event})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.can_manage_structure} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.options}/>

                            </>
                        )
                    },
                ]}/>
        </>

    )

}

AccessProfileForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    data: PropTypes.object,

    create: PropTypes.bool,
    closeModal: PropTypes.func
}