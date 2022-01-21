import "../assets/css/App.css";

interface ModalProp {
    setModal(): void;
    onSaveGame(): void;
  }

  const SaveGameModal: React.FC<ModalProp> = ({
    setModal,
    onSaveGame
  }) => {
    return (
        <div className="modalBackground z-50">
          <div className="rounded-md bg-white shadow-md flex flex-col p-7">
            <div className="titleCloseBtn">
              <button onClick={setModal} >
              <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
              </button>
            </div>
            <div className="text-center m-4 text-black">
              <h1>Are you sure you want to continue?</h1>
            </div>
            <div className="text-center grid grid-cols-2 gap-4">
              <button onClick={setModal}  id="cancelBtn" className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-full border-2 border-red-600 hover:border-red-800">
                Cancel
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-full border-2 border-green-600 hover:border-green-80" 
              onClick={onSaveGame}>Save</button>
            </div>
          </div>
        </div>
      );
    };
  
  export default SaveGameModal;