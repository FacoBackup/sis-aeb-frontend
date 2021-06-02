import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import Cookies from "universal-cookie/lib";
import ActivityFilterComponent from "../components/modules/filters/ActivityFilters";
import fetchActivityData from "../utils/fetch/FetchActivity";
import HeaderLayout from "../components/layout/HeaderLayout";
import FiltersComponent from "../components/layout/FiltersComponent";
import TabContent from "../components/templates/TabContent";
import ActivityOverview from "../components/templates/ActivityOverview";

export default function activity() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({
        method: null,
        startDate: null,
        endDate: null,
        thisMachine: false,
        searchInput: ''
    })

    const [changed, setChanged] = useState(false)

    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [dark, setDark] = useState(false)
    const [pagesFetched, setPagesFetched] = useState(0)
    const [openTab, setOpenTab] = useState(0)

    function handleChange(props) {

        setFilters(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function fetch(type) {
        fetchActivityData({
            type: type,
            setLastFetchedSize: setLastFetchedSize,
            setData: setData,
            data: data,
            setMaxID: setMaxID,
            maxID: maxID,
            setError: setError,
            setErrorMessage: setErrorMessage,
            thisMachine: filters.thisMachine,
            startDate: filters.startDate,
            endDate: filters.endDate,
            method: filters.method,
            path: filters.searchInput.length > 0 ? filters.searchInput : null,
            setPagesFetched: setPagesFetched,
            pagesFetched: pagesFetched
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        if (data.length === 0)
            fetch(0)
        setDark((new Cookies()).get('theme') === 0)


        const currentLocale = (new Cookies()).get('lang')

        if (currentLocale !== undefined && currentLocale !== router.locale) {
            router.push('/activity', '/activity', {locale: currentLocale}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])

    if (lang !== null)
        return (
            <div>
                <HeaderLayout
                    width={'65%'}
                    filterComponent={
                        <ActivityFilterComponent
                            lang={lang} filters={filters} handleChange={handleChange}
                            dark={dark} changed={changed}
                            setChanged={setChanged} fetch={fetch}

                            setResponseData={setData}
                            setLastFetchedSize={setLastFetchedSize}
                            setMaxID={setMaxID} setPagesFetched={setPagesFetched}

                        />
                    }
                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}
                    activeFiltersComponent={
                        <FiltersComponent
                            active={changed}
                            handleChange={handleChange}
                            applyChanges={() => {
                                setChanged(false)
                                fetch(1)
                            }}
                            setChanged={setChanged}
                            changed={changed}
                            activeFilters={[
                                {
                                    key: 'method',
                                    value: filters.method !== undefined ? filters.method : null
                                },
                                {
                                    key: 'startDate',
                                    value: filters.startDate !== null && filters.startDate ? lang.startDate + ' - ' + new Date(filters.startDate).toLocaleDateString() : null
                                },
                                {
                                    key: 'endDate',
                                    value: filters.endDate !== null && filters.endDate ? lang.endDate + ' - ' + new Date(filters.endDate).toLocaleDateString() : null
                                },
                                {
                                    key: 'searchInput',
                                    value: filters.searchInput.length > 0 ? filters.searchInput : null,
                                    type: 'text'
                                },
                                {
                                    key: 'thisMachine',
                                    value: filters.thisMachine ? lang.machine : null
                                },
                            ]}/>}
                    searchComponent={
                        undefined
                        // <SearchBox searchInput={filters.searchInput} setSearchInput={event => handleObjectChange({
                        //     event: {
                        //         name: 'searchInput',
                        //         value: event
                        //     }, setData: setFilters
                        // })} searchLocale={lang.search} setChanged={setChanged}/>
                    }
                    availableTabs={{
                        openTab: openTab,
                        setOpenTab: setOpenTab,
                        tabs: [
                            {key: 0, value: 'Overview'},
                            {key: 1, value: 'Advanced'}
                        ]
                    }}
                />
                <div style={{width: '65%', position: 'relative', margin: 'auto'}}>
                    <TabContent
                        openTab={openTab}
                        noContainer={true}
                        tabs={[
                            {
                                buttonKey: 0,
                                value: (
                                    <ActivityOverview/>
                                )
                            },
                            {
                                buttonKey: 1,
                                value: (
                                    'cafe 2'
                                )
                            }
                        ]}
                    />
                </div>
            </div>
        )
    else
        return null
}

