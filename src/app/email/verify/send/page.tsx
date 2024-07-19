// Importing the Form component responsible for email verification initiation
import Form from "@/components/email/verify/send/form";

// Importing the Suspense component from React for asynchronous operations
import {Suspense} from "react";

export default function Send() {
    return (
        <div className="flex flex-col">
            <div className="mb-4">Please verify your email first.</div>

            {/* Using Suspense for asynchronous loading */}
            <Suspense>
                {/* Rendering the Form component for email verification initiation */}
                <Form/>
            </Suspense>
        </div>
    );
}