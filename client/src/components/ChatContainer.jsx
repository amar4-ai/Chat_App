import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { fomartMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {

 const scrollEnd = useRef();

 useEffect(()=>{
    if(scrollEnd.current){
        scrollEnd.current.scrollIntoView({ behavior: "smooth"})
    }
 },[])



    return selectedUser ? (
        <div className='h-full overflow-y-scroll relative backdrop-blur-lg'>
            {/* ---------------header----------- */}
            <div className='flex items-center gap-3 py-3 px-4 border-b border-stone-500'>
                <img src={assets.profile_martin} alt="" className='w-8 h-8 rounded-full object-cover' />
                <p className='flex-1 text-lg text-white flex items-center gap-2'>
                    Martin Johnson
                    <span className='w-2 h-2 rounded-full bg-green-500'></span>
                </p>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden w-7 cursor-pointer' />
                <img src={assets.help_icon} alt="" className='max-md:hidden w-5' />
            </div>
            
            {/* -------chat area------ */}
            <div className="flex flex-col h-[calc(100%-64px)] overflow-y-scroll p-3 pb-6">
                {messagesDummyData.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 mb-8 ${msg.senderId === '680f50e410f3cd28382ecf9' ? 'justify-end' : 'justify-start'}`}>
                        {msg.senderId !== '680f50e410f3cd28382ecf9' && (
                            <div className='text-center text-xs'>
                                <img src={assets.profile_martin} className='w-7 h-7 rounded-full object-cover' alt="" />
                                <p className='text-gray-500 mt-1'>{msg.createdAt}</p>
                            </div>
                        )}
                        
                        {msg.image ? (
                            <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg mb-0' />
                        ) : (
                            <p className={`p-2 max-w-[200px] text-sm font-light rounded-lg break-words bg-violet-500/30 text-white ${msg.senderId === '680f50e410f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                                {msg.text}
                            </p>
                        )}

                        {msg.senderId === '680f50e410f3cd28382ecf9' && (
                            <div className='text-center text-xs'>
                                <img src={assets.avatar_icon} className='w-7 h-7 rounded-full object-cover' alt="" />
                                <p className='text-gray-500 mt-1'>{fomartMessageTime(msg.createdAt)}</p>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>
         {/* --------bottom area------- */}
<div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
    <div className='flex-1 flex items-center bg-gray-800 px-3 rounded-full'>
        <input 
            type="text" 
            placeholder='Send a message'  
            className='flex-1 text-sm p-3 border-none outline-none bg-transparent  text-white placeholder-gray-400'
        />
        <input 
            type="file" 
            id='image' 
            accept='image/png, image/jpeg' 
            hidden 
        />
        <label htmlFor="image" className='cursor-pointer'>
            <img src={assets.gallery_icon} alt="" className='w-5' />
        </label>
    </div>
    <img 
        src={assets.send_button} 
        alt="" 
        className='w-7 cursor-pointer' 
    />
</div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center h-full gap-2 text-gray-500 bg-white/10 max-md:hidden'>
            <img src={assets.logo_icon} alt="" className='w-16' />
            <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
        </div>
    )
}

export default ChatContainer