import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'
import capitalizeFirstLetter from "../shared/CapitalizeFirstLetter";

export default async function submitPerson(props) {
    let formData = new FormData()
    let response = {
        status: false,
        id: undefined
    }

    if (typeof (props.person.image) !== 'string' && props.person.image !== null) {
        formData.append('image', props.person.image)
    } else
        formData.append('removed_image', 'true')
    formData.append('name', props.person.name.toString())
    formData.append('birth', (typeof props.person.birth !== 'number' ? new Date(props.person.birth).getTime() : props.person.birth))
    formData.append('birth_place', props.person.birth_place?.toUpperCase())
    formData.append('education', props.person.education)
    formData.append('gender', props.person.gender)
    formData.append('marital_status', props.person.marital_status)
    if (props.person.father_name !== null && props.person.father_name.length > 0 && props.person.father_name)
        formData.append('father_name', capitalizeFirstLetter(props.person.father_name))
    if (props.person.mother_name !== null && props.person.mother_name.length > 0 && props.person.mother_name)
        formData.append('mother_name', capitalizeFirstLetter(props.person.mother_name))
    formData.append('disabled_person', props.person.disabled_person.toString())
    formData.append('nationality', props.person.nationality?.toUpperCase())

    formData.append('authorization_token', (new Cookies()).get('authorization_token'))

    await axios({
        method: props.create === true ? 'post' : 'put',
        url: props.create ? Host() + 'person' : Host() + 'person/' + props.personID,
        headers: {'authorization': (new Cookies()).get('jwt'), 'content-type': 'multipart/forms-data'},
        data: formData
    }).then(res => {
        response = {
            status: true,
            id: res.data.id
        }
    }).catch(error => {
        props.setStatus({
            error: true,
            message: error.message
        })
        console.log(error)
    })

    return response
}

submitPerson.propTypes = {
    person: PropTypes.object,
    image: PropTypes.object,
    create: PropTypes.bool,
    personID: PropTypes.string,
    setStatus: PropTypes.func
}