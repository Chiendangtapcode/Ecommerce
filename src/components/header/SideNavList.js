import React from 'react'

const SideNavList = ({ title, listItem }) => {
    return (
        <div>
            <h3 className='text-lg font-titleFont font-semibold mb-1 px-6 text-black'>
                {title}
            </h3>
            <ul className='text-sm'>
                {
                    listItem.map((item) =>
                        item.listData.map((data, i) => (
                            <li key={i} className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                                {data}
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    )
}

export default SideNavList