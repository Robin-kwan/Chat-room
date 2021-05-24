<template>
    <div style="height: 100vh;">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <div v-if="!allowChat">
                <p style="font-size: 3em; font-weight: 600;"> Enter your name </p>
                <input maxlength="14" type="input" class="usernameInput form_field" placeholder="Name" id="name" required />
                <br>
                <button @click="login()" class="btn"> Join </button>
            </div>
            <div v-if="allowChat" style="width: 100%;">
                <p style="font-size: 3em; font-weight: 600;"> Room {{room_id}}</p>
                <div style="justify-content: center; display: flex">
                    <div class="container">
                        <div class="chatbox">
                            <div class="display_message">
                                <div v-for="(message, index) in messages" :key="index" style="display: flex; margin-bottom: 6px;">
                                    <span style="font-weight: 600"> {{message.name}} </span>
                                    <span style="margin-right: 5px; font-weight: 600"> : </span>
                                    <span> {{message.message}} </span>
                                </div>
                            </div>
                            <div class="input_container">
                                <input type="text" class="message_input" id="message" />
                                <button class="btn send" @click="send_message()"> Send </button>
                            </div>
                        </div>
                        <div class="userlist">
                            <div>
                                <p v-for="(user, index) in users" :key="index" class="name"> {{user.name}} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";

const socket = io("http://localhost:5000/", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
})
export default {
    data(){
        return{
            allowChat: false,
            messages: [],
            name: '',
            users: []
        }
    },
    computed:{
        //get room_id based on url path
        room_id(){
            return this.$route.params.id;
        },
    },
    methods:{
        //login to the room (server adds the data into the list)
        login(){
            this.name = document.getElementById("name").value.trim();
            if(this.name !== ''){
                this.allowChat = true;
                socket.emit('join:room', {
                    room: this.room_id,
                    name: this.name
                });
            }
            else{
                alert("Please enter your name")
                document.getElementById("name").value = '';
            }
        },
        //send message
        send_message(){
            if(document.getElementById("message").value){
                socket.emit('message:send', document.getElementById("message").value);
                document.getElementById("message").value = "";
                document.getElementById("message").focus();
            }
        }
    },
    mounted(){
        //get message
        socket.on('message:read', (data) => {
            if (data) {
                this.messages.push(data);
            }
        });
        //get users when someone joins the room
        socket.on('join:room', (data) => {
            this.users = [];
            for(let i = 0; i < data.length; i++){
                if(this.room_id == data[i].room){
                    this.users.push(data[i]);
                }
            }
        })
    },
    created(){
        document.title = "Room "+this.room_id;
    },
    destroyed(){
        //without this, socket disconnection won't trigger if user goes back to the previous page.
        this.$router.go();
    }
}
</script>

<style scoped>
.form_field{
    outline-width: 0;
    padding: 12px;
    border-radius: 10px;
    font-size: 1em;
}
.btn{
    margin: 20px;
    font-size: 1em;
    border-radius: 10px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    transition-duration: 0.4s;
    border: none;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
.btn:hover{
    color: #fff;
    background-color: #555555;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.container{
    display: flex; 
    max-width: 1000px; 
    width: 100%; 
    min-height: 60vh; 
    padding-left: 10vw; 
    padding-right: 10vw;
}
.chatbox{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-radius: 20px;
    background-color: #f2f2f2;
    overflow-y: auto;
    padding: 40px;
    text-align: start;
}
.userlist{
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: start;
    margin-left: 20px;
    width: 200px;
    background-color: #f2f2f2;
    border-radius: 20px;
}
.userlist div{
    padding-left: 30px;
    overflow-y: auto;
    max-height: 550px;
}
.display_message {
    flex-grow: 1;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    overflow: auto;
    max-height: 400px;
}
.input_container{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 5vh;
}
.message_input{
    flex-grow: 1;
    padding: 10px;
    font-size: 1em;
    border-radius: 10px;
    outline-width: 0;
    border: none;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
.send{
    background-color: #fff;
    margin-top: 0;
    margin-bottom: 0;
}
.name{
    font-weight: 600;
}

</style>
