import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'

var CryptoJS = require("crypto-js");
export default function HandleDownload(props){
    let newData = {...props.data}
    let newNodes = []
    let dataStr
    let downloadAnchorNode = document.createElement('a');

    newData.nodes.map(node => {
        const element = document.getElementById(node.id+'-node')
        let newNode = {...node}

        if(element !== null) {
            newNode.placement.x = element.offsetLeft
            newNode.placement.y = element.offsetTop
            newNodes.push(newNode)
        }
    })

    newData.dimensions.width = props.root.offsetWidth
    newData.dimensions.height = props.root.offsetHeight

    newData.nodes = newNodes

    if(!props.asJson){
        const ciphertext =  CryptoJS.AES.encrypt(JSON.stringify(newData), 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((').toString();
        dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(ciphertext)
    }
    else
        dataStr = JSON.stringify(newData)

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${props.data.subject}.${props.asJson ? 'json' : 'canvas'}`);
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    // props.handleDownload(dataStr)

}
HandleDownload.propTypes={
    data: PropTypes.object,
    handleDownload: PropTypes.func,
    root: PropTypes.object,
    asJson: PropTypes.bool
}

