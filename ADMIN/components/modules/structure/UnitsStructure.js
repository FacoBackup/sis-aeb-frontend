import Canvas from "../../layout/Canvas";
import React, {useEffect, useState} from "react";
import fetchTopUnits from "../../../utils/fetch/FetchTopUnits";

export default function UnitsStructure() {
    const [topUnits, setTopUnits] = useState([])
    useEffect(() => {
        fetchTopUnits().then(res => {
            setTopUnits(res)
        })
    }, [])
    return topUnits.map((unit, index) => (
        <>
            <Canvas dark={false} type={'unit'} subject={unit}/>
        </>
    ))
}
