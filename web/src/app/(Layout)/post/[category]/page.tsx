import EditorComponent from "../../components/EditorCompo";

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
