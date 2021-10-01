import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import Operation from "../entities/Operation";
import OperationRequests from "../../utils/requests/OperationRequests";

export default function OperationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>
            {!open ? null :

                    <Operation
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}
                         workPlan={props.workPlan}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} stage={props.stage}
                    />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={[

                        {key: 'phase', type: 'number',label: 'Fase'},
                        {key: 'initial_situation', type: 'string', label: 'Situação inicial'},
                        {key: 'indicator_planned', type: 'string', label: 'indicador planejado'},
                        {key: 'detailing', type: 'string', label: 'detalhamento da fase'},
                        {key: 'estimated_cost', type: 'number', maskStart:'R$ ',label:  'custo estimado'}

                    ]}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteOperation({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                     title={'Fases / operações'}
                    fetchParams={props.stage !== null && props.stage !== undefined ? {
                        stage: props.stage.id
                    } : {
                        work_plan: props.workPlan.id
                    }}
                />
            </div>
        </>
    )
}
OperationList.propTypes = {
    stage: PropTypes.object,
    workPlan: PropTypes.object
}