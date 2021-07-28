import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../templates/NodeTemplate";
import styles from '../../styles/Node.module.css'
export default function NodeConnection(props) {
    const [canRender, setCanRender] = useState(true)
    useEffect(() => {
        props.node.links.map((entity) => {
            if ((entity.parent.id === props.node.id && entity.parent.connectionPoint === props.connectionPoint) || (entity.child.id === props.node.id && entity.child.connectionPoint === props.connectionPoint)) {
                console.log('REMOVING')
                setCanRender(false)
            }
        })
    })
    const getPlacement = () => {
        const bBox = props.reference.getBBox()
        let response = {}
        switch (props.connectionPoint) {
            case 'a': {
                response = {
                    x: bBox.x + bBox.width / 2,
                    y: bBox.y
                }
                break
            }
            case 'b': {
                response = {
                    x: bBox.x + bBox.width,
                    y: bBox.y + bBox.height / 2
                }
                break
            }
            case 'c': {

                response = {
                    x: bBox.x + bBox.width / 2,
                    y: bBox.y + bBox.height
                }
                break
            }
            case 'd': {
                response = {
                    x: bBox.x,
                    y: bBox.y + bBox.height / 2
                }
                break
            }
            default:
                break
        }
        return response
    }

    if (canRender && props.reference !== undefined && (props.selected === props.node.id || props.linkable)) {
        const placement = getPlacement()
        return (
            // <image
            //     href={'./straight-right-arrow.svg'}
            //        x={placement.x}
            //        y={placement.y} width={'20px'} height={'20px'}/>
            <circle
                onMouseDown={() => props.handleLink(props.node, props.connectionPoint)}
                onMouseUp={() => props.handleLink(props.node, props.connectionPoint)}
                id={props.node.id + '-' + props.connectionPoint}
                cx={placement.x}
                cy={placement.y}
                stroke={'red'}
                r={'5'} className={styles.indicator}
                fill={'red'}
            />
        )
    } else {
        return null
    }
}
NodeConnection.propTypes = {
    node: NodeTemplate,
    reference: PropTypes.object,
    selected: PropTypes.string,
    connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
    handleLink: PropTypes.func
}