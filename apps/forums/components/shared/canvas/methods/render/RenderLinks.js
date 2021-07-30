import Link from "../../modules/link/Link";
import ReactDOM from "react-dom";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from "prop-types";
import {v4 as uuid4} from 'uuid';

export default function RenderLinks(props) {

    const handleStepCreation = (event, link) => {
        const stepID = uuid4().toString()
        let newLinkA = {
            type: props.data.connectionType,
            parent: link.parent,
            child: {
                id: stepID,
                connectionPoint: 'a',
                nodeShape: 'rect',
                index: props.data.steps.length
            },
        }
        let newLinkB = {
            type: link.type,
            parent: {
                id: stepID,
                connectionPoint: 'c',
                nodeShape: 'rect',
                index: props.data.steps.length
            },
            child: link.child
        }

        
        let newSteps = [...props.data.steps, ...[{
            id: stepID,
            description: '',
            links: [newLinkB, newLinkA],
            placement: {x: event.clientX - props.root.offsetLeft, y: event.clientY - props.root.offsetTop - 80},
            shape: 'rect'
        }]]
        let newLinks = [...props.data.links]
        newLinks.splice(props.data.links.indexOf(link), 1)
        newLinks.push(newLinkB)
        newLinks.push(newLinkA)
        props.setData({
            ...props.data,
            links: newLinks,
            steps: newSteps
        })
    }

    return (
        props.data.links.map((link, index) => (
            <g key={`${link.child.id}-link-${link.parent.id}`}>
                <Link
                    target={link.parent}
                    source={link.child}
                    type={link.type}
                    color={() => {
                        const color = props.data.nodes.find(node => {
                            if (node.id === link.parent.id)
                                return node
                        })
                        if (color !== undefined)
                            return color.color
                        else return undefined
                    }}
                    setSelected={props.setSelectedLink}
                    selectedLink={props.selectedLink}
                    handleChange={event => {
                        let newLink = {...link}
                        newLink[event.name] = event.value
                        let newLinks = [...props.data.links]

                        newLinks[index] = newLink
                        props.setData({...props.data, links: newLinks})
                    }}
                    canEdit={props.options.edit} handleContextClose={props.handleContextClose}
                    rootOffset={props.root} handleStepCreation={event => handleStepCreation(event, link)}
                    openContextMenu={(event, x, y) => {
                        if (event === null) {
                            ReactDOM.unmountComponentAtNode(props.contextMenuRef)

                        } else {
                            ReactDOM.render(
                                event,
                                props.contextMenuRef
                            )

                            props.contextMenuRef.style.top = y + 'px'
                            props.contextMenuRef.style.left = x + 'px'
                        }
                    }}
                    deleteLink={() => {
                        let newLinks = [...props.data.links]
                        const index = newLinks.indexOf(link)
                        let newNodes = [...props.data.nodes]
                        console.log(newNodes)
                        newNodes[link.child.index].links.splice(newNodes[link.child.index].links.find((l, index) => {
                            if (l === link)
                                return index
                        }), 1)
                        newNodes[link.parent.index].links.splice(newNodes[link.parent.index].links.find((l, index) => {
                            if (l === link)
                                return index
                        }), 1)
                        console.log(newNodes)
                        if (index > -1) {
                            newLinks.splice(index, 1)
                            props.setData({
                                ...props.data,
                                links: newLinks,
                                nodes: newNodes
                            })
                        }
                    }}
                    description={link.description}
                />
            </g>
        ))
    )
}
RenderLinks.propTypes = {
    ...CanvasTemplate,
    ...{
        contextMenuRef: PropTypes.object,
        root: PropTypes.object,
        setData: PropTypes.func,
        data: PropTypes.object,
        selectedLink: PropTypes.string,
        setSelectedLink: PropTypes.func,
        handleContextClose: PropTypes.func
    }
}