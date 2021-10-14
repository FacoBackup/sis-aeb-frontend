import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ExecutionPT from "../../locales/ExecutionPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {DateField, FormRow, Selector, TextField} from "sis-aeb-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import workPlanKeys from "../../keys/workPlanKeys";
import useQuery from "../../../../core/shared/hooks/useQuery";
import getQuery from "../../queries/getQuery";

export default function ExecutionForm(props) {

    const lang = ExecutionPT
    const [initialData, setInitialData] = useState(props.data)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })
    const operationHook = useQuery(getQuery('operation_phase'))

    useEffect(() => {
        if (props.create) {
            const date = new Date()
            setInitialData({
                ...props.data,
                ...{
                    infrastructure: props.infrastructure.id,
                    operation_phase: props.operation,
                    execution_date: (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
                }
            })
        }
    }, [])


    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newExecution : lang.execution}
            dependencies={
                [
                    {key: 'current_execution', type: 'number'},
                    {key: 'operation_phase', type: 'object'},
                    {key: 'committed', type: 'number'},
                    {key: 'liquidated', type: 'number'},
                    {key: 'paid', type: 'number'},
                    {key: 'description', type: 'string'},
                    {key: 'difficulties', type: 'string'},
                    {key: 'measures_taken', type: 'string'},
                    {key: 'execution_date', type: 'date'},
                ]

            }
            returnButton={props.create}
            handleSubmit={(data, clearState) =>
                OperationRequests.submitExecution({
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res) {
                        props.returnToMain()
                        clearState()
                    }

                })
            }
            handleClose={() => props.returnToMain()}>
            {(data, handleChange) => (
                <FormRow>


                    <TextField
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }}
                        value={data.description}
                        required={true} variant={'area'}
                        width={'100%'}
                    />
                    <TextField

                        placeholder={lang.difficulties} label={lang.difficulties}
                        handleChange={event => {

                            handleChange({key: 'difficulties', event: event.target.value})
                        }}
                        value={data.difficulties}
                        required={true} variant={'area'}
                        width={'100%'}/>
                    <TextField

                        placeholder={lang.measures} label={lang.measures}
                        handleChange={event => {

                            handleChange({key: 'measures_taken', event: event.target.value})
                        }}
                        value={data.measures_taken}
                        required={true} variant={'area'}
                        width={'100%'}/>

                    <Selector
                        hook={operationHook}
                        placeholder={'Fase / operação'}
                        title={'Fase / operação'}
                        handleChange={e => handleChange({event: e, key: 'operation_phase'})}
                        value={data.operation_phase} width={'calc(33.333% - 21.5px)'} required={true}
                        keys={workPlanKeys.operation}
                    />
                    <TextField

                        placeholder={lang.currentExecution} label={lang.currentExecution}
                        handleChange={event => {

                            handleChange({key: 'difficulties', event: event.target.value})
                            handleChange({key: 'current_execution', event: event.target.value})
                        }}
                        value={data.current_execution}
                        required={true} type={'number'}
                        width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>


                    <TextField
                        placeholder={lang.committed} label={lang.committed} maskStart={'R$'} currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'committed', event: event.target.value})
                        }} value={data.committed}
                        required={true} type={'number'}
                        width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.liquidated} label={lang.liquidated} maskStart={'R$'}
                        currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'liquidated', event: event.target.value})
                        }} value={data.liquidated}
                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.paid} label={lang.paid} maskStart={'R$'} currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'paid', event: event.target.value})
                        }} value={data.paid}
                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                    <DateField
                        placeholder={lang.executionDate} label={lang.executionDate}
                        handleChange={event => {

                            handleChange({key: 'execution_date', event: event})
                        }}
                        value={
                            data.execution_date
                        }
                        required={true} width={'100%'}/>
                </FormRow>
            )}
        </Form>
    )

}

ExecutionForm.propTypes = {
    workPlan: PropTypes.object,
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
