import { PanelLeft, PanelRightClose } from 'lucide-react'
import React from 'react'

const Artifact = () => {
  return (
    <div
    className='hidden lg:flex h-full border border-white/[0.06] flex-ol overflow-hidden shrink-0 w-[250px] '
    >
<div className='flex flex-col h-full bg-[0d0f14]'>
  <div className='h-14 px-4 border-4 border-white/[0.06] flex items-center gap-3 shrink-0'>
    <button className='flex flex-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
    <PanelRightClose  size={16} className='' />
    </button>
  </div>
</div>

    </div>
  )
}

export default Artifact