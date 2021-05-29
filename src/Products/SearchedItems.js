import React from 'react'
import { useSelector } from 'react-redux'

export default function SearchedItems() {
    const SearchedItems = useSelector(state=>state.searchQuery)
    const{searchQuery,loadingSearch,errorSearch} = SearchedItems
console.log(searchQuery)
    return (
        <>
        {loadingSearch?(<div>Loading...</div>): errorSearch ?(<div>{errorSearch}</div>):(
            <div>
                 {searchQuery.map(item=>{
                     <div>{item.description}</div>
})}
                 data
            </div>
           
        )}
            Searched 
        </>
    )
}
