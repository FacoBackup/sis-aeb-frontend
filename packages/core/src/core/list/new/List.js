import PropTypes from 'prop-types'
import TableLayout from "./components/table/TableLayout";
import styles from './styles/List.module.css'
import ListHeader from "./components/list/ListHeader";
import React, {useEffect, useRef, useState} from "react";
import useQuery from "./hook/useQuery";
import EmptyListIndicator from "../../shared/EmptyListIndicator";


export default function List(props) {
    const hook = useQuery(props.identificationKey, props.url, props.headers, props.parsePackage)
    const listRef = useRef()
    const wrapperRef = useRef()
    const [maxHeight, setMaxHeight] = useState()

    useEffect(() => {
        setMaxHeight((document.documentElement.offsetHeight - wrapperRef.current.getBoundingClientRect().top - 16) + 'px')
    }, [])


    return (
        <div className={styles.container}>
            <ListHeader
                title={props.title}
                setFilters={hook.setFilters}
                filters={hook.filters}
                cleanState={hook.clean}
                keys={props.keys}
            />
            <div className={styles.tableWrapper} ref={wrapperRef}
                 style={{height: hook.data.length === 0 ? maxHeight : undefined, maxHeight: maxHeight}}>
                {hook.data.length === 0 ?
                    <EmptyListIndicator/>
                    :
                    null}

                <TableLayout
                    data={hook.data} keys={props.keys} controlButtons={props.controlButtons}
                    setCurrentPage={hook.setCurrentPage} currentPage={hook.currentPage} refresh={hook.refresh}
                    onRowClick={props.onRowClick} listRef={listRef} hasMore={hook.hasMore} loading={hook.loading}
                />
            </div>
        </div>
    )
}

List.propTypes = {
    useList: PropTypes.object.isRequired,
    settings: PropTypes.shape({
        showFilters: PropTypes.bool,
        showSelect: PropTypes.bool,
        showHeader: PropTypes.bool,
        clickableRow: PropTypes.bool,
        showSettings: PropTypes.bool,
        infiniteScroll: PropTypes.bool
    }),
    onRowClick: PropTypes.func,
    url: PropTypes.string.isRequired,
    headers: PropTypes.object,
    parsePackage: PropTypes.func,
    fetchSize: PropTypes.number,
    initialData: PropTypes.array,

    identificationKey: PropTypes.string.isRequired,

    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired,
    controlButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element,
        label: PropTypes.any,
        onClick: PropTypes.func
    })),
    title: PropTypes.any
}