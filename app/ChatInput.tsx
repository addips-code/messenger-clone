"use client"
import { FormEvent, useState } from "react"
import { v4 as uuid} from "uuid";
import { Message } from "../typings";


function ChatInput() {
    const[input, setInput] = useState("");

    const addMessage = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(!input) return;

      const messageToSend = input;

      setInput('');

      const id = uuid(); 

      const message: Message = {
        id,
        message: messageToSend,
        created_at: Date.now(),
        username: 'Adeola Adeniji',
        profilePic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?aside=10165787690655179&height=50&width=50&text=167075603&hash=AeQwQHgpc7_UkhQLsdY',
        email: 'adeola002@gmail.com',
      };

      const uploadMessageToUpstash = async () => {
        const res = await fetch('/api/addMessage',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message, 
          }),
        });

        const data = await res.json();
        console.log('Message added >>>>', data)
      };
      uploadMessageToUpstash();
    };

  return (
    <form onSubmit={addMessage} className="
    fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
    >
        <input placeholder="Enter message here.." 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            className=
            "flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button type='submit' 
            disabled = {!input}
            className=
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
            >
            Send
        </button>
    </form>
  )
}

export default ChatInput