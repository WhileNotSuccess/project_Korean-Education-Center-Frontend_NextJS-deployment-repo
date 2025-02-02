import EditorComponent from "../../components/EditorComponent";

interface UpdateProps {
  params : {
    id : string
  }
}

export default function PostUpdateTest({params} : UpdateProps) {
  const {id} = params

  return (
    <main>
      <EditorComponent id={id}/>
    </main>
  );
}
