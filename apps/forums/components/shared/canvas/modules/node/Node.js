import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Node.module.css";

import NodeContextMenu from "./NodeContextMenu";
import NodeTemplate from "../../templates/NodeTemplate";
import NodeMenu from "./NodeMenu";
import NodePropsTemplate from "../../templates/NodePropsTemplate";



export default function Node(props) {
    const ref = useRef()
    const [linkable, setLinkable] = useState(false)

    useEffect(() => {
        if (props.toBeLinked !== null && props.toBeLinked.id !== props.node.id) {
            let el

            props.links.map(link => {
                if (link.child.id === props.node.id && props.toBeLinked.id === link.parent.id || link.parent.id === props.node.id && props.toBeLinked.id === link.child.id)
                    el = false
            })
            setLinkable(el)
        } else
            setLinkable(undefined)
    }, [props.toBeLinked])
    return (
        <div
            id={props.node.id + '-node'}
            onMouseDown={event => {
                if (event.button === 0 && props.toBeLinked !== null && props.toBeLinked.id !== props.node.id)
                    props.handleLink(props.node.id, undefined)
                if (typeof event === 'object' && event.button === 0 && typeof event.target.className !== 'object' && (props.toBeLinked === null || props.node.id !== props.toBeLinked.id)) {
                    props.setSelected(props.node.id)
                    props.move({
                        node: props.node,
                        event: event
                    })
                }
            }}
            onDoubleClick={() => {
                props.openOverview()
            }}
            onContextMenu={e => {
                if (props.toBeLinked === null)
                    props.setOpenContext(
                        <NodeContextMenu
                            handleClose={() => props.setOpenContext(null, null, null)}
                            entity={props.node}
                            handleDelete={() => props.handleDelete(props.index, props.node.id)}
                            show={props.openOverview}
                            handleLink={type => props.handleLink(props.node.id, type)}
                        />,
                        (e.clientX),
                        (e.clientY - ref.current.offsetHeight)
                    )
            }}
            className={[styles.entityContainer, props.node.shape === 'circle' ? styles.circleContainer : ''].join(' ')}
            style={{
                cursor: props.selected === props.node.id && props.toBeLinked === null ? 'move' : linkable === false ? 'unset' : "pointer",
                opacity: linkable === false ? '.5' : '1',
                left: props.node.placement.x + 'px',
                top: props.node.placement.y + 'px',
                minWidth: props.node.shape === 'circle' ? 'unset' : '230px',
                background: props.node.shape === 'circle' ? props.node.color : undefined
            }} ref={ref}
        >
            <NodeMenu selected={props.selected} node={props.node} nodeRef={ref.current} linkable={linkable}/>
            <div
                className={props.node.shape === 'circle' ? styles.headerCircle : styles.header}
                style={{color: props.node.shape === 'circle' ? 'white' : undefined}}>
                {props.node.title}
                <div className={styles.colorIndicator} style={{
                    display: props.node.shape === 'circle' ? 'none' : undefined,
                    background: props.node.color
                }}/>
            </div>
            <div className={styles.body} style={{display: props.node.shape === 'circle' ? 'none' : undefined}}>
                {props.node.description}
            </div>

        </div>

    )
}

Node.propTypes = NodePropsTemplate