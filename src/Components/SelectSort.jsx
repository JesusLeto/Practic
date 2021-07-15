import React from 'react';

const ParamSort = (setSort, arg) =>{
    console.log(arg)
    const ArrArg = arg.split('_')
    setSort(ArrArg[0],ArrArg[1])
} 

const SelectSort = ({setSort}) => {

    return(
        <select name="SelectSort" className = "SelectSort" onChange = {e => ParamSort(setSort, e.target.value)}>
            <option className = "Default" value = "Default">-------------</option>
            <option className = "SortByDESC" value = "claps_desc">Наиб. хлопков</option>
            <option className = "SortByASC" value = "claps_asc">Наим. хлопков</option>
            <option className = "SortByDateAddNew" value = "createdAt_desc">Самые новые</option>
            <option className = "SortByDateAddOld" value = "createdAt_asc" >Самые старые</option>
            <option className = "SortByDateUpdateNew" value = "updatedAt_desc">Последние изменения</option>
            <option className = "SortByDateUpdateOld" value = "updatedAt_asc">Старые измения</option>
        </select>
    )
}

export default SelectSort