import { observer } from 'mobx-react';
import { useState } from 'react';

import WishListItemEdit from './WishListItemEdit';

import { WishListItem } from '../model/WishList';

export const WishListItemEntry = (props) => {

    const [entry, setEntry] = useState(WishListItem.create({
        name: "",
        price: 0
    }))

    const onAdd = () => {
        props.wishList.add(entry)
        setEntry(WishListItem.create({
            name: "",
            price: 0
        }))
    }

    return (
        <div>
            <WishListItemEdit item={entry} />
            <button onClick={onAdd}>Add</button>
        </div>
    )

}