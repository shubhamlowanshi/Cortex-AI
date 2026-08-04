import { Paperclip, Mic, Send, Zap, MessageSquare, Code2, FileText, ImageIcon, Globe, ImagesIcon, Presentation } from 'lucide-react'
import React, { useState } from 'react'
import sendMessage from '../features/sendMessage'
import { useSelector } from 'react-redux'
import { addMessages } from '../redux/messageSlice'
import { useDispatch } from 'react-redux'
import { createConversation}  from '../features/createConversation'
import { addConversation, setConvTitle, setselectedConversation, } from '../redux/conversationSlice'
import { setArtifacts } from '../redux/messageSlice'
import { updateConversation } from '../features/updateConversation'
const ChatInput = () => {

    const [value, setValue] = useState('')
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)
    const [selectedAgent, setSelectedAgent] = useState("auto")

    const dispatch = useDispatch()

   const handelSendMessage = async () => {
    let conversation = selectedConversation
    if (!conversation) {
        const conv = await createConversation()
        dispatch(setselectedConversation(conv))
        dispatch(addConversation(conv))
        conversation = conv
    }
    if (conversation.title == "New Chat") {
        await updateConversation({ id: conversation?._id, title: value.trim() })
        dispatch(setConvTitle({ conversationId: conversation._id, title: value.slice(0, 40) }))
    }

    const payload = {
        prompt: value.trim(),
        conversationId: conversation?._id,
        agent: selectedAgent.toLowerCase()
    }
    dispatch(addMessages({ role: "user", content: value.trim() }))
    setValue('')

    try {
        const data = await sendMessage(payload)
        dispatch(setArtifacts(data?.artifacts || []))
        dispatch(addMessages({ role: "assistant", content:data.answer, images:data.images }))
        console.log(data)
    } catch (err) {
        console.error("sendMessage failed:", err)
        dispatch(addMessages({ role: "assistant", content: "Something went wrong. Please try again." }))
    }
}


    const agents = [
        {
            id: "auto",
            icon: Zap,
            label: "auto"
        },
        {
            id: "chat",
            icon: MessageSquare,
            label: "chat"
        },
        {
            id: "coding",
            icon: Code2,
            label: "coding"
        },
        {
            id: "FileText",
            icon: FileText,
            label: "pdf"
        },
        {
            id: "ppt",
            icon: Presentation,
            label: "PPt"

        },
        {
            id: "vision",
            icon: ImageIcon,
            label: "Vision"
        },
        {
            id: "search",
            icon: Globe,
            label: "Search"
        }
    ]


    return (
        <div className='w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]'>
            <div className='flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3 ' >

                <div className='flex w-[80%] gap-2 pr-2 flex-wrap '>
                    {
                        agents.map((agent) => {
                            const isActive = selectedAgent === agent.label
                            const Icon = agent.icon
                            return (
                                <div 
                                key={agent.id}
                                onClick={()=>setSelectedAgent(agent.label)}
                                className={`flex-shrink-0 cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border  transition-all
                            ${isActive
                                        ?
                                        "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]  "
                                        :
                                        "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07] "
                                    } `}>
                                    <Icon
                                        size={14}
                                        className={
                                            isActive
                                                ?
                                                "text-white" 
                                                :
                                                "text-slate-500"
                                        }
                                    />
                                    {agent.label}

                                </div>
                            )
                        })
                    }
                </div>

                <textarea
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Ask Anything'
                    value={value}
                    rows={3}
                    className='w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&:: -webkit-scrollbar]:hidden disabled:opacity-50 '
                />
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <button className='flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer'>
                            <Paperclip size={16} />
                        </button>
                        <button className='flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer'>
                            <Mic size={16} />
                        </button>
                    </div>

                    <button
                        onClick={handelSendMessage}
                        disabled={!value}
                        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 cursor-pointer ${value.trim()
                            ? "bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white"
                            : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
                            }`}>
                        <Send size={15} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ChatInput