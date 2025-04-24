import { createPortal } from "react-dom";

export default function LoadingModal() {
    
    return createPortal(
        <dialog open
        tabIndex={-2}
        className="border-2 border-solid fixed w-full h-full inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        
            <div className="text-white text-3xl">로딩중...</div>
        
        </div>
        
    </dialog>,
    document.body
    );
}
