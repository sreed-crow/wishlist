import { types, flow, applySnapshot } from "mobx-state-tree"
import { WishList } from "./WishList"

const User = types.model({
    id: types.string,
    name: types.string,
    // gender: types.union(types.literal("m"), types.literal("f"))
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
    //can't do this because it's a circular reference
    //recipient: User
    recipient: types.maybe(types.reference(types.late(() => User)))
    })
    .actions(self => ({
        //the star makes this a "generator function"
        getSuggestions: flow(function* (){
            const response = yield window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
            const suggestions = yield response.json()
            console.log("🚀 ~ file: Group.js:19 ~ getSuggestions:flow ~ suggestions:", suggestions)
            
            self.wishList.items.push(...suggestions)
        })
    }))
    
    export const Group = types.model({
        users: types.map(User)
    })
    .actions(self => ({
        // afterCreate() {
        //     self.load()
        // },
        // load: flow(function* load() {
        //     const response = yield window.fetch(`http://localhost:3001/users`)
        //     // //apply snapshot looks at the current state and the new ////
        //     // // state and tries to make as few updates as possible
        //     applySnapshot(self.users, yield response.json())
        // }),
        drawLots() {
            const allUsers = Array.from(self.users.values())

            // not enough users, bail out
            if (allUsers.length <= 1) return

            // not assigned lots
            let remaining = allUsers.slice()

            allUsers.forEach(user => {
                // edge case: the only person without recipient
                // is the same as the only remaining lot
                // swap lot's with some random other person
                if (remaining.length === 1 && remaining[0] === user) {
                    const swapWith = allUsers[Math.floor(Math.random() * (allUsers.length - 1))]
                    user.recipients = swapWith.recipient
                    swapWith.recipient = self
                } else
                    while (!user.recipient) {
                        // Pick random lot from remaing list
                        let recipientIdx = Math.floor(Math.random() * remaining.length)

                        // If it is not the current user, assign it as recipient
                        // and remove the lot
                        if (remaining[recipientIdx] !== user) {
                            user.recipient = remaining[recipientIdx]
                            remaining.splice(recipientIdx, 1)
                        }
                    }
            })
        }
    }))

    // async getSuggestions() {
    //     const response = await fetch(`http://localhost:3001/suggestions_${self.gender}`)
    //     const suggestions = await response.json()
    //     self.addSuggestions(suggestions)
    // },
    //or this way
    // getSuggestions() {
    //     window
    //         .fetch(`http://localhost:3001/suggestions_${self.gender}`)
    //         .then(response => response.json())
    //         .then(suggestions => {
    //             self.addSuggestions(suggestions)
    //         })
    // },
    //becuse getSuggestions is an async function, we need to use
    //an explicit action to add the suggestions to the wishlist
    // addSuggestions(suggestions) {
    //     self.wishList.items.push(...suggestions)
    // }

// const Woman = types.model({
//     id: types.string,
//     name: types.string,
//     gender: types.literal("f")
// })
// const Man = types.model({
//     id: types.string,
//     name: types.string,
//     gender: types.literal("m")
// })

// const Human = types.union(Man, Woman)
// const someone = Human.create({
//     id: "1",
//     name: "michel",
//     gender: "m"
// })

// console.log(Man.is(someone)) //true
// console.log(Woman.is(someone)) //false


