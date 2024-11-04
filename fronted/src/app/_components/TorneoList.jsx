import React from 'react'
import TorneoItem from './TorneoItem'

function TorneoList({ torneoList }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-semibold text-center mb-10 text-gray-900">
        Torneos
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {torneoList.map((torneo) => (
          <TorneoItem key={torneo.id} torneo={torneo} />
        ))}
      </div>
    </div>
  );
}
  
export default TorneoList;