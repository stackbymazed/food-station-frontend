import Hero from "@/components/landing/Hero";
import Offers from "@/components/landing/Offers";
import BookTable from "@/components/landing/BookTable";
import PopularFoods from "@/components/landing/PopularFoods";
import Chefs from "@/components/landing/Chefs";
import VideoSection from "@/components/landing/VideoSection";
import Stats from "@/components/landing/Stats";

export default function Home() {
  return (
    <>
      <Hero/>
      <Offers/>
      <BookTable/>
      <PopularFoods/>
      <Chefs/>
      <VideoSection/>
      <Stats/>
    </>
  );
}