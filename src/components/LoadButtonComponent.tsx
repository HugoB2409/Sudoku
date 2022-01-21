import { useRef, ChangeEvent } from 'react'
import { File } from '../Models/File/File';

interface LoadButtonProps {
    onLoadGame(gameFile: File): void;
}

const LoadButtonComponent: React.FC<LoadButtonProps> = ({
    onLoadGame
}) => {
    const uploadRef = useRef<HTMLInputElement>(null);

    const handleUpload = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files === null) {
            return;
        }
        const file = e.target.files[0];

        if (file) {
            if (file.type !== 'application/json') {
                alert("Loaded game format is invalid.");
            }

            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                const contents = event?.target?.result?.toString();
                if (contents == undefined || contents.length < 1) {
                    alert("Loaded game file is empty");
                }
                onLoadGame(new File(contents!));
            }

            e.target.value = '';
            fileReader.readAsText(file);
        } else {
            alert('Game could not be loaded. Please try again.');
        }
    }
    
    return (
        <>
            <button
                className="m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 border border-black shadow-offset-black active:shadow-none"
                onClick={() => uploadRef.current?.click()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            </button>

            <input
                type="file"
                ref={uploadRef}
                onChange={handleUpload}
                style={{ display: 'none' }}
            />
        </>
    )
};

export default LoadButtonComponent;
