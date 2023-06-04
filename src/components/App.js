
import WishListView from './WishListView';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

function App(props) {

    const [selectedUser, setSelectedUser] = useState()
    const { group } = props
    console.log("🚀 ~ file: App.js:10 ~ App ~ group:", toJS(group))

    let curr_selectedUser = group.users.get(selectedUser)

    function onSelectUser(event){
        setSelectedUser( event.target.value )
    }

    
    
    return (
        <div className="App">
        <header className="App-header">
            <h1 className="App-title">WishList</h1>
        </header>
        <select onChange={onSelectUser}>
            <option>- Select user -</option>
                {/* Array.from converts an iterable to array, so that we can map over it */}
                {Array.from(group.users.values()).map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
        </select>
        <button onClick={group.drawLots}>Draw lots</button>
        {/* {selectedUser && <User user={curr_selectedUser} />} */}
        {selectedUser && <WishListView wishList={curr_selectedUser.wishList} />}
        {selectedUser && <button onClick={curr_selectedUser.getSuggestions}>Suggestions</button>}
    </div>
)
}
const User = observer(({ user }) => (
    <div>
        <WishListView wishList={user.wishList} />
        <button onClick={user.getSuggestions}>Suggestions</button>
        <hr />
        <h2>{user.recipient ? user.recipient.name : ""}</h2>
        {/* {user.recipient && <WishListView wishList={user.recipient.wishList} readonly />} */}
    </div>
))

export default App;
