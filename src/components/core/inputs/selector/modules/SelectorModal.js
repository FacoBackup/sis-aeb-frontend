import styles from '../styles/SelectorModal.module.css'
import {AddRounded, ClearAllRounded, FilterListRounded} from "@material-ui/icons";
import React, {useState} from "react";
import Modal from "../../../misc/modal/Modal";
import PropTypes from "prop-types";
import Row from "./Row";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import EmptyListIndicator from "../../../shared/components/EmptyListIndicator";
import ToolTip from "../../../misc/tooltip/ToolTip";
import Dropdown from "../../../list/components/list/Dropdown";
import useList from "../../../list/hook/useList";
import useHeader from "../../../list/hook/useHeader";
import ListFilter from "../../../shared/components/ListFilter";

export default function SelectorModal(props) {
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)
    const [openFilters, setOpenFilters] = useState(false)
    const {keys, keysDispatcher, actions} = useList(props.keys, true)
    const {
        getType,
        parseDate,
        open,
        setOpen,
        selectedField,
        setSelectedField,
        getField
    } = useHeader(props.dispatch, props.actions)


    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={'slide-right'}
            blurIntensity={0}
            wrapperClassName={styles.wrapper}
        >
            <div className={styles.header}>
                {props.title}

            </div>
            <div className={styles.headerButtons}>
                <button onClick={() => props.onCreate()}
                        style={{display: props.createOption ? undefined : 'none'}}
                        className={styles.headerButton}
                >
                    <AddRounded/>
                    Criar
                    <ToolTip content={'Criar novo'}/>
                </button>

                <Dropdown
                    align={'end'}
                    buttonClassname={styles.headerButton}
                    label={(
                        <>
                            <FilterListRounded/>
                            Filtros
                            <ToolTip content={'Filtros'}/>
                        </>
                    )}
                    buttons={props.keys.map(e => getField(e))}/>

                <button onClick={() => props.handleChange(null)}
                        className={styles.headerButton}
                        disabled={!props.value}>
                    <ClearAllRounded/>
                    Limpar selecionado
                    <ToolTip content={'Limpar'}/>
                </button>

            </div>

            <ListFilter
                keys={props.keys} filters={props.hook.filters} setFilters={props.hook.setFilters}
                cleanState={props.hook.clean} getType={getType} open={open} setOpen={setOpen}
                parseDate={parseDate} selectedField={selectedField} setSelectedField={setSelectedField}
            />

            <Row
                emptyIndicator={true}
                data={props.value}
                keys={props.keys}
                onDrop={index => {
                    if (!isNaN(index)) {
                        props.handleChange(props.hook.data[index].data)
                        props.setOpen(false)
                    }
                }}
            />

            <div className={styles.divider}/>


            <div className={styles.rows}>
                {props.hook.data.length === 0 ? <EmptyListIndicator/> : props.hook.data.map((e, i) => (
                    <React.Fragment key={e.id + '-selector-modal-row-' + i}>
                        <Row
                            disabled={false} emptyIndicator={false}
                            onClick={() => {
                                props.handleChange(e.data)
                                props.setOpen(false)
                            }}
                            keys={props.keys}
                            reference={i === (props.hook.data.length - 1) ? lastElementRef : undefined}
                            data={e.data} index={i}
                            identificationKey={props.identificationKey}
                        />
                    </React.Fragment>
                ))}
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {
    data: PropTypes.array,
    keys: PropTypes.array,
    createOption: PropTypes.bool,

    open: PropTypes.bool,
    setOpen: PropTypes.func,

    cleanState: PropTypes.func,
    value: PropTypes.object,
    handleChange: PropTypes.func,

    title: PropTypes.string,
    hook: PropTypes.object,
    identificationKey: PropTypes.string,
    onCreate: PropTypes.func
}
