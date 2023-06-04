import { observer } from 'mobx-react';
import WishListItemEdit from './WishListItemEdit';
import { useState } from 'react';
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree"


function WishListItemView({ item }){

    // console.log('item', getSnapshot(item))
    const [isEditing, setIsEditing] = useState(false);
    const [cloneItem, setCloneItem] = useState();

    function renderEditable() {
        return (
            <li className="item">
                <WishListItemEdit item={item} />
                <button onClick={onSaveEdit}>💾</button>
                <button onClick={onCancelEdit}>❎</button>
            </li>
        )
    }

    function onToggleEdit(){
        setIsEditing(true)
        setCloneItem(getSnapshot(item))
        console.log('intoggle', cloneItem)
    }

    function onCancelEdit(){
        setIsEditing(false)
    }

    function onSaveEdit(){
        applySnapshot(item, getSnapshot(cloneItem))
        setIsEditing(false)
        setCloneItem(null)
    }

    return isEditing ? (
        renderEditable()
    ) : (
        <li className="item">
            {item.image && <img src={item.image} />}
            <h3>{item.name}</h3>
            <span>{item.price}</span>
            <span>
                <button onClick={onToggleEdit}>✏</button>
                <button onClick={item.remove}>❎</button>
            </span>
        </li>
    )
}

export default WishListItemView;