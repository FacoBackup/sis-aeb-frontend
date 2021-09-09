import React, {useEffect, useRef, useState} from "react";
import Fetch from "./methods/Fetch";
import Loader from "./modules/Loader";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import ListPropsTemplate from "../shared/ListPropsTemplate";
import ListHeader from "./modules/Header";
import ListLabels from "./modules/ListLabels";
import Checkbox from "./modules/Checkbox";
import ControlHeader from "./modules/ControlHeader";
import Content from "./modules/Content";
import Footer from "./modules/Footer";
import EmptyListIndicator from "./modules/EmptyListIndicator";
import useData from "./hooks/useData";

export default function List(props) {
    const {
        data, setData,
        maxID, setMaxID,
        searchInput, setSearchInput,
        currentPage, setCurrentPage,
        mountingPoint, maxHeight,
        loading, refresh, getLength,
        ref, selected, setSelected,
        sorts, setSorts,
        fetchSize, size,
        hasMore, setHasMore,
    } = useData(props)

    return (
        <div
            className={styles.container} ref={ref}
            style={{height: maxHeight + 'px'}}
        >

            <ContextMenu mountingPoint={mountingPoint} data={data} options={props.options}/>
            <div className={styles.header}>
                <ListHeader
                    title={props.title}
                />
                <ControlHeader
                    controlOptions={props.controlOptions} disabled={selected.length === 0} data={data}
                    selected={selected} createOption={props.createOption} listTitle={props.title}
                    refresh={refresh} setEntity={props.setEntity} clickEvent={props.clickEvent}
                />

                {props.noSearchBar || props.searchFieldName === undefined ? null :
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        applySearch={() => {
                            Fetch({
                                setData: setData,
                                data: [],
                                setHasMore: setHasMore,
                                fetchSize: props.fetchSize,
                                maxID: null,
                                searchInput: searchInput.length === 0 ? null : searchInput,
                                setMaxID: setMaxID,
                                fetchToken: props.fetchToken,
                                fetchUrl: props.fetchUrl,
                                params: props.fetchParams,
                                searchFieldName: props.searchFieldName
                            }).then(() => getLength())
                        }}/>
                }
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.labelsContainer}>
                    <Checkbox
                        noSelect={props.noSelect}
                        checked={size === selected.length && size > 0}
                        handleCheck={checked => {
                            getLength()
                            if (!isNaN(size) && !checked && size > 0) {
                                let newA = new Array(size)
                                for (let i = 0; i < size; i++)
                                    newA[i] = i

                                setSelected(newA)
                            } else
                                setSelected([])
                        }}
                    />
                    {props.labels.map((l, i) => (
                        <React.Fragment key={'list-labels-' + i + '-' + l}>
                            <ListLabels sorts={sorts} setSorts={setSorts} data={data} index={i} label={l}
                                        fields={props.fields}/>
                        </React.Fragment>
                    ))}
                </div>
                {loading ?
                    <>
                        <Loader/>
                        <Loader/>
                        <Loader/>
                    </>
                    :
                    (data[0] !== undefined && data[0].length > 0 ?
                            <Content
                                data={data} setData={setData} setSelected={setSelected} sorts={sorts}
                                selected={selected} noSelect={props.noSelect} pageData={data[currentPage]}

                                fields={props.fields} clickEvent={props.clickEvent} setEntity={props.setEntity}
                            />
                            :
                            <EmptyListIndicator/>


                    )}
            </div>
            <Footer
                setCurrentPage={setCurrentPage} data={data} currentPage={currentPage} setData={setData}
                fetchSize={fetchSize} fetchToken={props.fetchToken} maxID={maxID} setMaxID={setMaxID}
                setSize={() => getLength()}
                fetchUrl={props.fetchUrl} searchInput={searchInput} setHasMore={setHasMore} hasMore={hasMore}
            />
        </div>
    )
}
List.propTypes = ListPropsTemplate