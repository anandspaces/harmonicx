import { Song } from "../../../types";
import SectionGridSkeleton from "./SectionGridSkeleton";

type SectionGridProps = {
  title:string;
  songs:Song[];
  isLoading:boolean;
}
const SectionGrid = ({songs,title,isLoading}:SectionGridProps) => {
  if(isLoading) return <SectionGridSkeleton />
  return (
    <div>SectionGrid</div>
  )
}

export default SectionGrid