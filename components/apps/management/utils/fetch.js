import Requester from "../../../core/feedback/requester/Requester";
import Host from "./shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

export async function fetchEntry(props){
    let response = null
    await Requester({
        method: 'get',
        url: Host(props.prefix)+ props.suffix,
        headers: {'authorization': (new Cookies()).get('jwt')},
        package: {
            identifier: props.pk
        }
    }).then(res => {
        response = res.data
    }).catch(e => {
        console.log(e)
    })
    return response
}


fetchEntry.propTypes={
    pk: PropTypes.any,
    suffix: PropTypes.string,
    prefix: PropTypes.string
}