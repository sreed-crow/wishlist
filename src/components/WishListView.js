import WishListItemView from "./WishlistItemView";
import { observer } from "mobx-react";
import { WishListItemEntry } from "./WishListItemEntry";

const WishListView = ({wishList, readonly}) => {    

    return (
    <div className="list">
        <ul>
            {wishList.items.map((item, idx) => (
                <WishListItemView key={idx} item={item} readonly={readonly} />
            ))}
        </ul>
        Total: {wishList.totalPrice} €{!readonly && <WishListItemEntry wishList={wishList} />}
    </div>
)
            }

export default observer(WishListView);