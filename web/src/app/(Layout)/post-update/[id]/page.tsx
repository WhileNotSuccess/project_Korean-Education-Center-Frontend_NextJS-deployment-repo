import EditorComponent from "../../components/EditorCompo";

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
