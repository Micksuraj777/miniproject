import React,{useState} from 'react'
import { Tables } from './table'
import Button from './button';
import { Link } from 'react-router-dom';


function Donor() {
    const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating an API call or action
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Donor Management</h1>
        <Link
          to="/add-donor"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Donor
        </Link>
      </div>
      <section className='max-w-screen-xl mx-auto'>
        <h1>Donor Details</h1>
        <Tables/>
        {/* <div className='w-full justify-center flex pt-6'>
        <Button
          text="Show More"
          onClick={handleClick}
          color="bg-blue-500"
          size="py-2 px-6"
          rounded="rounded-md"
          loading={isLoading}
        />
        </div> */}
        
    {/*       
        <Button
          text="Secondary Button"
          onClick={handleClick}
          color="bg-gray-500"
          size="py-2 px-6"
          rounded="rounded-full"
          icon={<i className="fas fa-check"></i>}
        />
        
        <Button
          text="Disabled Button"
          onClick={handleClick}
          color="bg-red-500"
          size="py-2 px-6"
          rounded="rounded-lg"
          disabled={true}
        /> */}
      </section>
    </div>
  )
}

export default Donor
