import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import List from "../../../../core/visualization/list/List";

import WorkPlanForm from "../forms/WorkPlanForm";
import {DeleteRounded} from "@material-ui/icons";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import projectKeys from "../../keys/projectKeys";
import tedKeys from "../../keys/tedKeys";

export default function WorkPlanList(props) {
    const [open, setOpen] = useState(false)
    const relations = useMemo(() => {
        if (props.workPlan) {
            return {apostille_work_plan: props.workPlan?.id}
        } else if (props.project) {
            return {activity_project: props.project.id}
        } else if (props.ted) {
            return {ted: props.ted.id}
        } else return {}
    }, [props.project, props.ted])
    const hook = useQuery(getQuery('work_plan', relations))

    const keys = useMemo(() => {
        let value = [...workPlanKeys.workPlan]
        if (!props.ted)
            value.push({
                key: 'ted',
                label: 'Instrumento de celebração',
                type: 'object',
                subfieldKey: 'number',
                visible: true,
                query: {...getQuery('ted'), ...{keys: tedKeys.ted}}
            })
        if (!props.project)
            value.push({
                key: 'activity_project',
                label: 'Projeto / atividade',
                type: 'object',
                subfieldKey: 'name',
                visible: true,
                query: {...getQuery('project'), ...{keys: projectKeys.project}}
            })
        return value
    }, [props])

    const apostilleData = useMemo(() => {
        if (props.workPlan) {
            let value = {...props.workPlan}
            delete value.id

            return {...value, work_plan: props.workPlan?.id}
        } else return undefined
    }, [props.workPlan])

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <WorkPlanForm
                handleClose={() => {
                    setOpen(false)
                    hook.clean()
                }}
                workPlan={props.workPlan}
                onRowClick={e => props.redirect(`/sap?page=ted&id=${e.id}`)}
                project={props.project}
                ted={props.ted}
                data={apostilleData}
                create={true}
            />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={keys}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'work_plan',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => props.redirect('sap/?page=wp&id=' + e.id)}
                title={props.workPlan ? 'Planos de trabalho (apostilamentos)' : 'Planos de trabalho'}
            />
        </Switcher>
    )
}
WorkPlanList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object,
    workPlan: PropTypes.object
}