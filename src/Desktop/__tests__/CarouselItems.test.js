import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import { CarouselItems } from '../CarouselItems';
import store from '../../store';


describe("carousel item descktop view",()=>{
    test("should render infinite scroll",()=>{
        const div = document.createElement("div")
        const product = {
            id: 1,
            src: "",
            product_name: "airforce",
            price: "2134",
            discout: "500",
            likes: "45",
            shop: "Annies`",
            location: "Maseno",
          };
          ReactDOM.render(
              <React.StrictMode>
                  <Provider store={store}>
                      <BrowserRouter> 
                      <CarouselItems product={product} />
                      </BrowserRouter>
                  </Provider>
              </React.StrictMode>,
              div
          )
    })
})