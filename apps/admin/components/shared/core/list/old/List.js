import React from "react";
import Fetch from "./methods/Fetch";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import ListPropsTemplate from "../../shared/templates/ListPropsTemplate";
import ListHeader from "./modules/Header";
import Checkbox from "../../shared/components/Checkbox";
import ControlHeader from "./modules/ControlHeader";
import Footer from "./modules/Footer";
import useData from "./hooks/useData";
import useContent from "./hooks/useContent";

export default function List(props) {
    const {
        data, setData,
        maxID, setMaxID,
        searchInput, setSearchInput,
        currentPage, setCurrentPage,
        mountingPoint, maxHeight,
        loading, refresh,
        ref, selected, setSelected,
        sorts, setSorts,
        fetchSize, size,
        hasMore, setHasMore,
    } = useData(props)

    const {content, labels} = useContent({
        ...props,
        data: data,
        currentPage: currentPage,
        loading: loading,
        selected: selected,
        setSelected: setSelected,
        sorts: sorts,
        setSorts: setSorts
    })

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
                <Footer
                    setCurrentPage={setCurrentPage} data={data} currentPage={currentPage} setData={setData}
                    fetchSize={fetchSize} fetchToken={props.fetchToken} maxID={maxID} setMaxID={setMaxID}
                    fetchUrl={props.fetchUrl} searchInput={searchInput} setHasMore={setHasMore} hasMore={hasMore}
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
                            })
                        }}/>
                }
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.labelsContainer}>
                    <Checkbox
                        noSelect={props.noSelect} disabled={size === 0}
                        checked={size === selected.length && size > 0}
                        handleCheck={checked => {
                            if (!isNaN(size) && !checked && size > 0) {
                                let newA = new Array(size)
                                for (let i = 0; i < size; i++)
                                    newA[i] = i

                                setSelected(newA)
                            } else
                                setSelected([])
                        }}
                    />
                    {labels}
                </div>
                {content}
            </div>

        </div>
    )
}
List.propTypes = ListPropsTemplate