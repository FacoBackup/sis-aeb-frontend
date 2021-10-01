import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import ObjectiveForm from "../forms/ObjectiveForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function ObjectivesList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    


    return (
        <div style={{width: '100%'}}>
            {!open ? null :
                <ObjectiveForm
                    returnToMain={() => {
                        setOpen(false)
                    }}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} project={props.project}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={[
                        {key: 'description', type: 'string', label: 'Descrição'},
                        {key: 'deadline', type: 'date', label: 'Prazo final'},
                        {
                            key: 'status',
                            type: 'string',
                            getColor: field => {
                                let res = undefined
                                switch (field) {
                                    case 'A iniciar': {
                                        res = '#A300F5'
                                        break
                                    }
                                    case 'Em andamento': {
                                        res = '#00F400'
                                        break
                                    }
                                    case 'Pausado': {
                                        res = '#FFBA3E'
                                        break
                                    }
                                    case 'Atrasado': {
                                        res = '#ff5555'
                                        break
                                    }
                                    case 'Finalizado': {
                                        res = '#0095ff'
                                        break
                                    }
                                    default:
                                        break
                                }
                                return res
                            },
                            label: 'Status'
                        }
                    ]}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteObjective({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    title={'Marcos do projeto'}
                    onRowClick={e => setCurrentEntity(e)}
                    fetchParams={{
                        project: props.project.id
                    }}
                />
            </div>
        </div>
    )
}
ObjectivesList.propTypes = {
    project: PropTypes.object
}