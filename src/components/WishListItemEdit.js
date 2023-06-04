import { observer } from 'mobx-react';

const WishListItemEdit = ({ item }) => {
    function onNameChange(event){
        item.changeName(event.target.value)
    }

    function onPriceChange(event){
        const price = parseFloat(event.target.value)
        if (!isNaN(price)) item.changePrice(price)
    }

    function onImageChange(event){
        item.changeImage(event.target.value)
    }

    return (
        <div className="item-edit">
            Thing: <input value={item.name} onChange={onNameChange} />
            <br />
            Price: <input value={item.price} onChange={onPriceChange} />
            <br />
            Image: <input value={item.image} onChange={onImageChange} />
            <br />
        </div>
    )
}

export default observer(WishListItemEdit);