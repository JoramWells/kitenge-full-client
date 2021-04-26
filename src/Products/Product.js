import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { categoryProduct } from '../_actions/productActions'

export default function Product(props) {
    const dispatch = useDispatch()

    console.log(props.match.params.category)
    useEffect(() => {
        dispatch(categoryProduct(props.match.params.category))
        return () => {
            
        }
    }, [])
    return (
        <div>
            
        </div>
    )
}
