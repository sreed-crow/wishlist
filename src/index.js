import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/index.css"
import App from './components/App';

import { Group } from './model/Group';

import { onSnapshot, getSnapshot } from "mobx-state-tree"
import { toJS } from "mobx"


// let initialState = { users: {} }

// let group = Group.create()
// console.log('snapshot1', getSnapshot(group))

// // group_temp.load()
// console.log("🚀 ~ file: index.js:14 ~ group_temp:", toJS(group))

let initialState = {
  users: {
      a342: {
          id: "a342",
          name: "Homer",
          gender: "m"
      },
      "5fc2": {
          id: "5fc2",
          name: "Marge",
          gender: "f"
      },
      "663b": {
          id: "663b",
          name: "Bart",
          gender: "m"
      },
      "65aa": {
          id: "65aa",
          name: "Maggie",
          gender: "f"
      },
      ba32: {
          id: "ba32",
          name: "Lisa",
          gender: "f"
      }
  }
}
let group = Group.create(initialState)

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
  root.render(
    <App group={group} />
    );
  }

  renderApp()

  ///this is assigning stuff to local storage so that 
  // changes to the UI don't get lost on reload-- just makes
  // dev easier.
  // let initialState = {
  //   items: [
  //       {
  //           name: "LEGO Mindstorms EV3",
  //           price: 349.95,
  //           image: "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
  //       },
  //       {
  //           name: "Miracles - C.S. Lewis",
  //           price: 12.91,
  //           image:
  //               "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg"
  //       }
  //   ]
  // }
  
  // if (localStorage.getItem("wishlistapp")) {
  //   const json = JSON.parse(localStorage.getItem("wishlistapp"))
  //   if (WishList.is(json)) initialState = json
  // }
  
  // let wishList = WishList.create(initialState)
  
  // onSnapshot(wishList, snapshot => {
  //   localStorage.setItem("wishlistapp", JSON.stringify(snapshot))
  // })

//THis is hot loading but is dependent on webpack, and is not 
// currently working. Not sure what webpack is.
if (module.hot) {
  module.hot.accept(["./components/App"], () => {
      // new components
      renderApp()
  })

  module.hot.accept(["./model/Group"], () => {
      // new model definitions
      const snapshot = getSnapshot(group)
      group = window.group = Group.create(snapshot)
      renderApp()
  })
}
// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1)
// }, 1000)