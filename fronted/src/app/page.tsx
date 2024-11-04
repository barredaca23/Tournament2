import Image from "next/image";
import Categories from './_components/Categories';
import Slider from './_components/Slider';
import GlobalApi from './_utils/GlobalApi';
import TorneoList from './_components/TorneoList'

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  console.log("Lista de sliders en Home:", sliderList); // Aquí ves lo que recibe Home

  const categoryList=await GlobalApi.getCategories();

  const torneoList=await GlobalApi.getAllTorneos();

  return (
    <div className="p-10 px-16 black-background">
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList}/>
      <TorneoList torneoList={torneoList}/>
    </div>
  );
}