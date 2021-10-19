import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";

import ActivityStageForm from "../forms/ActivityStageForm";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";


export default function ActivityList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('activity', undefined, [{
        key: 'goal',
        sub_key: 'work_plan',
        value: props.workPlan.id,
        type: 'object'
    }]))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <ActivityStageForm
                    handleClose={() => {
                        setOpen(false)
                        setCurrentEntity(null)
                        hook.clean()
                    }} workPlan={props.workPlan}
                    open={open}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                />
            </div>
            <List
                createOption={true}
                hook={hook}
                keys={workPlanKeys.activity}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'activity',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]} onCreate={() => {
                setOpen(true)
            }}
                onRowClick={e => setCurrentEntity(e)}
                title={'Etapas'}

            />
        </Switcher>
    )
}
ActivityList.propTypes = {
    workPlan: PropTypes.object
}