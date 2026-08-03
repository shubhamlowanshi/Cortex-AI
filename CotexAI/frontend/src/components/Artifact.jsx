import { Code, PanelLeft, PanelRightClose,PanelRightOpen } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Artifact = () => {

  const { artifacts } = useSelector(state => state.message)
  const [collapsed, setCollapsed] = useState(false)


  if (artifacts.length == 0) return;

  return (
    <motion.div

      initial={{ width: 250 }}
      animate={{ width: collapsed ? 48 : 250 }}
      transition={{ duration: 0.24, ease: "easeInOut" }}
      className='hidden lg:flex h-full border border-white/[0.06] flex-1 overflow-hidden shrink-0 w-[250px] '
    >
      {
        !collapsed ?
          <div className='flex flex-col h-full bg-[#0d0f14]'>
            <div className='h-14 px-4 border-4 border-white/[0.06] flex items-center gap-3 shrink-0'>
              <button
                onClick={() => setCollapsed(true)}
                className='flex flex-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
                <PanelRightClose size={16} className='' />
              </button>

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className='flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 shrink-0'>
                  <Code className='text-indigo-400 ' size={12} />
                </div>
                <div className='text-[13px] font-medium text-slate-200  truncate'>
                  {artifacts[0]?.title || 'Artifact'}
                </div>
                <div>
                  {artifacts.files}
                </div>

              </div>
            </div>
          </div> :
          <div className='flex flex-col h-full bg-[#0d0f14'>
            <button
              onClick={() => setCollapsed(true)}
              className='flex flex-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
              <PanelRightOpen size={16} className='' />
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-0">
            
              <div className='text-[10px] font-medium text-slate-600 tracking-widest uppercase-nowrap'>
                {artifacts[0]?.title || 'Artifact'}
              </div>
              <div>
                {artifacts[0]?.files }
              </div>

            </div>
          </div>

      }


    </motion.div>
  )
}

export default Artifact