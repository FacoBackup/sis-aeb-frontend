import PropTypes from 'prop-types'

export default function MoveOverview(props) {
    let moving = true

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    const stickyZone = document.getElementById('canvas-sticky-zone')
    stickyZone.style.display = 'block'



    document.addEventListener('mousemove', event => {
        if (moving)
            move(event, false)
    })
    document.addEventListener("mouseup", event => {
        if (moving) {
            const closest = event.target.closest('.Shapes_stickyZone__2gH6s')
            const frame = document.getElementById('frame')
            if (closest !== null && frame !== null) {
                props.contextMenuRef.style.top = '50px'
                props.contextMenuRef.style.left = 'calc(100vw - 360px)'
                props.contextMenuRef.style.height = (stickyZone.offsetHeight) + 'px'
                props.contextMenuRef.style.height = 'auto'
                props.contextMenuRef.childNodes[0].style.height = 'calc(100vh - ' + (frame.offsetTop + 60) + 'px)'

            }

            document.removeEventListener('mousemove', () => null)
            moving = false
            stickyZone.style.display = 'none'

            move(event, true)
        }
    }, {
        once: true
    });


    function move(event, save) {

        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = props.contextMenuRef.offsetLeft - newPlacement.x;
        let placementY = props.contextMenuRef.offsetTop - newPlacement.y;

        props.contextMenuRef.style.top = placementY + 'px'
        props.contextMenuRef.style.left = placementX + 'px'

        if (save) {
            if (placementX < 0)
                props.contextMenuRef.style.left = '20px'

            if (placementY < 0)
                props.contextMenuRef.style.top = '20px'
        }
    }


    return () => {
        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
    }
}

MoveOverview.propTypes = {
    root: PropTypes.object,
    contextMenuRef: PropTypes.object,
    event: PropTypes.object
}
