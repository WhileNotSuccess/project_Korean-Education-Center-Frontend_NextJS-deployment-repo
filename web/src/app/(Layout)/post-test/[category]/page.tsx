import HtmlDocs from "../../components/HtmlDocs";
import EditorComponent from "../../components/EditorComponent";

interface WriteProps{
  params:{
  category : string
  }
}

export default function PostTest({params}:WriteProps) {
  const {category} = params
  return (
    <main>
      <EditorComponent categoryName={category}/>
    </main>
  );
}
