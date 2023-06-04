import { getSnapshot, onSnapshot, onPatch} from "mobx-state-tree";
import { reaction } from "mobx";
import {WishList, WishListItem } from "./WishList";

it("can create an instance of a model", () => {
    const item = WishListItem.create({
        "name" : "Chronicles of Narnia",
        "price" : 28.73,
        "image" : "https://images-na.ssl-images-amazon.com/images/I/51b5YG6Y1rL._SX331_BO1,204,203,200_.jpg"
    });

    expect(item.price).toBe(28.73);
    item.changeName("Narnia");
    item.changePrice(10);
    expect(item.name).toBe("Narnia");
    expect(item.price).toBe(10);
})

it("can create a wishlist", () => {
    const list = WishList.create({
        items: [{
            "name" : "Chronicles of Narnia",
            "price" : 28.73
        }]
    });
    expect (list.items.length).toBe(1);
    expect (list.items[0].price).toBe(28.73);
})

it("can add new items", () => {
    const list = WishList.create()
    const states = []
    //this records when the snapshot changes, like when 
    // the name is changed below.
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })
    // list.add(WishListItem.create({
    //     "name" : "Chesterton",
    //     "price" : 10
    // }))
    /// shorter way
    list.add(
        {
            "name" : "Chesterton",
            "price" : 10,
        }
    )
    //adding this second entry will cause the toMatchSnapshot to fail
    // list.add(
    //     {
    //         "name" : "Chestertons",
    //         "price" : 15,
    //     }
    // )
    // expect(list.items.length).toBe(2);

    list.items[0].changeName("Book of G.K. Chesterton");
    //this line breaks the tests. Why??
    // list.items[0].changePrice(45);

    // expect(getSnapshot(list)).toEqual({
    //     items: [{
    //         "name" : "Book of G.K. Chesterton",
    //         "price" : 10,
    //         "image" : ""
    //     }]
    // }) 
    // shorter way
    expect(getSnapshot(list)).toMatchSnapshot();
    expect(states).toMatchSnapshot();
});

it("can add new item-2s", () => {
    const list = WishList.create()
    const patches = []
    //this records when the snapshot changes, like when 
    // the name is changed below.
    onPatch(list, patch => {
        patches.push(patch)
    })
    list.add(
        {
            "name" : "Chesterton",
            "price" : 10,
        }
    )
    list.items[0].changeName("Book of G.K. Chesterton");

    expect(patches).toMatchSnapshot();
    
});

it("can calculate the total price of a wishlist", () => {
    const list = WishList.create({
        items: [{
            "name" : "Machine Gun Preacher",
            "price" : 7.35,
            "image" : "https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SY445_.jpg"
        }, {
            "name" : "LEGO Mindstorms EV3",
            "price" : 349.95,
            "image" : "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
        }]
    });

    expect(list.totalPrice).toBe(357.3);
    let changed = 0;
    reaction(() => list.totalPrice, () => changed++);

    expect(changed).toBe(0);
    console.log(list.totalPrice);
    list.items[0].changeName("Test");
    expect(changed).toBe(0);
    list.items[0].changePrice(10);
    expect(changed).toBe(1);
});