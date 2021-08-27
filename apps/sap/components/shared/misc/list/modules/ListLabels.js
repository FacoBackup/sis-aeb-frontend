import PropTypes from 'prop-types'
import styles from "../styles/List.module.css";
import React, {useState} from "react";
import {ArrowDownwardRounded, ArrowDropDownRounded} from "@material-ui/icons";

export default function ListLabels(props) {
    const [open, setOpen] = useState(false)
    const [sortStatus, setSortStatus] = useState(undefined)
    const updateSort = (newSort) => {
        let n = [...props.sorts]
        n[props.index].type = newSort

        props.setSorts(n)
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: ((100 / props.fields.length) + (props.fields[props.index].extraSize !== undefined ? props.fields[props.index].extraSize : 0)) + '%'
        }}>
            <button className={styles.label}
                    disabled={props.fields[props.index].type === 'object'}
                    onClick={() => {
                        setOpen(!open)
                        switch (props.sorts[props.index].type) {
                            case undefined: {
                                setSortStatus('descending')
                                updateSort('descending')
                                break
                            }
                            case 'descending': {
                                setSortStatus('ascending')
                                updateSort('ascending')
                                break
                            }
                            case 'ascending': {
                                setSortStatus('descending')
                                updateSort('descending')
                                break
                            }
                            default:
                                break
                        }

                    }}>
                <div className={styles.labelContent}>
                    {props.label}
                </div>
                <ArrowDownwardRounded style={{
                    transform: sortStatus === 'ascending' ? 'rotate(180deg)' : undefined,
                    transition: '150ms linear',
                    fontSize: '1rem',
                    visibility: props.fields[props.index].type === 'object' || sortStatus === undefined ? 'hidden' : 'visible',
                    opacity: props.fields[props.index].type === 'object' || sortStatus === undefined ? '0' : '1'
                }}/>
            </button>
        </div>
    )
}

ListLabels.propTypes = {
    sorts: PropTypes.array,
    setSorts: PropTypes.func,
    data: PropTypes.array,
    fields: PropTypes.array,
    index: PropTypes.number,
    label: PropTypes.any
}