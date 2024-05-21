import React from 'react';

function Footer() {
    return (
        <footer className='bg-gray-700 text-white mt-10'>
            <div className='container mx-auto py-8 flex justify-between'>
                <div className=' md:ml-60 ml-8'>
                    <h1 className='text-xl font-bold'>Flood Data</h1>
                    <p>Copyright © {new Date().getFullYear()} All Rights Reserved</p>
                </div>
                <div className='flex flex-col md:mr-60 mr-8'>
                    <p className=' mb-2 cursor-pointer hover:text-teal-600'>Home</p>
                    <p className=' mb-2 cursor-pointer hover:text-teal-600'>About</p>
                    <p className=' mb-2 cursor-pointer hover:text-teal-600'>Contact</p>
                    <p className=' mb-2 cursor-pointer hover:text-teal-600'>Privacy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
