// Importing the useFormStatus hook
import {useFormStatus} from "react-dom"

// Defining the Resend Verification Button component
export default function ResendButton() {
    // Obtaining pending status from useFormStatus hook
    const {pending} = useFormStatus()

    // Rendering the Resend Verification Button
    return (
        <button
            type="submit"
            className="bg-white py-2 px-4 rounded disabled:bg-slate-50 disabled:text-slate-500"
            disabled={pending ? true : false}
        >
            {/* Displaying dynamic text based on pending status */}
            Send verification link {pending ? '...' : ''}
        </button>
    )
}