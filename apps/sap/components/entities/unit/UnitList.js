import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";

import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Host from "../../../utils/shared/Host";
import List from "../../shared/misc/list/List";
import UnitForm from "./UnitForm";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import ProjectRequests from "../../../utils/requests/ProjectRequests";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()

    return (
        <>
            <input
                accept={'.json'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    let reader = new FileReader();
                    reader.onload = e => {
                        let data = JSON.parse(e.target.result)
                        data.id = undefined

                        ProjectRequests.submitUnit({
                            data: data,
                            create: true
                        }).then(res => {
                            if (res)
                                setRefreshed(false)
                        })
                        ref.current.value = ''

                    };
                    reader.readAsText(file.target.files[0]);
                }}
                multiple={false}
            />
            {!open ? null :
                <UnitForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })} asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                />
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'unit'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/unit'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                let downloadAnchorNode = document.createElement('a');
                                const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `unidades - ${new Date().toLocaleDateString()}.json`);
                                document.body.appendChild(downloadAnchorNode)
                                downloadAnchorNode.click()
                                downloadAnchorNode.remove()
                            }
                        },
                        {
                            label: 'Importar multiplos',
                            icon: <CloudUploadRounded/>,
                            onClick: (d) => {
                            },
                            disabled: true
                        },
                        {
                            label: 'Importar',
                            icon: <PublishRounded/>,
                            onClick: (d) => {
                                ref.current.click()
                            },
                            disabled: false
                        },
                    ]}
                    fields={[
                        {name: 'name', type: 'string'},
                        {name: 'acronym', type: 'string'}
                    ]} labels={['nome', 'Acrônimo']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Unidades / Responsáveis'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}