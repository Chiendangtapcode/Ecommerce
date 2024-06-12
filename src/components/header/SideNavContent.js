import React from 'react'
import { sideBarList } from '../../constants'
import SideNavList from './SideNavList'

const SideNavContent = () => {
    return (
        <div className='py-3 border-b-[1px] border-b-gray-300'>
             {
                sideBarList.map((item)=>(
                    <SideNavList
                    key={item._id}
                    title={item.title}
                    listItem={item.listItems}/>
                ))        
            }       
        </div>
    )
}

export default SideNavContent