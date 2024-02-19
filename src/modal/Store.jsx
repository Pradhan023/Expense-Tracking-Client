import { configureStore } from '@reduxjs/toolkit'
import Slicereducer from './Slice'

const Store = configureStore({
    reducer:{
        Trackerdata:Slicereducer
    }
})

export default Store