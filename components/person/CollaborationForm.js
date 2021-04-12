import styles from "../../styles/components/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../shared/layout/InputLayout";
import PropTypes from "prop-types";
import saveComponentChanges from "../../utils/person/SaveChanges";
import fetchComponentData from "../../utils/person/FetchData";
import {router} from "next/client";

export default function CollaborationForm(props) {

    const [unitID, setUnitID] = useState(null)
    const [units, setUnits] = useState([])
    const [effectiveRoles, setEffectiveRoles] = useState([])
    const [commissionedRoles, setCommissionedRoles] = useState([])
    const [effectiveRoleID, setEffectiveRoleID] = useState(null)
    const [commissionedRoleID, setCommissionedRoleID] = useState(null)

    const [seniorID, setSeniorID] = useState(null)
    const [seniors, setSeniors] = useState([])
    const [publicationDate, setPublicationDate] = useState('')
    const [admissionDate, setAdmissionDate] = useState('')
    const [legalDocument, setLegalDocument] = useState('')
    const [activeRole, setActiveRole] = useState(null)
    const [substitute, setSubstitute] = useState(null)
    const [origin, setOrigin] = useState(null)
    const [changed, setChanged] = useState(false)
    const [workStart, setWorkStart] = useState(null)
    const [workEnd, setWorkEnd] = useState(null)
    const [contractExp, setContractExp] = useState(null)
    const [additionalInfo, setAdditionalInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mainCollaboration, setMainCollaboration] = useState(false)
    const [canBeMain, setCanBeMain] = useState(false)
    const [accessProfiles, setAccessProfiles] = useState([])
    const [accessProfileID, setAccessProfileID] = useState(null)

    function disabled() {
        return (
            unitID === null ||
            publicationDate.length === 0 ||
            admissionDate.length === 0 ||
            legalDocument.length === 0 ||
            substitute === null ||
            activeRole === null ||
            (seniors.length > 0 && seniorID === null) ||
            changed === false
        )
    }

    useEffect(() => {
            if (props.collaborationID !== null) {
                fetchComponentData({
                    path: 'collaboration/' + props.collaborationID,
                    params: {}
                }).then(res => {
                        if (res !== null) {
                            setSeniorID(res.senior !== null ? res.senior.id : null)
                            setEffectiveRoleID(res.effective_role !== null ? res.effective_role.id : null)
                            setCommissionedRoleID(res.commissioned_role !== null ? res.commissioned_role.id : null)
                            setUnitID(res.unit.id)
                            setSubstitute(res.collaboration.is_substitute)
                            setAdmissionDate(res.collaboration.admission_date)
                            setPublicationDate(res.collaboration.official_publication_date)
                            setLegalDocument(res.collaboration.legal_document)
                            setOrigin(res.collaboration.origin)
                            setActiveRole(res.collaboration.is_active_on_role)
                            setWorkStart(res.collaboration.work_shift_start)
                            setWorkEnd(res.collaboration.work_shift_end)
                            setContractExp(res.collaboration.contract_expiration)
                            setAdditionalInfo(res.collaboration.additional_information)
                            setMainCollaboration(res.collaboration.main_collaboration)
                            setAccessProfileID(res.access_profile.id)

                            fetchComponentData({
                                path: 'main/collaboration/' + props.userID,
                                params: {}
                            }).then(res => {
                                    if (res !== null)
                                        setCanBeMain(res)
                                }
                            )

                            fetchComponentData({path: 'seniors/' + res.unit.id + '/' + props.userID, params: {}}).then(res => {
                                if (res !== null)
                                    setSeniors(res)
                            })
                            fetchComponentData({path: 'roles/effective', params: {}}).then(res => {
                                setEffectiveRoles(res)
                            })

                            fetchComponentData({path: 'roles/commissioned', params: {}}).then(res => {
                                if (res !== null)
                                    setCommissionedRoles(res)
                            })

                            fetchComponentData({path: 'units', params: {}}).then(res => {
                                if (res !== null)
                                    setUnits(res)
                            })
                            fetchComponentData({path: 'accesses', params: {}}).then(res => {
                                if (res !== null)
                                    setAccessProfiles(res)
                            })

                            setLoading(false)
                        }
                        console.log(res)
                    }
                )
            } else {
                fetchComponentData({
                    path: 'main/collaboration/' + props.userID,
                    params: {}
                }).then(res => {
                        if (res !== null)
                            setMainCollaboration(res)
                    }
                )

                fetchComponentData({path: 'roles/effective', params: {}}).then(res => {
                    if (res !== null)
                        setEffectiveRoles(res)
                })

                fetchComponentData({path: 'roles/commissioned', params: {}}).then(res => {
                    if (res !== null)
                        setCommissionedRoles(res)
                })

                fetchComponentData({path: 'units', params: {}}).then(res => {
                    if (res !== null)
                        setUnits(res)
                })
                fetchComponentData({path: 'accesses', params: {}}).then(res => {
                    if (res !== null)
                        setAccessProfiles(res)
                })

                setLoading(false)
            }
        },
        []
    )

    async function saveChanges() {
        await saveComponentChanges({
            path: props.collaborationID !== null ? 'collaboration/' + props.collaborationID : 'collaboration',
            params: {
                person: props.userID,
                senior: seniorID,
                effective_role: effectiveRoleID,
                commissioned_role: commissionedRoleID,
                unit: unitID,
                is_substitute: substitute,
                official_publication_date: typeof (publicationDate) === "number" ? publicationDate : publicationDate.getTime(),
                admission_date: typeof (admissionDate) === "number" ? admissionDate : admissionDate.getTime(),
                legal_document: legalDocument,
                origin: origin,
                is_active_on_role: activeRole !== null ? activeRole : false,
                work_shift_start: workStart,
                work_shift_end: workEnd,
                contract_expiration: typeof (contractExp) === "number" ? contractExp : contractExp.getTime(),
                additional_information: additionalInfo,
                main_collaboration: canBeMain ? mainCollaboration : false
            },
            method: props.collaborationID === null ? 'post' : 'put'
        }).then(res => {
            if (res)
                setChanged(false)
        })
    }

    function mapToSelect(option) {
        let response = []
        switch (option) {
            case 0: {

                units.map(data => {
                    response.push({
                        key: data.unit.id,
                        value: data.unit.acronym
                    })
                })
                break
            } // unit
            case 1: {
                effectiveRoles.map(data => {
                    response.push({
                        key: data.role.id,
                        value: data.role.denomination + ' - ' + data.linkage.denomination
                    })
                })
                break
            } // effective
            case 2: {
                commissionedRoles.map(data => {
                    response.push({
                        key: data.role.id,
                        value: data.role.das ? 'DAS - ' : 'FCPE - ' + data.role.denomination + ' - ' + data.linkage.denomination
                    })
                })
                break
            } // commissioned
            case 3: {
                seniors.map(senior => {
                    response.push({
                        key: senior.id,
                        value: senior.person.name
                    })
                })
                break
            } // SENIORS
            case 4: {
                accessProfiles.map(data => {
                    response.push({
                        key: data.id,
                        value: data.denomination
                    })
                })
                break
            }
            default: {
                break
            }
        }
        return response
    }

    if (!loading)
        return (
            <div className={styles.form_component_container} style={{width: '93%'}}>
                <InputLayout inputName={'Unit'} dark={props.dark} handleChange={setUnitID} inputType={1}
                             disabled={!props.editable} size={32} required={true} initialValue={unitID}
                             selectFields={mapToSelect(0)} key={'2-1'} setChanged={setChanged}/>


                <InputLayout inputName={'Active Role'} dark={props.dark} handleChange={setActiveRole} inputType={1}
                             disabled={!props.editable} size={32} required={true}
                             initialValue={activeRole}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-2'}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Main Collaboration'} dark={props.dark} handleChange={setMainCollaboration}
                             inputType={1}
                             disabled={!props.editable || !canBeMain} size={32} required={true}
                             initialValue={mainCollaboration}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-3'}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Effective Role' || commissionedRoles.length === 0} dark={props.dark}
                             handleChange={setEffectiveRoleID}
                             inputType={1}
                             disabled={!props.editable} size={49} required={false}
                             initialValue={effectiveRoleID}
                             selectFields={mapToSelect(1)} key={'2-4'} setChanged={setChanged}/>

                <InputLayout inputName={'Commissioned Role'} dark={props.dark} handleChange={setCommissionedRoleID}
                             inputType={1}
                             disabled={!props.editable || commissionedRoles.length === 0} size={49} required={false}
                             initialValue={commissionedRoleID}
                             selectFields={mapToSelect(2)} key={'2-5'} setChanged={setChanged}/>
                <InputLayout inputName={'Substitute'} dark={props.dark} handleChange={setSubstitute} inputType={1}
                             disabled={!props.editable} size={32} required={true} initialValue={substitute}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-6'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Senior'} dark={props.dark} handleChange={setSeniorID} inputType={1}
                             disabled={!props.editable || seniors.length === 0} size={32} required={false}
                             initialValue={seniorID}
                             selectFields={mapToSelect(3)} key={'2-7'} setChanged={setChanged}/>

                <InputLayout inputName={'Admission'} dark={props.dark} handleChange={setAdmissionDate} inputType={2}
                             disabled={!props.editable} size={32} required={true} initialValue={admissionDate}
                             key={'2-8'} setChanged={setChanged}/>

                <InputLayout inputName={'Official Publication'} dark={props.dark} handleChange={setPublicationDate}
                             inputType={2}
                             disabled={!props.editable} size={32} required={true} initialValue={publicationDate}
                             key={'2-9'} setChanged={setChanged}/>

                <InputLayout inputName={'Contract Expiration'} dark={props.dark} handleChange={setContractExp}
                             inputType={2}
                             disabled={!props.editable} size={32} required={false} initialValue={contractExp}
                             key={'2-10'} setChanged={setChanged}/>
                <InputLayout inputName={'Legal Document'} dark={props.dark} handleChange={setLegalDocument}
                             inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={legalDocument}
                             key={'2-11'} setChanged={setChanged}/>

                <InputLayout inputName={'Work shift start'} dark={props.dark} handleChange={setWorkStart}
                             inputType={3}
                             disabled={!props.editable} size={49} required={false} initialValue={workStart}
                             key={'2-12'} setChanged={setChanged}/>

                <InputLayout inputName={'Work shift end'} dark={props.dark} handleChange={setWorkEnd}
                             inputType={3}
                             disabled={!props.editable} size={49} required={false} initialValue={workEnd}
                             key={'2-13'} setChanged={setChanged}/>
                <InputLayout inputName={'Access Profile'} dark={props.dark} handleChange={setAdditionalInfo}
                             inputType={2} selectFields={mapToSelect(4)}
                             disabled={!props.editable} size={49} required={false} initialValue={additionalInfo}
                             key={'2-15'} setChanged={setChanged}/>
                <InputLayout inputName={'Additional information'} dark={props.dark} handleChange={setAdditionalInfo}
                             inputType={0}
                             disabled={!props.editable} size={49} required={false} initialValue={additionalInfo}
                             key={'2-15'} setChanged={setChanged}/>

                <Button style={{
                    width: '43vw', margin: '2vh auto',
                    backgroundColor: disabled() ? null : '#39adf6',
                    color: disabled() ? null : 'white'
                }} variant={'contained'} disableElevation
                        disabled={disabled()}
                        onClick={() => saveChanges()}>Save</Button>
            </div>
        )
    else
        return null

}
CollaborationForm.propTypes = {
    collaborationID: PropTypes.any,
    userID: PropTypes.string,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
}