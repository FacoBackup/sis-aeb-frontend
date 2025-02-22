import React, {useEffect, useState} from 'react'
import Head from "next/head";
import PropTypes from 'prop-types'
import shared from "../styles/Shared.module.css";
import WorkPlanList from "../components/lists/WorkPlanList";
import OperationList from "../components/lists/OperationList";
import ExecutionList from "../components/lists/ExecutionList";
import ActivityStageList from "../components/lists/ActivityStageList";
import GoalList from "../components/lists/GoalList";
import WorkPlanForm from "../components/forms/WorkPlanForm";
import {fetchEntry} from "../utils/fetchData";
import {Breadcrumbs, Button, Tab, ToolTip, VerticalTabs} from 'mfc-core'
import {CategoryRounded, HomeRounded} from "@material-ui/icons";
import StatusList from "../components/lists/StatusList";
import PermanentGoodsList from "../components/lists/PermanentGoodsList";
import FinancialDisbursementList from "../components/lists/FinancialDisbursementList";

export default function WorkPlan(props) {
    const [workPlan, setWorkPlan] = useState({})

    useEffect(() => {
        if (workPlan.id !== parseInt(props.query.id) && workPlan.id !== undefined) {
            props.refresh()
        }
        else
            fetchEntry({
                pk: props.query.id,
                suffix: 'work_plan'
            }).then(res => setWorkPlan(res))
    }, [props.query])
    const [open, setOpen] = useState(0)

    useEffect(() => {
        const t = props.query.tab
        setOpen(t !== undefined && !isNaN(parseInt(t)) ? parseInt(t) : 0)
    }, [props.query])

    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{workPlan?.object}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>


            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button variant={"minimal-horizontal"}
                        onClick={() => props.redirect('/?page=index')}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <HomeRounded style={{fontSize: '1.1rem'}}/> Início
                </Button>

                <Button variant={'minimal'}
                        onClick={() => props.redirect('/?page=ted&id=' + workPlan?.ted?.id)} className={shared.button}>
                    {workPlan?.ted?.number}
                    <ToolTip>
                        Instrumento de celebração
                    </ToolTip>
                </Button>
                <Button variant={'minimal'}
                        onClick={() => props.redirect('/?page=project&id=' + workPlan.activity_project.id)} className={shared.button}>
                    {workPlan.activity_project?.name}
                    <ToolTip>
                        Projeto
                    </ToolTip>
                </Button>
                <Button highlight={true} variant={'minimal'} className={shared.button}>
                    {workPlan?.object}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {workPlan?.object}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Plano de trabalho
                </div>
            </div>

            <div className={shared.pageContent}>
                <VerticalTabs
                    open={open}
                    setOpen={index => {
                        const url = {pathname: props.pathname, query: {...props.query, tab: index}}
                        props.redirect(url, url, {shallow: true})
                    }}
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <WorkPlanForm data={workPlan}/>
                    </Tab>

                    <Tab label={'Status'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <StatusList workPlan={workPlan}/>
                    </Tab>
                    <Tab label={'Apostilamentos'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <WorkPlanList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Bens permanentes'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <PermanentGoodsList workPlan={workPlan}/>
                    </Tab>
                    <Tab label={'Desembolso financeiro'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <FinancialDisbursementList workPlan={workPlan}/>
                    </Tab>
                    <Tab label={'Metas'} group={'Acesso rápido'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <GoalList workPlan={workPlan}/>
                    </Tab>
                    <Tab label={'Etapas / Atividades'} group={'Acesso rápido'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <ActivityStageList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Fases / operações'} group={'Acesso rápido'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <OperationList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Execuções'} group={'Acesso rápido'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <ExecutionList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                </VerticalTabs>
            </div>
        </div>
    )
}
WorkPlan.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}