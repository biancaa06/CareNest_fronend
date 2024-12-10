function EmailInput({ onSubmit, setEmail }) {
    return (
        <div className="flex flex-col items-center mb-6">
            <form onSubmit={onSubmit} noValidate className="w-full flex items-center space-x-2">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    placeholder="Enter your email"
                />
                <button
                    type="submit"
                    className="py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                >
                    Verify Email
                </button>
            </form>
        </div>
    );
}

export default EmailInput;
