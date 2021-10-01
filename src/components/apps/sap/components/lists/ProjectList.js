import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import {List, useQuery} from "sis-aeb-core";
import ProjectForm from "../forms/ProjectForm";
import {ArrowForwardRounded, DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function ProjectList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    const hook = useQuery({
        url: Host() + 'list/project',
        headers: {'authorization': new Cookies().get('jwt')},
        parsePackage: pack => {
            return pack
        },
        fetchSize: 15,
        identificationKey: 'id',
    })

    return (
        <>
            {!open ? null :
                <ProjectForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }} redirect={props.redirect}

                    create={true}
                    data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    hook={hook}
                    keys={[
                        {key: 'name', type: 'string', label: 'Nome'},
                        {key: 'description', type: 'string', label: 'Descrição'},
                        {key: 'estimated_value', type: 'number', maskStart: 'R$ ', label: 'Valor estimado'},
                        {key: 'type', type: 'string', capitalize: true, label: 'Tipo'}
                    ]}
                    title={'Projetos / Atividades'}
                    controlButtons={[
                        {
                            label: 'Abrir',
                            icon: <ArrowForwardRounded/>,
                            onClick: (entity) => {
                                props.redirect(entity.id)
                            },
                            disabled: false
                        },
                        {
                            label: 'Deletar',
                            icon: <DeleteRounded/>,
                            onClick: (entity) => {
                                ProjectRequests.deleteProject({
                                    pk: entity.id
                                }).then(() => hook.clean())
                            },
                            disabled: false,
                            color: '#ff5555'
                        }
                    ]}
                    onRowClick={(entity) => props.redirect(entity.id)}
                />
            </div>
        </>
    )
}
ProjectList.propTypes = {
    redirect: PropTypes.func
}