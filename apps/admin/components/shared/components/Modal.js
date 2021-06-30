import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
  const [isInRender, setIsInRender] = useState(false)
  const [style, setStyle] = useState('')

  useEffect(() => {
    // console.log(props.open)
    const element = document.getElementById('modal-frame')
    const content = document.getElementById('modal-content')
    const root = document.getElementById(props.rootElementID)

    if (isInRender && !props.open) {
      setStyle(styles.fadeOutAnimation)
    } else if (!isInRender && props.open) {
      setIsInRender(true)
      setStyle(styles.fadeIn)
    }

    if (element !== null) {
      element.addEventListener('animationend', () => {
        if (!props.open && isInRender) {
          setIsInRender(false)
          if (root !== null)
            ReactDOM.unmountComponentAtNode(root);
          setStyle(styles.fadeIn)
        }
        element.removeEventListener('animationend', null)
      });
    }


    if (element !== null && props.open)
      element.addEventListener('mousedown', event => {
        if (content !== null && event.target !== content && !content.contains(event.target))
          props.handleClose(false)
      })
  })

  let element = isInRender ? (
    <div id={'modal-frame'}
         key={'modal-frame'}
         className={style}
         style={{
           ...props.componentStyle,
           ...{
             overflow: 'hidden',
             width: '100vw',
             position: 'fixed',
             background: 'rgba(0, 0, 0, .4)',
             height: '100vh',
             zIndex: 300,
             bottom: 0,

           }
         }}>
      <div className={styles.modalContainer} id={'modal-content'}>
        {props.children}
      </div>
    </div>
  ) : <></>

  if (typeof window !== 'undefined' && process.browser && isInRender) {
    const root = document.getElementById(props.rootElementID)
    if (root !== null) {
      ReactDOM.render(
        element,
        root
      );
    }
  }
  return null
}

Modal.propTypes = {
  componentStyle: PropTypes.object,
  rootElementID: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
}
