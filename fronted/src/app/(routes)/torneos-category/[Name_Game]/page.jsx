import React from 'react'
import GlobalApi from '@/app/_utils/GlobalApi';
import TopCategoryList from '../_components/TopCategoryList'
import TorneoList from '@/app/_components/TorneoList';

async function TorneosCategory({ params }) {

  const {Name_Game} = await params

  const categoryList=await GlobalApi.getCategories();

  const torneoList=await GlobalApi.getTorneosByCategory(Name_Game);

  return (
    <div className="w-full">
      <div className="w-full bg-primary py-4 mb-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary-foreground text-center">{Name_Game}</h2>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <TopCategoryList categoryList={categoryList} />
        <TorneoList torneoList={torneoList}/>
      </div>
    </div>
  )
}
export default TorneosCategory
