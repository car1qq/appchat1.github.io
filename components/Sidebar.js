import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from 'email-validator';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from './Chat';

function Sidebar () {
   const [user] = useAuthState(auth);
   const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
   const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt(
            'Please enter the email for the user you want to chat with'
            );
            if (!input) return null;
            if (EmailValidator.validate(input) && 
            !chatAlreadyExists(input) && 
            input !== user.email
            ) {
                //add chat to db 'chats' collection if it doesnt already exist and is valid
                db.collection("chats").add({
                    users: [user.email, input]
                })
            }
    };

    const chatAlreadyExists = (recipientEmail) => 
           !!chatsSnapshot?.docs.find(
               (chat) => 
               chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );
    


    return (
        <Container>
         <Header>
          <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
          <IconsContainer>
              <IconButton>
                <ChatIcon />  
              </IconButton>
              <IconButton>
             <MoreVertIcon />
             </IconButton>
          </IconsContainer>
         </Header>
         <Search>
          <SearchIcon/>
          <SearchInput placeholder="Search in chats"/>
         </Search>
         <SidebarButton onClick={createChat}>Start A New Chat</SidebarButton>
         {/* List Of Chats */}
         {chatsSnapshot?.docs.map((chat) => (
             <Chat key={chat.id} id={chat.id} users={chat.data().users} />
         ))}
        </Container>
    )
}
export default Sidebar;

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
background-color: #F0F2F5;
border-radius: 5px;
height: 30px;
`

const SidebarButton = styled(Button)`
width: 100%;
&&& {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
}
`

const Container = styled.div`
flex: 0.45;
border-right: 1px solid lightgray;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;

::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;

const Header = styled.div`
display: flex;
position: sticky;
top: 0;
background-color: #F0F2F5;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.8;
}
`;

const IconsContainer = styled.div`
`